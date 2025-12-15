import React, { useEffect, useState } from "react";
import processHero from "../../../assets/images/hairprocess1.webp";
import vectorbg from "../../../assets/images/vectorbg.jpg";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import DoctorCard from "@/components/custom-component/card/doctor-card";
import CallToAction from "@/components/custom-component/CallToAction/call-to-action";
import { getHandler } from "@/services/api.services";

const beardTransplantSteps = [
  {
    title: "Step 1: Consultation & Beard Assessment",
    desc: "Our specialists evaluate your facial hair pattern, skin type, and donor area to design a personalized beard transplant plan suited to your look and growth goals.",
  },
  {
    title: "Step 2: Beard Design & Density Planning",
    desc: "We carefully design the beard outline, including mustache, jawline, and cheek areas, ensuring natural symmetry and proportion to your facial features.",
  },
  {
    title: "Step 3: Donor Area Preparation",
    desc: "The donor area, typically the back of your scalp, is trimmed, cleaned, and numbed. Healthy follicles are selected for extraction using advanced FUE or DHI techniques.",
  },
  {
    title: "Step 4: Follicle Extraction",
    desc: "Individual hair grafts are extracted using micro-punch tools under magnification to ensure precision and preserve follicle integrity.",
  },
  {
    title: "Step 5: Graft Sorting & Preservation",
    desc: "Extracted grafts are sorted according to hair type and thickness, then preserved in a biocompatible solution to maintain their vitality before implantation.",
  },
  {
    title: "Step 6: Recipient Site Creation",
    desc: "Using ultra-fine implanters or Sapphire blades, our surgeons create micro incisions in the beard area at natural angles and directions for authentic results.",
  },
  {
    title: "Step 7: Graft Implantation",
    desc: "Each graft is strategically implanted into the designed beard area, ensuring even density, natural alignment, and minimal trauma to the skin.",
  },
  {
    title: "Step 8: Post-Procedure Care & Growth Support",
    desc: "After the procedure, we provide detailed aftercare instructions, medications, and follow-ups to promote smooth healing and healthy beard growth.",
  },
];

const beardTreatmentMethods = [
  {
    name: "FUE Beard Transplant",
    description:
      "A minimally invasive technique where follicles are extracted from the scalp and implanted in the beard area. Offers natural results with minimal scarring.",
  },
  {
    name: "DHI (Direct Hair Implantation)",
    description:
      "An advanced method that implants follicles directly into the beard without creating prior incisions, ensuring higher precision and faster recovery.",
  },
  {
    name: "Sapphire FUE Beard Technique",
    description:
      "Uses Sapphire blades for micro incisions, enhancing accuracy, minimizing tissue damage, and promoting faster healing.",
  },
  {
    name: "Belleza Signature Beard Technique",
    description:
      "A hybrid of FUE and DHI, customized to deliver perfect beard density, uniformity, and natural appearance tailored to your face.",
  },
];

export default function BeardTransplantPage() {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await getHandler("/doctor/get");
      setDoctors(response.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

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
            The Art & Science Behind
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl font-bold capitalize">
            Our Beard Transplant Process
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
          alt="beard-process"
          className="w-full sm:w-[60%] md:w-[40%]"
          loading="lazy"
        />
      </div>

      {/* Step-by-Step Process */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <p className="text-center text-2xl md:text-3xl font-bold mb-6">
          Step-by-Step Beard Transplant Journey
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {beardTransplantSteps.map((step, index) => (
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
            Explore our advanced, pain-free, and precision-driven techniques for
            achieving your ideal beard density and style.
          </p>
          <div className="flex flex-col gap-4 mt-4">
            {beardTreatmentMethods.map((item, index) => (
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
          Meet Our Beard Restoration Specialists
        </p>
        <CrouselCs>
          {doctors.map((doctor, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 py-4">
              <DoctorCard
                key={index}
                name={doctor?.name}
                specialty={doctor?.speciality}
                hospital={doctor?.branch?.title}
                rating={doctor?.rating}
                reviewsCount={doctor?.totalReviews}
                experienceYears={doctor?.experience}
                location={doctor?.branch?.contact?.address}
                avatarUrl={doctor?.profile?.secure_url}
                bio={doctor?.bio}
                onBook={() => {
                  window.location.href = "/book-appointment";
                }}
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
