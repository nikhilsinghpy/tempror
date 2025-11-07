import React, { useEffect } from "react";
import AppointmentForm from "@/components/custom-component/forms/appointment-from";
import vectorbg from "../../assets/images/vectorbg.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/use-user";

const accordionData = [
  {
    value: "item-1",
    trigger: "How can I schedule an appointment at Belleza?",
    content:
      "You can schedule your appointment by filling out the online booking form, calling our helpline, or messaging us on WhatsApp. Our team will confirm your preferred date and time shortly.",
  },
  {
    value: "item-2",
    trigger: "Can I reschedule or cancel my appointment?",
    content:
      "Yes, you can reschedule or cancel your appointment up to 24 hours in advance by contacting our support team through phone or WhatsApp.",
  },
  {
    value: "item-3",
    trigger: "Is there any consultation fee for booking an appointment?",
    content:
      "Yes, a nominal consultation fee is charged when booking your appointment. The exact amount depends on the type of consultation you choose — in-person or online.",
  },
  {
    value: "item-4",
    trigger: "Will I receive a confirmation after booking?",
    content:
      "Absolutely. Once you book your appointment, you’ll receive a confirmation message via SMS or WhatsApp with your appointment details and clinic address.",
  },
  {
    value: "item-5",
    trigger: "What should I bring for my first appointment?",
    content:
      "Please bring a valid ID proof, any previous medical or hair treatment records, and photographs (if applicable) to help our specialists assess your case accurately.",
  },
];

export default function AppointmentPage() {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  useEffect(() => {
    if (!loading && !user) navigate("/auth/login");
  }, [user]);
  return (
    <div className="p-4 space-y-12">
      <div
        className="w-full min-h-[60vh] rounded-2xl flex flex-col justify-center items-center gap-6 text-center text-white relative overflow-hidden"
        style={{
          backgroundImage: `url(${vectorbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <p className="relative text-3xl sm:text-4xl md:text-6xl font-extrabold capitalize">
          Schedule Your <br />
          <span className="text-primary underline">Consultation</span>
        </p>
        <p className="relative text-md sm:text-lg md:text-xl font-light max-w-2xl">
          Take the first step toward your transformation. Book an appointment
          with our specialists and let’s start your journey together.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl md:text-3xl font-semibold text-center mb-6 px-4">
          Frequently Asked Questions
        </p>
        <Accordion type="single" collapsible>
          {accordionData.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="font-bold text-gray-900 px-2">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 px-2 mt-1">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="max-w-6xl mx-auto">
        <AppointmentForm />
      </div>
    </div>
  );
}
