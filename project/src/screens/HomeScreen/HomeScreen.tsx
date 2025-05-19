import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

const defaultCenter = {
  lat: -23.6486, // Instituto Mauá de Tecnologia coordinates
  lng: -46.5752
};

const mapStyles = {
  height: "100%",
  width: "100%"
};

export const HomeScreen = (): JSX.Element => {
  const navigate = useNavigate();

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

          {/* Enter Queue Button */}
          <Button 
            onClick={() => navigate("/queue")}
            className="absolute w-[370px] h-[65px] bottom-5 left-2.5 bg-[#0052a4] rounded-[50px] hover:bg-[#0052a4]/90"
          >
            <span className="font-['League_Spartan',Helvetica] font-semibold text-white text-[32px]">
              ENTRAR NA FILA
            </span>
          </Button>

          {/* Location Button */}
          <Card 
            className="absolute w-16 h-16 top-[104px] right-[16px] bg-[#d9d9d9] rounded-[32px] flex items-center justify-center p-0 border-none cursor-pointer hover:bg-[#c9c9c9]" 
            onClick={() => alert("Location functionality coming soon!")}
          >
            <div className="relative w-[39px] h-[49px] bg-[url(/group-3.png)] bg-cover" />
          </Card>

          {/* User Profile Button */}
          <Card 
            onClick={() => navigate("/profile")}
            className="absolute w-16 h-16 top-[29px] right-[16px] bg-[#d9d9d9] rounded-[32px] flex items-center justify-center p-0 border-none cursor-pointer hover:bg-[#c9c9c9]"
          >
            <img
              className="w-[53px] h-[53px]"
              alt="User profile"
              src="/vector.svg"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};