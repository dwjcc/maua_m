import React, { useEffect, useState, useRef } from "react";
// As bibliotecas SockJS e StompJS serão carregadas via CDN, então os imports foram removidos.
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Interface para o formato do horário que esperamos receber
interface ScheduleItem {
  id: number;
  tipoVeiculo: string; // Ex: "VAN" ou "MICRO_ONIBUS"
  placa: string;
  horario: string; // Ex: "07:30"
}

// Mapeamento para os dias da semana em português e para o ENUM do backend
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

  const [rota, setRota] = useState("FACULDADE"); // FACULDADE ou ESTACAO
  const [diaSelecionadoKey, setDiaSelecionadoKey] = useState(DIAS_ORDENADOS[0]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [isWsConnected, setIsWsConnected] = useState(false);

  const stompClientRef = useRef<any>(null); // Usando 'any' para o tipo Stomp.Client
  const subscriptionRef = useRef<any>(null); // Usando 'any' para o tipo Stomp.Subscription

  useEffect(() => {
    // Carrega as bibliotecas do WebSocket via CDN
    const loadScript = (src: string, onLoad: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    // Garante que o objeto global exista
    if (typeof window.global === "undefined") {
      (window as any).global = window;
    }

    loadScript(
      "https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js",
      () => {
        loadScript(
          "https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js",
          () => {
            // Agora que os scripts foram carregados, podemos conectar
            const SockJS = (window as any).SockJS;
            const Stomp = (window as any).Stomp;

            const socket = new SockJS("http://localhost:8080/ws");
            const client = Stomp.over(socket);
            client.debug = () => {};

            client.connect(
              {},
              () => {
                console.log("Conectado ao WebSocket");
                stompClientRef.current = client;
                setIsWsConnected(true); // Atualiza o estado para disparar o outro useEffect
              },
              (error: any) => {
                console.error("Erro ao conectar ao WebSocket:", error);
              }
            );
          }
        );
      }
    );

    return () => {
      if (stompClientRef.current?.connected) {
        console.log("Desconectando do WebSocket");
        stompClientRef.current.disconnect(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (isWsConnected && stompClientRef.current) {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      const diaEnum = DIAS_SEMANA_MAP[diaSelecionadoKey].enum;
      const topic = `/topic/schedules/${rota}/${diaEnum}`;

      console.log(`Inscrevendo-se no tópico: ${topic}`);

      subscriptionRef.current = stompClientRef.current.subscribe(
        topic,
        (message: { body: string }) => {
          const updatedScheduleList: ScheduleItem[] = JSON.parse(message.body);
          console.log(
            "Lista de horários atualizada recebida:",
            updatedScheduleList
          );
          setScheduleItems(updatedScheduleList);
        }
      );
    }
  }, [rota, diaSelecionadoKey, isWsConnected]);

  const handleDayChange = (direction: "prev" | "next") => {
    const currentIndex = DIAS_ORDENADOS.indexOf(diaSelecionadoKey);
    let newIndex;
    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? DIAS_ORDENADOS.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === DIAS_ORDENADOS.length - 1 ? 0 : currentIndex + 1;
    }
    setDiaSelecionadoKey(DIAS_ORDENADOS[newIndex]);
  };

  return (
    <main className="bg-[#f1f1f1] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#f1f1f1] w-[390px] relative flex flex-col">
        {/* Header e Navegação */}
        <div className="mt-[51px] ml-[19px]">
          <button
            className="w-11 h-11 rounded-[22px] bg-[#d9d9d9] p-0 flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        </div>
        <button
          onClick={() => navigate("/profile")}
          className="absolute w-16 h-16 top-[29px] right-[16px] bg-[#d9d9d9] rounded-[32px] flex items-center justify-center p-0 border-none cursor-pointer hover:bg-[#c9c9c9]"
        >
          <img
            className="w-[53px] h-[53px]"
            alt="User profile"
            src="/vector.svg"
          />
        </button>

        {/* Seletor de Rota */}
        <div className="mx-2.5 mt-[15px] h-[60px] bg-[#d9d9d9] rounded-[50px] flex items-center justify-between px-6">
          <select
            value={rota}
            onChange={(e) => setRota(e.target.value)}
            className="appearance-none w-full bg-transparent border-0 focus:ring-0 font-semibold text-black text-2xl"
          >
            <option value="FACULDADE">Mauá → Estação</option>
            <option value="ESTACAO">Estação → Mauá</option>
          </select>
          <div className="w-[39px] h-[39px] bg-[#0052a4] rounded-[19.5px] flex items-center justify-center ml-4">
            <MapPinIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Seletor de Dia */}
        <div className="relative mt-6 px-7 flex items-center justify-center">
          <button
            onClick={() => handleDayChange("prev")}
            className="absolute left-7 z-10 bg-white rounded-full shadow-md p-1"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="px-4 py-2 rounded-full bg-[#0052a4] text-white min-w-[120px] text-center">
            <span className="font-semibold text-lg">
              {DIAS_SEMANA_MAP[diaSelecionadoKey].display}
            </span>
          </div>
          <button
            onClick={() => handleDayChange("next")}
            className="absolute right-7 z-10 bg-white rounded-full shadow-md p-1"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Cabeçalho da Tabela */}
        <div className="mx-7 mt-[30px] h-8 bg-[#0052a4] rounded-[20px] flex items-center justify-between px-12">
          <span className="font-semibold text-white text-2xl">Veículo</span>
          <span className="font-semibold text-white text-2xl">Horário</span>
        </div>

        {/* Lista de Horários */}
        <div className="mt-6 px-7">
          {scheduleItems.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhum horário para este dia.
            </p>
          ) : (
            scheduleItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-[45px] font-semibold text-black text-2xl"
              >
                <span className="ml-[10px] text-lg">
                  {item.tipoVeiculo === "VAN" ? "Van" : "Micro"} - {item.placa}
                </span>
                <span className="mr-[28px]">{item.horario}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};
