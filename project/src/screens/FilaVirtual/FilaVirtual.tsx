import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, Users, CheckCircle } from "lucide-react";

interface Horario {
  id: number;
  placa: string;
  horario: string;
  capacidade: number;
}

const availableSchedules: Horario[] = [
  { id: 1, placa: "VAN-1234", horario: "23:01", capacidade: 15 },
  { id: 2, placa: "BUS-5678", horario: "23:10", capacidade: 20 },
  { id: 3, placa: "VAN-9876", horario: "23:30", capacidade: 15 },
  { id: 4, placa: "VAN-4321", horario: "23:50", capacidade: 15 },
];

export const FilaVirtual = (): JSX.Element => {
  const navigate = useNavigate();
  const [schedules] = useState<Horario[]>(availableSchedules);
  const [selectedSchedule, setSelectedSchedule] = useState<Horario | null>(
    null
  );
  const [queueCount, setQueueCount] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);

  const getCurrentDayName = () => {
    const days = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const todayIndex = new Date().getDay();
    return days[todayIndex];
  };

  useEffect(() => {
    if (schedules.length > 0) {
      setSelectedSchedule(schedules[0]);
    }
  }, [schedules]);

  const handleScheduleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const scheduleId = parseInt(event.target.value, 10);
    const schedule = schedules.find((s) => s.id === scheduleId) || null;
    setSelectedSchedule(schedule);
    setQueueCount(0);
    setHasJoined(false);
  };

  const handleJoinQueue = () => {
    if (selectedSchedule && queueCount < selectedSchedule.capacidade) {
      const isLastSchedule =
        selectedSchedule.id ===
        availableSchedules[availableSchedules.length - 1].id;

      setQueueCount((prevCount) => prevCount + 1);

      if (!isLastSchedule) {
        setHasJoined(true);
      }
    }
  };

  const progressPercentage = selectedSchedule
    ? (queueCount / selectedSchedule.capacidade) * 100
    : 0;

  const getProgressColorClass = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 85) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-[#f1f1f1] flex flex-col items-center w-full min-h-screen p-4">
      <div className="w-full max-w-md">
        <header className="relative flex items-center justify-center mb-2">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 p-2 text-gray-700"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 font-['League_Spartan',Helvetica]">
            Fila Virtual
          </h1>
        </header>

        <p className="text-center text-lg text-gray-600 mb-4 font-semibold">
          {getCurrentDayName()}
        </p>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <label
            htmlFor="schedule-select"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Selecione um horário:
          </label>
          <select
            id="schedule-select"
            onChange={handleScheduleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-[#0052a4]"
            value={selectedSchedule?.id || ""}
          >
            {schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.placa} - {schedule.horario}
              </option>
            ))}
          </select>

          {selectedSchedule && (
            <div className="mt-8 text-center">
              <div className="mb-4">
                <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
                  <span>Interesse na Van</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-8 mt-2 overflow-hidden border border-gray-300 relative">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ease-in-out ${getProgressColorClass(
                      progressPercentage
                    )}`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Esta fila serve para medir o interesse no horário e não
                  garante um lugar na van.
                </p>
              </div>

              <button
                onClick={handleJoinQueue}
                disabled={
                  hasJoined || queueCount >= selectedSchedule.capacidade
                }
                className="w-full bg-[#0052a4] text-white font-bold py-4 px-4 rounded-lg text-xl hover:bg-[#0143ad] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {hasJoined ? (
                  <>
                    <CheckCircle className="h-6 w-6" />
                    Você entrou na Fila
                  </>
                ) : (
                  <>
                    <Users className="h-6 w-6" />
                    Quero entrar na Fila
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
