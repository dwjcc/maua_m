import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion.tsx";
import { Card, CardContent } from "../../components/ui/card";

export const FaqContato = (): JSX.Element => {
  const navigate = useNavigate();

  // FAQ questions data
  const faqQuestions = [
    { id: 1, question: "Quais os periodos da van?", answer: "" },
    { id: 2, question: "Quais os periodos da van?", answer: "" },
    { id: 3, question: "Quais os periodos da van?", answer: "" },
    { id: 4, question: "Quais os periodos da van?", answer: "" },
    { id: 5, question: "Quais os periodos da van?", answer: "" },
  ];

  return (
    <div className="bg-[#f1f1f1] flex flex-row justify-center w-full">
      <div className="bg-[#f1f1f1] w-[390px] h-[844px] relative">
        {/* Back button */}
        <div 
          onClick={() => navigate(-1)}
          className="absolute w-11 h-11 top-[50px] left-6 bg-[#d9d9d9] rounded-[22px] flex items-center justify-center cursor-pointer hover:bg-[#c9c9c9] transition-colors"
        >
          <ArrowLeftIcon className="w-[42px] h-[42px]" />
        </div>

        {/* FAQ Accordion */}
        <div className="absolute top-36 left-[33px] w-[325px] flex flex-col gap-[22px]">
          {faqQuestions.map((faq) => (
            <Accordion
              key={faq.id}
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value={`item-${faq.id}`} className="border-none">
                <AccordionTrigger className="bg-[#d9d9d9] rounded-[20px] px-[15px] py-[15px] h-[51px] [font-family:'League_Spartan',Helvetica] font-semibold text-black text-2xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer || "Informação não disponível no momento."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        {/* Contact Card */}
        <Card className="absolute w-[294px] h-[167px] top-[545px] left-[47px] bg-[#0052a4] rounded-[20px] border-none">
          <CardContent className="p-0">
            <div className="p-[30px] text-white">
              <p className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl mb-4">
                Email pra contato:
                <br />
                email@contato.com
              </p>
              <p className="[font-family:'League_Spartan',Helvetica] font-semibold text-2xl whitespace-nowrap">
                Telefone: XXXX-XXXX
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};