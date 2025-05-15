import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const Home = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <main className="bg-[#f1f1f1] flex justify-center w-full min-h-screen">
      <div className="bg-[#f1f1f1] w-full max-w-[390px] h-[844px] relative">
        <header className="absolute w-[312px] h-[66px] top-[125px] left-[41px] text-center">
          <h1 className="absolute top-0 left-0 [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-5xl tracking-[0] leading-normal whitespace-nowrap">
            MAUÁ MOOVE
          </h1>
          <p className="absolute w-[298px] top-11 left-[5px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-2xl tracking-[0] leading-normal">
            Seu aplicativo de mobilidade
          </p>
        </header>

        <img
          className="absolute w-[276px] h-[276px] top-60 left-[57px]"
          alt="Mauá Moove Logo"
          src="/image-removebg-preview--1--1.png"
        />

        <div className="absolute w-[345px] h-[60px] top-[565px] left-[23px]">
          <Button 
            className="w-full h-[60px] bg-[#0052a4] rounded-[50px] hover:bg-[#0052a4]/90"
            onClick={() => navigate("/login")}
          >
            <span className="[font-family:'League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-4xl tracking-[0] leading-normal whitespace-nowrap">
              ENTRE
            </span>
          </Button>
        </div>

        <Button
          variant="link"
          className="absolute top-[662px] left-[118px] [font-family:'League_Spartan',Helvetica] font-bold text-[#0052a4] text-3xl tracking-[0] leading-normal whitespace-nowrap p-0"
          onClick={() => navigate("/register")}
        >
          Cadastre-se
        </Button>
      </div>
    </main>
  );
};