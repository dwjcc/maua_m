import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bus,
  Ticket,
} from "lucide-react";

interface ScheduleItem {
  id: number;
  tipoVeiculo: string;
  placa: string;
  horario: string;
}

const DIAS_SEMANA_MAP: { [key: string]: { display: string; enum: string } } = {
  seg: { display: "Segunda", enum: "SEGUNDA" },
  ter: { display: "Terça", enum: "TERCA" },
  qua: { display: "Quarta", enum: "QUARTA" },
  qui: { display: "Quinta", enum: "QUINTA" },
  sex: { display: "Sexta", enum: "SEXTA" },
  sab: { display: "Sábado", enum: "SABADO" },
  dom: { display: "Domingo", enum: "DOMINGO" },
};
const DIAS_ORDENADOS = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];

export const Itinerarios: React.FC = () => {
  const navigate = useNavigate();
  const [rota, setRota] = useState("FACULDADE");
  const [diaSelecionadoKey, setDiaSelecionadoKey] = useState(DIAS_ORDENADOS[0]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const stompClientRef = useRef<any>(null);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    const loadScript = (src: string, onLoad: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
      return script;
    };
    if (typeof (window as any).global === "undefined") {
      (window as any).global = window;
    }
    const axiosScript = loadScript(
      "https://unpkg.com/axios/dist/axios.min.js",
      () => {
        const sockjsScript = loadScript(
          "https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js",
          () => {
            const stompScript = loadScript(
              "https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js",
              () => {
                const SockJS = (window as any).SockJS;
                const Stomp = (window as any).Stomp;
                const socket = new SockJS("http://localhost:8080/ws");
                const client = Stomp.over(socket);
                client.debug = () => {};
                client.connect(
                  {},
                  () => {
                    stompClientRef.current = client;
                    setIsWsConnected(true);
                  },
                  (error: any) =>
                    console.error("Erro no WebSocket de Itinerários:", error)
                );
              }
            );
            return () => {
              if (stompScript.parentNode)
                stompScript.parentNode.removeChild(stompScript);
            };
          }
        );
        return () => {
          if (sockjsScript.parentNode)
            sockjsScript.parentNode.removeChild(sockjsScript);
        };
      }
    );
    return () => {
      if (stompClientRef.current?.connected)
        stompClientRef.current.disconnect(() => {});
      if (axiosScript.parentNode)
        axiosScript.parentNode.removeChild(axiosScript);
    };
  }, []);

  useEffect(() => {
    const diaEnum = DIAS_SEMANA_MAP[diaSelecionadoKey].enum;
    const cacheKey = `schedule-${rota}-${diaEnum}`;

    const fetchInitialData = async () => {
      if (!(window as any).axios) return;

      setIsLoading(true);

      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          if (Array.isArray(parsedData)) {
            setScheduleItems(parsedData);
          }
        } catch (e) {
          setScheduleItems([]);
        }
      } else {
        setScheduleItems([]);
      }

      try {
        const response = await (window as any).axios.get(
          `/api/horarios/origem/${rota}/dia/${diaEnum}`
        );
        const freshData = response.data;
        if (Array.isArray(freshData)) {
          setScheduleItems(freshData);
          sessionStorage.setItem(cacheKey, JSON.stringify(freshData));
        }
      } catch (error) {
        console.error(
          `Não foi possível buscar dados frescos para ${cacheKey}. Usando cache se disponível.`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    if (isWsConnected && stompClientRef.current) {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      const topic = `/topic/schedules/${rota}/${diaEnum}`;

      subscriptionRef.current = stompClientRef.current.subscribe(
        topic,
        (message: { body: string }) => {
          const updatedList = Array.isArray(JSON.parse(message.body))
            ? JSON.parse(message.body)
            : [];
          setScheduleItems(updatedList);
          sessionStorage.setItem(cacheKey, JSON.stringify(updatedList));
        }
      );
    }
  }, [rota, diaSelecionadoKey, isWsConnected]);

  const handleJoinQueue = (item: ScheduleItem) => {
    navigate("/FilaVirtual", { state: { horario: item } });
  };

  const handleDayChange = (direction: "prev" | "next") => {
    const currentIndex = DIAS_ORDENADOS.indexOf(diaSelecionadoKey);
    const newIndex =
      direction === "prev"
        ? currentIndex === 0
          ? DIAS_ORDENADOS.length - 1
          : currentIndex - 1
        : currentIndex === DIAS_ORDENADOS.length - 1
        ? 0
        : currentIndex + 1;
    setDiaSelecionadoKey(DIAS_ORDENADOS[newIndex]);
  };

  return (
    <div className="bg-[#f1f1f1] flex flex-col w-full min-h-screen">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 p-2" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Itinerários</h1>
        </div>
        <div className="mt-4 p-1 bg-gray-200 rounded-full flex">
          <button
            onClick={() => setRota("FACULDADE")}
            className={`w-1/2 py-2 text-center rounded-full font-semibold transition-colors ${
              rota === "FACULDADE" ? "bg-[#0052a4] text-white" : "text-gray-600"
            }`}
          >
            Mauá → Estação
          </button>
          <button
            onClick={() => setRota("ESTACAO")}
            className={`w-1/2 py-2 text-center rounded-full font-semibold transition-colors ${
              rota === "ESTACAO" ? "bg-[#0052a4] text-white" : "text-gray-600"
            }`}
          >
            Estação → Mauá
          </button>
        </div>
        <div className="relative mt-4 flex items-center justify-between px-2">
          <button onClick={() => handleDayChange("prev")} className="p-2">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <span className="font-semibold text-lg text-gray-700">
            {DIAS_SEMANA_MAP[diaSelecionadoKey].display}
          </span>
          <button onClick={() => handleDayChange("next")} className="p-2">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <p className="text-center text-gray-500 py-10">
            Carregando horários...
          </p>
        ) : !Array.isArray(scheduleItems) || scheduleItems.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Nenhum horário para este dia.
          </p>
        ) : (
          scheduleItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Bus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-800">
                    {item.tipoVeiculo === "VAN" ? "Van" : "Micro-ônibus"}
                  </p>
                  <p className="text-sm text-gray-500">{item.placa}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-2xl text-[#0052a4]">
                  {item.horario}
                </p>
                <button
                  onClick={() => handleJoinQueue(item)}
                  className="mt-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 hover:bg-green-600"
                >
                  <Ticket className="h-4 w-4" />
                  Fila
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};
