import React from "react";
import homeimg1 from "../../assets/images/homepage1.jpg";
import HeroSection from "@/components/custom-component/HeroSection/hero-section";
import RatingCard from "@/components/custom-component/card/rating-card";
import { Anchor, MessageCircle, UserCheck, UserPlus } from "lucide-react";
import ServiceCard from "@/components/custom-component/card/service-card";
import ResultCard from "@/components/custom-component/card/result-card";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import DoctorCard from "@/components/custom-component/card/doctor-card";
import ReviewCard from "@/components/custom-component/card/review-card";
const heroData = [
  {
    id: 1,
    tag: "Hair Transplant",
    title: "Restore Your Confidence with Hair Transplant",
    description:
      "Our advanced hair transplant techniques provide natural-looking results with minimal downtime. Regain your hair and your self-esteem.",
    cta1: "Book a Free Consultation",
    cta2: "Learn More",
    image: "https://www.bellezarohini.com/image-new/1.jpg",
  },
  {
    id: 2,
    tag: "Beard Transplant",
    title: "Achieve a Fuller Beard with Precision",
    description:
      "Get the beard you’ve always wanted. Our expert beard transplant services are tailored for density and symmetry.",
    cta1: "Schedule an Appointment",
    cta2: "Explore Treatment",
    image:
      "https://www.bellezarohini.com/doctor/hair-transplant-doctor%20(2).JPG",
  },
  {
    id: 3,
    tag: "Eyebrow Transplant",
    title: "Perfect Your Look with Eyebrow Restoration",
    description:
      "Enhance your facial features with fuller, natural-looking eyebrows through our safe and effective eyebrow transplant procedure.",
    cta1: "Get Started Today",
    cta2: "See Before & After",
    image: homeimg1,
  },
];
const ratingData = [
  {
    platform: "Google",
    rating: 4.8,
    rating_type: "average",
    max_rating: 5,
    stars_displayed: 5,
  },
  {
    platform: "Proven Expert",
    rating: 4.8,
    rating_type: "average",
    max_rating: 5,
    stars_displayed: 5,
  },
  {
    platform: "RealSelf",
    rating: 5.0,
    rating_type: "average",
    max_rating: 5,
    stars_displayed: 5,
  },
  {
    platform: "Trustpilot",
    rating: 4.8,
    rating_type: "average",
    max_rating: 5,
    stars_displayed: 5,
  },
];

const serviceData = [
  {
    title: "Expert Medical Consultants",
    value: "75",
    subtitle: "Specialists in Various Fields",
    description:
      "Our team includes 75 experienced consultants across multiple medical disciplines to ensure you receive expert care.",
    icon: UserCheck,
  },
  {
    title: "Outstanding Patient Feedback",
    value: "2,000+",
    subtitle: "Verified Reviews",
    description:
      "Over 2,000 satisfied patients have rated our services, reflecting our commitment to excellence and care.",
    icon: MessageCircle,
  },
  {
    title: "Global Patient Reach",
    value: "30,000+",
    subtitle: "Patients Worldwide",
    description:
      "Serving more than 30,000 patients globally, we provide trusted healthcare solutions across borders.",
    icon: UserPlus,
  },
  {
    title: "Years of Proven Experience",
    value: "15",
    subtitle: "In the Healthcare Industry",
    description:
      "With 15 years of medical expertise, we combine innovation with trust to deliver exceptional outcomes.",
    icon: Anchor,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <div className="md:h-[calc(100vh-80px)]">
        <HeroSection heroData={heroData} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto p-4">
          {ratingData.map((item, index) => (
            <RatingCard ratingData={item} key={index} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-10 px-4">
          Leading with Experience and Excellence – Your Trusted Healthcare
          Partner, Proven Worldwide
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {serviceData.map((item, index) => (
            <ServiceCard serviceData={item} key={index} />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-10 px-4">
          See the Transformation: Real Results from Our Hair Transplant
          Procedure
        </p>
        <CrouselCs autoPlayEnabled={true}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 py-4"
            >
              <div className="p-2 border rounded-md shadow-md ">
                <img
                  src="https://facesurgeon.in/wp-content/uploads/2020/03/hair-transplantation-in-india.jpg"
                  alt="demo"
                  className="rounded-md"
                />
              </div>
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-10 px-4">
          Inside Our Clinic: The Ultimate Hair Transplant Experience
        </p>
        <CrouselCs>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 py-4">
              <Card className="p-0 md:min-h-[300px] overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div className="relative w-full h-full">
                    <iframe
                      className="w-full md:min-h-[300px]"
                      src="https://www.youtube-nocookie.com/embed/Y_29eVU2eyo?si=0WyzBIJD32RIWXDS"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-10 px-4">
          Meet Our Expert Doctors and Dedicated Clinic Team
        </p>
        <CrouselCs>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 py-4">
              <DoctorCard
                name="Dr. Ananya Sharma"
                specialty="Cardiologist"
                hospital="City Heart Institute"
                rating={4.9}
                reviewsCount={342}
                experienceYears={12}
                location="Rohini, Delhi"
                avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRripLcqGUKIBfgbtmux6U1UY9UkgezqzJzFw&s"
                bio={`Dr. Ananya Sharma is a senior cardiologist with 12+ years of experience in interventional cardiology. She focuses on patient-centred care and minimally invasive procedures.`}
                onBook={() => console.log("Booked appointment with Dr. Ananya")}
              />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-10 px-4">
          Trusted by Thousands of Patients From Around the India
        </p>
        <CrouselCs autoScrollenabled={true}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 py-4">
              <ReviewCard />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
    </div>
  );
}
