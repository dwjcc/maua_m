import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ChevronDown, Mail, Phone } from "lucide-react";

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-lg">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 bg-gray-50 text-gray-700">{answer}</div>
        </div>
      </div>
    </div>
  );
};

export const FaqContato = (): JSX.Element => {
  const navigate = useNavigate();

  const faqQuestions = [
    {
      id: 1,
      question: "Quais os períodos da van?",
      answer:
        "Acesse o site da Mauá ou o itinerário no aplicativo para conferir o horário do dia atual.",
    },
    {
      id: 2,
      question: "As vans operam durante a noite na Mauá?",
      answer:
        "Sim, em vários horários, todos os dias. Recomendamos verificar a tabela de horários para os detalhes específicos.",
    },
    {
      id: 3,
      question: "Pode ocorrer atraso na chegada e na saída das vans?",
      answer:
        "Sim, é possível que haja atrasos devido a trânsito ou outros imprevistos. Enviaremos notificações no aplicativo em caso de atrasos significativos.",
    },
  ];

  return (
    <div className="bg-[#f1f1f1] flex flex-col w-full min-h-screen">
      {/* Cabeçalho */}
      <header className="relative flex items-center justify-center p-4 bg-white shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 p-2 text-gray-700 hover:bg-gray-200 rounded-full"
          aria-label="Voltar"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 font-['League_Spartan',Helvetica]">
          Dúvidas e Contato
        </h1>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Seção FAQ */}
          <div>
            <h2 className="text-xl font-bold text-slate-700 mb-4">
              Perguntas Frequentes
            </h2>
            <div className="rounded-xl overflow-hidden shadow-lg bg-white">
              {faqQuestions.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>

          {/* Seção Contato */}
          <div>
            <h2 className="text-xl font-bold text-slate-700 mb-4">
              Canais de Contato
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-5">
              <a
                href="mailto:email@contato.com"
                className="flex items-center gap-4 group"
              >
                <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Email para contato
                  </h3>
                  <p className="text-blue-600 group-hover:underline">
                    email@contato.com
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Telefone</h3>
                  <p className="text-gray-600">XXXX-XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
