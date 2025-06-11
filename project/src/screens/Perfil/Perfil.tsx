import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserCircle, Mail, Lock, Edit, LogOut } from "lucide-react";

const mockUserData = {
  name: "Nicolas Alencar",
  email: "nicolasalencar@gmail.com",
};

const ProfileField = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div>
    <label className="text-sm font-semibold text-gray-500">{label}</label>
    <div className="flex items-center gap-3 mt-1 p-3 bg-gray-100 rounded-lg">
      <div className="text-gray-600">{icon}</div>
      <p className="text-lg text-gray-800">{value}</p>
    </div>
  </div>
);

export const Perfil = (): JSX.Element => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(mockUserData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUserData(mockUserData);
      setLoading(false);
    }, 500);
  }, []);

  const handleLogout = () => {
    console.log("Usuário deslogado");
    navigate("/Login");
  };

  if (loading) {
    return (
      <div className="bg-[#f1f1f1] w-full min-h-screen flex items-center justify-center">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f1f1] w-full min-h-screen">
      <div className="max-w-[390px] mx-auto flex flex-col">
        <header className="relative flex items-center justify-center p-4 bg-white shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 p-2 text-gray-700 hover:bg-gray-200 rounded-full"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 font-['League_Spartan',Helvetica]">
            Meu Perfil
          </h1>
        </header>

        <main className="flex-grow p-6 flex flex-col">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <UserCircle className="w-28 h-28 text-gray-400" strokeWidth={1} />
              <button
                className="absolute bottom-1 right-1 bg-[#0052a4] p-2 rounded-full text-white shadow-md hover:bg-blue-700"
                onClick={() => alert("Função para editar foto em breve!")}
                aria-label="Editar foto do perfil"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-2xl font-bold mt-3 text-gray-900">
              {userData.name}
            </h2>
          </div>

          <div className="space-y-4">
            <ProfileField
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value={userData.email}
            />
            <ProfileField
              icon={<Lock className="w-5 h-5" />}
              label="Senha"
              value="•••"
            />
          </div>

          <button className="w-full mt-8 bg-white border-2 border-[#0052a4] text-[#0052a4] font-bold py-3 px-4 rounded-lg text-lg hover:bg-blue-50">
            Editar Perfil
          </button>

          <div className="flex-grow"></div>

          <button
            onClick={handleLogout}
            className="w-full mt-10 bg-red-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </main>
      </div>
    </div>
  );
};
