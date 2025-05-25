import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import authService from "../../services/authService";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.login(formData.email, formData.password);
      navigate("/HomeScreen");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Falha no login. Verifique suas credenciais."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Data for input fields to enable mapping
  const inputFields = [
    {
      id: "email",
      label: "Insira seu e-mail",
      placeholder: "E-mail",
      type: "email",
      top: "160px",
      value: formData.email,
    },
    {
      id: "password",
      label: "Insira sua senha",
      placeholder: "Senha",
      type: "password",
      top: "300px",
      value: formData.password,
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

        <form className="flex flex-col" onSubmit={handleLogin}>
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
                value={field.value}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Error message */}
          {error && (
            <div className="absolute top-[420px] left-[23px] w-[343px] text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Forgot password link */}
          <Button
            type="button"
            variant="link"
            className="absolute top-[464px] left-[169px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-xl tracking-[0] leading-[normal] whitespace-nowrap p-0"
            onClick={() => navigate("/RecuperarSenha")}
          >
            Esqueci minha senha
          </Button>

          {/* Sign up link */}
          <Button
            type="button"
            variant="link"
            className="absolute top-[554px] left-[72px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#0052a4] text-xl tracking-[0] leading-[normal] whitespace-nowrap p-0"
            onClick={() => navigate("/Cadastro")}
          >
            Não tem conta? Cadastre-se
          </Button>

          {/* Login button */}
          <Button
            type="submit"
            className="absolute w-[343px] h-[60px] top-[590px] left-[23px] bg-[#0052a4] rounded-[50px] [font-family:'League_Spartan',Helvetica] font-semibold text-[#f1f1f1] text-4xl tracking-[0] leading-[normal]"
            disabled={isLoading}
          >
            {isLoading ? "CARREGANDO..." : "ENTRAR"}
          </Button>
        </form>
      </div>
    </div>
  );
};
