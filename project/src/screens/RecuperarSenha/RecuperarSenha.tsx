import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const RecuperarSenha = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f1f1f1] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#f1f1f1] w-[390px] relative py-8 px-6">
        <Button
          variant="ghost"
          className="absolute top-[35px] left-[25px] w-11 h-11 p-0 bg-[#d9d9d9] rounded-[22px] flex items-center justify-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-6 h-6 text-[#0052a4]" />
        </Button>

        <div className="mt-[145px] mx-auto w-80 font-['League_Spartan',Helvetica] font-semibold text-[#0052a4] text-[28px] text-center leading-normal">
          Esqueceu a senha? <br />
          Fique tranquilo, vamos te ajudar a recuperar!
        </div>

        <div className="mt-[55px] font-['League_Spartan',Helvetica] font-semibold text-[#0052a4] text-[28px] leading-normal">
          Insira seu e-mail
        </div>

        <Card className="mt-[25px] border-none shadow-none">
          <CardContent className="p-0">
            <div className="relative">
              <Input
                className="bg-[#d9d9d9] h-[60px] rounded-[50px] pl-4 text-[32px] font-['League_Spartan',Helvetica] font-semibold text-[#f1f1f1] opacity-80 placeholder:text-[#f1f1f1] placeholder:opacity-80"
                placeholder="E-mail"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-[39px] border-none shadow-none">
          <CardContent className="p-0">
            <Button 
              className="bg-[#0052a4] w-full h-[60px] rounded-[50px] font-['League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-4xl"
              onClick={() => navigate('/confirmation')}
            >
              RECUPERAR
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};