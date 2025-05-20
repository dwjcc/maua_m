import { ArrowLeftIcon} from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export const FilaVirtual = (): JSX.Element => {
  const navigate = useNavigate();
  const [queuePosition, setQueuePosition] = useState(1);
  const [waitingCount, setWaitingCount] = useState(5);

const defaultCenter = {
lat: -23.6486, // Instituto Mauá de Tecnologia coordinates
lng: -46.5752
};

const mapStyles = {
height: "100%",
width: "100%"
};

  const onBackClick = () => {
    navigate(-1);
  };

  const onProfileClick = () => {
    navigate('/profile');
  };



  // Simulate queue updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setQueuePosition((prev) => Math.max(1, prev - 1));
      setWaitingCount((prev) => Math.max(0, prev - 1));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#d9d9d9] flex flex-row justify-center w-full">
      <div className="bg-[#d9d9d9] overflow-hidden w-[390px] h-[844px] relative">
        
        {/* Google Maps */}
        <LoadScript googleMapsApiKey="AIzaSyCFGRp2TK00A43bbj9gGYT8I-tP-TO5FRk">
                    <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={15}
                      center={defaultCenter}
                    >
                      <Marker position={defaultCenter} />
                    </GoogleMap>
                  </LoadScript>

        {/* UserIcon profile button */}
        <button 
          onClick={onProfileClick}
          className="absolute w-16 h-16 top-[18px] right-[18px] bg-[#d9d9d9] rounded-[32px] flex items-center justify-center"
        >
          <img
            className="w-[53px] h-[53px]"
            alt="UserIcon profile"
            src="/vector.svg"
          />
        </button>

        {/* Location button */}
        <Card 
            className="absolute w-16 h-16 top-[104px] right-[16px] bg-[#d9d9d9] rounded-[32px] flex items-center justify-center p-0 border-none cursor-pointer hover:bg-[#c9c9c9]" 
            onClick={() => alert("Location functionality coming soon!")}
          >
            <div className="relative w-[39px] h-[49px] bg-[url(/group-3.png)] bg-cover" />
        </Card>

        {/* Back button */}
        <Button
          variant="ghost"
          className="absolute w-11 h-11 top-[38px] left-[23px] p-0 bg-[#d9d9d9] rounded-[22px]"
            onClick={onBackClick}
        >
          <ArrowLeftIcon className="w-[42px] h-[42px]" />
        </Button>

        {/* Queue information card */}
        <Card className="absolute w-[390px] bottom-0 left-0 bg-[#0052a4] rounded-t-[50px] border-none text-white">
          <CardContent className="p-8 pt-12">
            <div className="space-y-6">
              <h2 className="font-semibold text-[32px] font-['League_Spartan',Helvetica]">
                Você está na fila virtual!
              </h2>

              <p className="text-base text-center font-['League_Spartan',Helvetica]">
                A fila não garante um lugar na van, ela apenas estima quantas
                pessoas estão aguardando
              </p>

              <h3 className="font-semibold text-[32px] font-['League_Spartan',Helvetica]">
                Seu lugar na fila é:
              </h3>

              <div className="flex justify-center">
                <div className="w-[62px] h-[42px] bg-[#d9d9d9] rounded-[5px] flex items-center justify-center">
                  <span className="font-semibold text-[32px] text-black font-['League_Spartan',Helvetica]">
                    {queuePosition}
                  </span>
                </div>
              </div>

              <p className="text-2xl text-center font-medium font-['League_Spartan',Helvetica]">
                Existem outras {waitingCount} pessoas aguardando
                embarque
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};