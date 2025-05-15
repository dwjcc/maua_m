import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();

  // Data for input fields to enable mapping
  const inputFields = [
    {
      id: "email",
      label: "Insira seu e-mail",
      placeholder: "E-mail",
      type: "email",
      top: "160px",
    },
    {
      id: "password",
      label: "Insira sua senha",
      placeholder: "Senha",
      type: "password",
      top: "300px",
    },
  ];

  return (
    <div className="bg-[#f1f1f1] flex flex-row justify-center w-full">
      <div className="bg-[#f1f1f1] w-[390px] h-[844px] relative">
        {/* Back button */}
        <Button
          variant="ghost"
          className="w-11 h-11 top-9 bg-[#d9d9d9] rounded-[22px] absolute left-[23px] p-0"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-[42px] h-[42px]" />
        </Button>

        <form className="flex flex-col">
          {/* Input fields */}
          {inputFields.map((field) => (
            <div
              key={field.id}
              className="w-[345px] absolute left-[23px]"
              style={{ top: field.top }}
            >
              <div className="[font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-[28px] tracking-[0] leading-[normal] whitespace-nowrap">
                {field.label}
              </div>
              <Input
                type={field.type}
                id={field.id}
                className="bg-[#d9d9d9] w-[343px] h-[60px] rounded-[50px] mt-4 pl-5 opacity-80 [font-family:'League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-[32px] tracking-[0] leading-[normal]"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Forgot password link */}
          <Button
            variant="link"
            className="absolute top-[464px] left-[169px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-xl tracking-[0] leading-[normal] whitespace-nowrap p-0"
            onClick={() => navigate("/RecuperarSenha")}
          >
            Esqueci minha senha
          </Button>

          {/* Sign up link */}
          <Button
            variant="link"
            className="absolute top-[554px] left-[72px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-xl tracking-[0] leading-[normal] whitespace-nowrap p-0"
            onClick={() => navigate("/signup")}
          >
            Não tem conta? Cadastre-se
          </Button>

          {/* Login button */}
          <Button
            type="submit"
            className="absolute w-[343px] h-[60px] top-[590px] left-[23px] bg-[#0052a4] rounded-[50px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-4xl tracking-[0] leading-[normal]"
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            ENTRAR
          </Button>
        </form>
      </div>
    </div>
  );
};