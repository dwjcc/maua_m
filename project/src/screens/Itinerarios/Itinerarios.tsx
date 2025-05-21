import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useNavigate } from "react-router-dom";

export const Itinerarios = (): JSX.Element => {
  const navigate = useNavigate();
  const daysOfWeek = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo"
  ];

  const [selectedDay, setSelectedDay] = React.useState(daysOfWeek[0]);

  // Data for schedule items
  const scheduleItems = [
    { vehicle: "Van", time: "09:30" },
    { vehicle: "Van", time: "09:45" },
    { vehicle: "Van", time: "09:30" },
    { vehicle: "Van", time: "09:45" },
  ];

  const handleDayChange = (direction: 'prev' | 'next') => {
    const currentIndex = daysOfWeek.indexOf(selectedDay);
    if (direction === 'prev') {
      const newIndex = currentIndex === 0 ? daysOfWeek.length - 1 : currentIndex - 1;
      setSelectedDay(daysOfWeek[newIndex]);
    } else {
      const newIndex = currentIndex === daysOfWeek.length - 1 ? 0 : currentIndex + 1;
      setSelectedDay(daysOfWeek[newIndex]);
    }
  };

  return (
    <main className="bg-[#f1f1f1] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#f1f1f1] w-[390px] relative flex flex-col">
        {/* Back button */}
        <div className="mt-[51px] ml-[19px]">
          <Button
            variant="outline"
            size="icon"
            className="w-11 h-11 rounded-[22px] bg-[#d9d9d9] p-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Button>
        </div>

        {/* User profile button */}
        <div className="absolute top-[52px] right-[28px]">
          <Button
            variant="outline"
            size="icon"
            className="w-11 h-11 rounded-[22px] bg-[#d9d9d9] p-0"
            onClick={() => navigate("/profile")}
          >
            <img
              className="w-[27px] h-[34px]"
              alt="User profile"
              src="/group-3.png"
            />
          </Button>
        </div>

        {/* Route selector */}
        <div className="mx-2.5 mt-[15px] h-[60px] bg-[#d9d9d9] rounded-[50px] flex items-center justify-between px-6">
          <Select defaultValue="maua-estacao">
            <SelectTrigger className="border-0 bg-transparent focus:ring-0 font-['League_Spartan',Helvetica] font-semibold text-black text-2xl">
              <SelectValue placeholder="Selecione a rota" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maua-estacao">Mauá X Estação</SelectItem>
              <SelectItem value="estacao-maua">Estação X Mauá</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-[39px] h-[39px] bg-[#0052a4] rounded-[19.5px] flex items-center justify-center">
            <MapPinIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Day selector */}
        <div className="relative mt-6 px-7 flex items-center justify-center">
          <button 
            onClick={() => handleDayChange('prev')}
            className="absolute left-7 z-10 bg-white rounded-full shadow-md p-1"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          
          <div className="px-4 py-2 rounded-full bg-[#0052a4] text-white min-w-[120px] text-center">
            <span className="font-['League_Spartan',Helvetica] font-semibold text-lg">
              {selectedDay}
            </span>
          </div>

          <button 
            onClick={() => handleDayChange('next')}
            className="absolute right-7 z-10 bg-white rounded-full shadow-md p-1"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Schedule header */}
        <div className="mx-7 mt-[30px] h-8 bg-[#0052a4] rounded-[20px] flex items-center justify-between px-12">
          <span className="font-['League_Spartan',Helvetica] font-semibold text-white text-2xl">
            Veículo
          </span>
          <span className="font-['League_Spartan',Helvetica] font-semibold text-white text-2xl">
            Horário
          </span>
        </div>

        {/* Schedule items */}
        <div className="mt-6 px-7">
          {scheduleItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between mb-[45px] font-['League_Spartan',Helvetica] font-semibold text-black text-2xl"
            >
              <span className="ml-[10px]">{item.vehicle}</span>
              <span className="mr-[28px]">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};