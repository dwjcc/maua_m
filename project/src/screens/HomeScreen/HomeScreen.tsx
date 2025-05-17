import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export const HomeScreen = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[390px] h-[844px]">
        <div className="relative h-[844px] bg-[url(/map.svg)] bg-cover bg-center">
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
            onClick={() => {/* Add location functionality here */}}
          >
            <div className="relative w-[39px] h-[49px] bg-[url(/group-3.png)] bg-cover" />
          </Card>

          {/* User Profile Button */}
          <Card 
            className="absolute w-16 h-16 top-[29px] right-[16px] bg-[#d9d9d9] rounded-[32px] flex items-center justify-center p-0 border-none cursor-pointer hover:bg-[#c9c9c9]"
            onClick={() => navigate("/profile")}
          >
            <img
              className="w-[53px] h-[53px]"
              alt="User profile"
              src="/vector.svg"
            />
          </Card>

          {/* Map Pin */}
          <img
            className="absolute w-[30px] h-8 top-[300px] left-[162px]"
            alt="Location pin"
            src="/vector-1.svg"
          />
        </div>
      </div>
    </div>
  );
};