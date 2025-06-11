import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  ArrowRight,
  ChevronUp,
  Map,
  User,
  Ticket,
  ClipboardList,
  MessageSquare,
  Bell,
} from "lucide-react";

const defaultCenter = {
  lat: -23.6486,
  lng: -46.5752,
};

const mapStyles = {
  height: "100%",
  width: "100%",
};

export const HomeScreen = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPanel, setShowPanel] = useState(false);

  const handleOpenPanel = () => setShowPanel(true);
  const handleClosePanel = () => setShowPanel(false);

  const ActionButton = ({
    icon,
    label,
    navigateTo,
    colorClass = "bg-white/20 hover:bg-white/30",
  }: {
    icon: React.ReactNode;
    label: string;
    navigateTo: string;
    colorClass?: string;
  }) => (
    <button
      onClick={() => {
        setShowPanel(false);
        navigate(navigateTo);
      }}
      className={`w-full flex items-center justify-between p-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${colorClass}`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <span>{label}</span>
      </div>
      <ArrowRight className="h-5 w-5" />
    </button>
  );

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[390px] h-[844px]">
        <div className="relative h-[844px]">
          <LoadScript googleMapsApiKey="AIzaSyCFGRp2TK00A43bbj9gGYT8I-tP-TO5FRk">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={15}
              center={defaultCenter}
            >
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript>

          <div className="absolute top-6 right-4 flex flex-col gap-3 z-20">
            <button
              onClick={() => navigate("/Perfil")}
              className="w-14 h-14 bg-[#0052a4] rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg"
              aria-label="Perfil"
            >
              <User className="w-7 h-7" />
            </button>
            <button
              onClick={() => alert("Função de localização em breve!")}
              className="w-14 h-14 bg-[#0052a4] rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg"
              aria-label="Minha Localização"
            >
              <Map className="w-7 h-7" />
            </button>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] z-20">
            <button
              onClick={handleOpenPanel}
              className="w-full h-[65px] bg-[#0052a4] rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              <span className="font-['League_Spartan',Helvetica] font-semibold text-white text-[28px]">
                MENU DE OPÇÕES
              </span>
              <ChevronUp className="h-7 w-7 text-white" />
            </button>
          </div>

          <div
            className={`
              fixed left-0 bottom-0 w-full bg-[#0052a4] rounded-t-[32px] shadow-2xl z-30
              transition-transform duration-300 ease-in-out
              ${showPanel ? "translate-y-0" : "translate-y-full"}
            `}
          >
            <div
              className="w-full py-3 flex justify-center cursor-pointer"
              onClick={handleClosePanel}
            >
              <div className="w-12 h-1.5 bg-white/40 rounded-full"></div>
            </div>

            <div className="p-6 pt-2 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-center text-white mb-2">
                O que deseja fazer?
              </h2>
              <ActionButton
                icon={<Ticket className="h-6 w-6" />}
                label="Entrar na Fila"
                navigateTo="/FilaVirtual"
                colorClass="bg-green-500 hover:bg-green-600"
              />
              <ActionButton
                icon={<ClipboardList className="h-6 w-6" />}
                label="Ver Itinerários"
                navigateTo="/Itinerarios"
              />
              <ActionButton
                icon={<Bell className="h-6 w-6" />}
                label="Notificações"
                navigateTo="/notificacoes"
              />
              <ActionButton
                icon={<MessageSquare className="h-6 w-6" />}
                label="Dúvidas e Contato"
                navigateTo="/FaqContato"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
