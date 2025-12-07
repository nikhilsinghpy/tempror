import React from "react";
import processHero from "../../../assets/images/hairprocess1.webp";
import vectorbg from "../../../assets/images/vectorbg.jpg";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import DoctorCard from "@/components/custom-component/card/doctor-card";
import CallToAction from "@/components/custom-component/CallToAction/call-to-action";

const hairTransplantSteps = [
  {
    title: "Step 1: Consultation & Assessment",
    desc: "Our expert doctors analyze your scalp condition, hair density, and donor area to determine the best-suited transplant method and create a personalized treatment plan.",
  },
  {
    title: "Step 2: Hairline Design",
    desc: "We design a natural and age-appropriate hairline tailored to your facial structure, ensuring aesthetic balance and realistic outcomes.",
  },
  {
    title: "Step 3: Donor Area Preparation",
    desc: "The donor area (usually the back of your scalp) is cleaned and numbed. Healthy follicles are selected for extraction using advanced techniques like FUE or DHI.",
  },
  {
    title: "Step 4: Follicle Extraction",
    desc: "Individual grafts are carefully extracted using micro-punch tools to minimize trauma and preserve follicle health.",
  },
  {
    title: "Step 5: Graft Sorting & Preservation",
    desc: "Extracted grafts are stored in a biocompatible solution to maintain their vitality before implantation.",
  },
  {
    title: "Step 6: Recipient Site Creation",
    desc: "Our surgeons use fine SAVA implanters or Sapphire blades to create micro incisions for precise angle, direction, and density.",
  },
  {
    title: "Step 7: Graft Implantation",
    desc: "Each graft is delicately placed into the recipient area, following the natural growth pattern for a seamless, natural look.",
  },
  {
    title: "Step 8: Post-Op Care & Recovery",
    desc: "You receive detailed post-surgery guidance, medications, and follow-up consultations to ensure proper healing and optimal growth.",
  },
];

const treatmentMethods = [
  {
    name: "FUE (Follicular Unit Extraction)",
    description:
      "A minimally invasive method where individual hair follicles are extracted and implanted. Offers quick recovery, minimal scars, and natural growth.",
  },
  {
    name: "DHI (Direct Hair Implantation)",
    description:
      "An advanced method using SAVA implanters to implant follicles directly without creating separate incisions. Results in denser coverage and less handling.",
  },
  {
    name: "Sapphire FUE",
    description:
      "A refinement of FUE that uses Sapphire blades for incision creation. Reduces tissue damage, accelerates healing, and enhances precision.",
  },
  {
    name: "Belleza Signature Technique",
    description:
      "A customized hybrid technique combining FUE and DHI benefits to ensure minimal graft exposure, higher survival rate, and perfect hairline design.",
  },
];

export default function HairTransplantPage() {
  return (
    <div className="p-4 space-y-8">
      {/* Hero Section */}
      <div
        className="w-full min-h-[50vh] rounded-lg flex flex-col justify-center items-center gap-4"
        style={{
          backgroundImage: `url(${vectorbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 flex items-center justify-center flex-col gap-2 md:gap-4 text-center">
          <p className="text-lg sm:text-2xl md:text-3xl font-bold capitalize">
            The Science Behind
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl font-bold capitalize">
            Our Hair Transplant Process
          </p>
          <div className="flex flex-col md:flex-row gap-3 mt-2">
            <Button
              onClick={() => {
                window.location.href = "/book-appointment";
              }}
            >
              Book Consultation
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                window.location.href = "/contact-us";
              }}
            >
              Talk to Specialist
            </Button>
          </div>
        </div>
        <img
          src={processHero}
          alt="hair-process"
          className="w-full sm:w-[60%] md:w-[40%]"
          loading="lazy"
        />
      </div>

      {/* Step-by-Step Process */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <p className="text-center text-2xl md:text-3xl font-bold mb-6">
          Step-by-Step Hair Transplant Journey
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {hairTransplantSteps.map((step, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="font-bold text-gray-900 text-md">
                {`0${index + 1}`} {step.title}
              </p>
              <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment Methods */}
      <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <p className="text-sm md:text-base font-bold text-primary-foreground uppercase tracking-wider">
            Treatment Methods
          </p>
          <p className="text-lg md:text-xl font-medium text-gray-700">
            Explore our advanced, pain-free, and high-precision techniques for
            long-lasting results.
          </p>
          <div className="flex flex-col gap-4 mt-4">
            {treatmentMethods.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <p className="text-md font-bold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 relative">
          <img
            src={processHero}
            alt="treatment vector"
            className="w-full rounded-lg shadow-lg"
            loading="lazy"
          />
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-primary-foreground/30 to-pink-200 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-yellow-200 to-primary-foreground/40 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Doctor Carousel */}
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-md md:text-2xl font-semibold mb-4">
          Meet Our Hair Restoration Experts
        </p>
        <CrouselCs>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 py-4">
              <DoctorCard
                name="Dr. Rohan Mehta"
                specialty="Hair Transplant Surgeon"
                hospital="Belleza Clinic"
                rating={4.9}
                reviewsCount={410}
                experienceYears={10}
                location="Rohini, Delhi"
                avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFfJHSPwz9vE7pdOdeyxspvQfshgziqS9VQ&s"
                bio={`Dr. Mehta is a certified hair transplant expert specializing in FUE and DHI with over 10 years of successful transformations.`}
                onBook={() => (window.location.href = "/book-appointment")}
              />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>

      {/* CTA Section */}
      <CallToAction />
    </div>
  );
}
