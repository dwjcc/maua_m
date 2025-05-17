import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const Cadastro = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f1f1f1] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#f1f1f1] w-full max-w-[390px] h-[844px] relative px-6">
        <Button
          variant="ghost"
          className="absolute w-11 h-11 top-[38px] left-[23px] p-0 bg-[#d9d9d9] rounded-[22px]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-[42px] h-[42px]" />
        </Button>

        <div className="mt-[168px]">
          <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-[28px] mb-1">
            Insira seu e-mail
          </label>
          <Card className="bg-[#d9d9d9] rounded-[50px] border-0 h-[60px] flex items-center px-3.5">
            <Input
              placeholder="E-mail"
              className="border-0 bg-transparent h-full [font-family:'League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-[32px] opacity-80 placeholder:text-[#f1f1f1] placeholder:opacity-80 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </Card>
        </div>

        <div className="mt-[26px]">
          <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-[28px] mb-1">
            Insira sua senha
          </label>
          <Card className="bg-[#d9d9d9] rounded-[50px] border-0 h-[60px] flex items-center px-3.5">
            <Input
              type="password"
              placeholder="Senha"
              className="border-0 bg-transparent h-full [font-family:'League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-[32px] opacity-80 placeholder:text-[#f1f1f1] placeholder:opacity-80 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </Card>
        </div>

        <div className="mt-[26px]">
          <label className="block [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-[28px] mb-1">
            Confirme sua senha
          </label>
          <Card className="bg-[#d9d9d9] rounded-[50px] border-0 h-[60px] flex items-center px-3.5">
            <Input
              type="password"
              placeholder="Senha"
              className="border-0 bg-transparent h-full [font-family:'League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-[32px] opacity-80 placeholder:text-[#f1f1f1] placeholder:opacity-80 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </Card>
        </div>

        <div className="mt-[99px] text-center">
          <Button 
            className="w-full h-[60px] bg-[#0052a4] hover:bg-[#0052a4]/90 rounded-[50px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-4xl"
            onClick={() => navigate('/dashboard')}
          >
            ENTRAR
          </Button>

          <p 
            className="mt-2 [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-xl cursor-pointer"
            onClick={() => navigate('/Login')}
          >
            Já tem conta? Entre aqui!
          </p>
        </div>
      </div>
    </div>
  );
};