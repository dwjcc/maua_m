import { ArrowLeftIcon, EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export const Perfil = (): JSX.Element => {
  const navigate = useNavigate();

  // User profile data
  const profileData = {
    name: "nome",
    email: "email",
    password: "senha",
  };

  return (
    <div className="bg-[#e8e8e8] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#e8e8e8] w-full max-w-[390px] relative flex flex-col items-center px-8 py-12">
        {/* Back button */}
        <div className="absolute top-[50px] left-6">
          <Button
            variant="ghost"
            size="icon"
            className="w-11 h-11 rounded-full bg-[#d9d9d9] p-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* Profile picture */}
        <div className="mt-[60px] relative">
          <div className="w-24 h-24 bg-[#d9d9d9] rounded-full flex items-center justify-center">
            <div className="text-blue-600">
              <svg
                width="95"
                height="95"
                viewBox="0 0 95 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.5 47.5C39.4167 47.5 32.9167 44.75 28 39.25C23.0833 33.75 20.625 27.0833 20.625 19.25C20.625 11.4167 23.0833 4.75 28 -0.75C32.9167 -6.25 39.4167 -9 47.5 -9C55.5833 -9 62.0833 -6.25 67 -0.75C71.9167 4.75 74.375 11.4167 74.375 19.25C74.375 27.0833 71.9167 33.75 67 39.25C62.0833 44.75 55.5833 47.5 47.5 47.5ZM0 95V79.0417C0 74.7917 1.04167 70.9583 3.125 67.5417C5.20833 64.125 8.02083 61.5 11.5625 59.6667C19.0625 55.8333 26.6667 53.0208 34.375 51.2292C42.0833 49.4375 49.7917 48.5417 57.5 48.5417C65.2083 48.5417 72.9167 49.4375 80.625 51.2292C88.3333 53.0208 95.9375 55.8333 103.438 59.6667C106.979 61.5 109.792 64.125 111.875 67.5417C113.958 70.9583 115 74.7917 115 79.0417V95H0Z"
                  fill="#0052A4"
                />
              </svg>
            </div>
          </div>

          {/* EditIcon icon overlay */}
          <div 
            className="absolute bottom-0 right-0 bg-[#0052a4] rounded-full p-1 cursor-pointer"
            onClick={() => navigate('/edit-photo')}
          >
            <EditIcon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* EditIcon button */}
        <Button 
          className="mt-6 bg-[#0052a4] text-white rounded-[20px] h-[27px] w-[123px] px-4 py-0"
          onClick={() => navigate('/edit-profile')}
        >
          <span className="font-semibold text-2xl [font-family:'League_Spartan',Helvetica]">
            Editar
          </span>
        </Button>

        {/* Profile form fields */}
        <div className="w-full mt-16 space-y-5">
          {/* Name field */}
          <Card className="bg-[#d9d9d9] h-[50px] border-none shadow-none flex items-center px-3">
            <span className="[font-family:'League_Spartan',Helvetica] font-semibold text-black text-2xl">
              {profileData.name}
            </span>
          </Card>

          {/* Email field */}
          <Card className="bg-[#d9d9d9] h-[50px] border-none shadow-none flex items-center px-3">
            <span className="[font-family:'League_Spartan',Helvetica] font-semibold text-black text-2xl">
              {profileData.email}
            </span>
          </Card>

          {/* Password field */}
          <Card className="bg-[#d9d9d9] h-[50px] border-none shadow-none flex items-center px-3">
            <span className="[font-family:'League_Spartan',Helvetica] font-semibold text-black text-2xl">
              {profileData.password}
            </span>
          </Card>
        </div>

        {/* Logout button */}
        <Button 
          className="mt-24 bg-[#0052a4] text-white rounded-[20px] h-[35px] w-[139px]"
          onClick={() => navigate('/login')}
        >
          <span className="font-semibold text-2xl [font-family:'League_Spartan',Helvetica]">
            Sair
          </span>
        </Button>
      </div>
    </div>
  );
};