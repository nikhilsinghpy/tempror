import React, { useEffect, useState } from "react";
import processHero from "../../../assets/images/hairprocess1.webp"; // ✅ Replace with your eyebrow process image
import vectorbg from "../../../assets/images/vectorbg.jpg";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import DoctorCard from "@/components/custom-component/card/doctor-card";
import CallToAction from "@/components/custom-component/CallToAction/call-to-action";
import { getHandler } from "@/services/api.services";

const eyebrowTransplantSteps = [
  {
    title: "Step 1: Consultation & Analysis",
    desc: "Our experts examine your eyebrow shape, facial symmetry, and donor hair to design a customized eyebrow transplant plan suited to your features and preferences.",
  },
  {
    title: "Step 2: Eyebrow Design & Marking",
    desc: "We artistically design the ideal eyebrow shape, thickness, and arch based on your facial structure to achieve a balanced and natural look.",
  },
  {
    title: "Step 3: Donor Area Preparation",
    desc: "The donor area, usually from the back of the scalp, is cleaned and numbed. Healthy, fine follicles are carefully selected for extraction to match eyebrow hair texture.",
  },
  {
    title: "Step 4: Follicle Extraction",
    desc: "Individual hair follicles are extracted using micro-punch tools with precision to ensure minimal trauma and maximum graft survival.",
  },
  {
    title: "Step 5: Graft Sorting & Preservation",
    desc: "The extracted follicles are sorted based on thickness and direction, then preserved in a nutrient-rich solution to maintain vitality before implantation.",
  },
  {
    title: "Step 6: Recipient Site Creation",
    desc: "Our surgeons use ultra-fine Sapphire blades or implanters to create micro-slits in the eyebrow area at a perfect angle to replicate natural hair growth.",
  },
  {
    title: "Step 7: Graft Implantation",
    desc: "Each graft is delicately implanted one by one following the natural curvature and direction of eyebrow hair for a soft, natural appearance.",
  },
  {
    title: "Step 8: Post-Procedure Care & Growth Support",
    desc: "You receive aftercare instructions, medications, and follow-up consultations to ensure smooth healing and consistent eyebrow growth.",
  },
];

const eyebrowTreatmentMethods = [
  {
    name: "FUE Eyebrow Transplant",
    description:
      "Uses individual follicular extraction for minimal scarring and a natural result. Perfect for reshaping or restoring thin or patchy eyebrows.",
  },
  {
    name: "DHI (Direct Hair Implantation)",
    description:
      "Implants follicles directly without creating prior slits, allowing greater control over angle, depth, and direction — essential for eyebrow precision.",
  },
  {
    name: "Sapphire Eyebrow Technique",
    description:
      "Involves the use of Sapphire blades to create ultra-fine incisions, promoting faster recovery, minimal skin trauma, and high accuracy.",
  },
  {
    name: "Belleza Signature Eyebrow Technique",
    description:
      "A custom hybrid approach combining FUE and DHI advantages to achieve flawless symmetry, density, and natural eyebrow contour.",
  },
];

export default function EyebrowTransplantPage() {
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
            The Art of Precision
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl font-bold capitalize">
            Our Eyebrow Transplant Process
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
          alt="eyebrow-process"
          className="w-full sm:w-[60%] md:w-[40%]"
          loading="lazy"
        />
      </div>

      {/* Step-by-Step Process */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <p className="text-center text-2xl md:text-3xl font-bold mb-6">
          Step-by-Step Eyebrow Transplant Journey
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {eyebrowTransplantSteps.map((step, index) => (
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
            Discover our advanced and ultra-precise eyebrow transplant
            techniques designed for natural shape, density, and definition.
          </p>
          <div className="flex flex-col gap-4 mt-4">
            {eyebrowTreatmentMethods.map((item, index) => (
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
          Meet Our Eyebrow Restoration Experts
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
