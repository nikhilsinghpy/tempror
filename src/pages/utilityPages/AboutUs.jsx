import React from "react";
import aboutus1 from "../../assets/images/aboutus1.png";
import vectorbg from "../../assets/images/vectorbg.jpg";
import { Button } from "@/components/ui/button";
import { Anchor, MessageCircle, UserCheck, UserPlus } from "lucide-react";
import { CarouselItem } from "@/components/ui/carousel";
import DoctorCard from "@/components/custom-component/card/doctor-card";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import CallToAction from "@/components/custom-component/CallToAction/call-to-action";

const ourStory = [
  {
    title: "Expert-Driven Innovation",
    desc: "With years of focused experience, our surgeons are masters of FUE, Sapphire FUE, and DHI methods — and we developed our own Belleza Technique that minimizes graft exposure and maximizes survival.",
  },
  {
    title: "Precision Meets Personal Care",
    desc: "Every hairline is unique. We design each transplant plan in collaboration with you, using micro incisions and SAVA implanters to ensure natural density and aesthetic harmony",
  },
  {
    title: "Comprehensive Support & Transparency",
    desc: "From your initial consultation through post-op recovery, our support team (available 7 days a week) guides you step by step — including clear cost breakdowns (starting at ₹30 per graft) and realistic expectations.",
  },
  {
    title: "Restoring more than hair — confidence",
    desc: "Our mission is to renew your self-esteem. We don’t just treat baldness; we help you reclaim your look, your presence, your confidence.",
  },
  {
    title: "Ethical & Transparent Care",
    desc: "Honesty is our foundation. From pricing to procedure details, we keep everything transparent — no hidden costs, no false promises, only genuine guidance.",
  },
];
const ourMission = {
  sectionTitle: "Our Mission",
  intro:
    "At Belleza Rohini, our mission is to transform confidence through science, care, and artistry. We believe true beauty begins with self-belief — and our goal is to help every individual rediscover that inner strength through natural, lasting results.",
  points: [
    {
      title: "Empower Through Transformation",
      description:
        "We aim to go beyond cosmetic change, creating transformations that inspire confidence and self-love from within.",
    },
    {
      title: "Deliver Uncompromising Quality",
      description:
        "Our commitment is to excellence — in technology, safety, and personalized care — ensuring every patient receives world-class treatment and trusted outcomes.",
    },
    {
      title: "Innovate With Integrity",
      description:
        "We continuously adopt the most advanced, ethical, and evidence-based techniques to set new standards in hair restoration and aesthetic care.",
    },
    {
      title: "Prioritize Every Patient’s Journey",
      description:
        "Every step matters — from consultation to recovery. We ensure compassion, clarity, and comfort throughout your transformation experience.",
    },
    {
      title: "Build a Legacy of Trust",
      description:
        "Our mission extends beyond procedures; it’s about relationships built on honesty, respect, and long-term satisfaction.",
    },
  ],
};
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
    value: "2,000",
    subtitle: "Verified Reviews",
    description:
      "Over 2,000 satisfied patients have rated our services, reflecting our commitment to excellence and care.",
    icon: MessageCircle,
  },
  {
    title: "Global Patient Reach",
    value: "30,000",
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
const whyChooseUs = {
  title: "Why Choose Us",
  desc: "At Belleza Hair Transplant Clinic, we understand that choosing the right clinic for your hair restoration journey is a significant decision. Here's why we stand out as a trusted choice for clients in Delhi and beyond",
  points: [
    {
      title: "Expertise & Experience",
      description:
        "Our team comprises renowned hair transplant surgeons in India, highly experienced in advanced techniques like FUE, Sapphire FUE, and DHI, ensuring precise and natural-looking results.",
      icon: "UserCheck",
    },
    {
      title: "State-of-the-Art Technology",
      description:
        "We use cutting-edge equipment and imaging systems to plan each transplant with precision, minimizing downtime and ensuring effective results.",
      icon: "Cpu",
    },
    {
      title: "Personalized Care",
      description:
        "From consultation to post-operative follow-ups, we provide comprehensive care and support to ensure you are informed and comfortable throughout your journey.",
      icon: "Heart",
    },
    {
      title: "Affordable Excellence",
      description:
        "We provide world-class hair restoration solutions at competitive prices, making top-quality care accessible to everyone.",
      icon: "DollarSign",
    },
    {
      title: "Proven Results",
      description:
        "Our clinic is known for exceptional outcomes, with numerous success stories from clients who have regained confidence and natural hair growth.",
      icon: "CheckCircle2",
    },
  ],
};

export default function AboutUs() {
  return (
    <div className="p-4 space-y-8">
      <div
        className="w-full min-h-[50vh] rounded-lg flex flex-col justify-center items-center gap-4"
        style={{
          backgroundImage: `url(${vectorbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 flex items-center justify-center flex-col gap-2 md:gap-4">
          <p className="text-lg sm:text-2xl md:text-3xl  capitalize font-bold text-center ">
            we're changing the
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl  capitalize font-bold text-center ">
            whole Game of Personality
          </p>
          <div className="flex flex-col md:flex-row md:gap-4 gap-2">
            <Button
              onClick={() => {
                window.location.href = "/book-appointment";
              }}
            >
              Book an Appointment
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                window.location.href = "/contact-us";
              }}
            >
              Request a Call
            </Button>
          </div>
        </div>
        <img
          src={aboutus1}
          alt="vector-aboutus"
          className="w-full sm:w-[60%] md:w-[40%]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-start gap-8 py-12 px-4">
        {/* Left Side: Story + Image */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col gap-6 border rounded-xl shadow-md relative">
          <p className="text-sm md:text-base font-bold text-primary-foreground uppercase tracking-wider">
            Our Story
          </p>
          <p className="text-[14px] md:text-lg font-medium text-gray-700">
            We believe that confidence should never be lost — only restored. At
            Belleza Rohini, we’re committed to redefining hair restoration with
            world-class care, advanced techniques, and deeply personalized
            treatment.
          </p>

          {/* Vector Image */}
          <div className="relative mt-4">
            <img
              src={aboutus1}
              alt="vector-aboutus"
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
            {/* Decorative gradient blobs */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-primary-foreground/30 to-pink-200 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-yellow-200 to-primary-foreground/40 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Right Side: Story Points */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {ourStory.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-md font-bold text-gray-900">
                {`0${index + 1}`} {item.title}
              </p>
              <p className="text-sm md:text-md text-gray-600 mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-start gap-8 py-12 px-4">
        {/* Left Side: Mission Text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <p className="text-sm md:text-base font-bold text-primary-foreground uppercase tracking-wider">
            {ourMission.sectionTitle}
          </p>
          <p className="text-[14px] md:text-lg font-medium text-gray-700">
            {ourMission.intro}
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {ourMission.points.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-md font-bold text-gray-900">
                  {`0${index + 1}`} {item.title}
                </p>
                <p className="text-sm md:text-md text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Stats + Vector */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Stats Cards */}
          <div className="flex justify-around bg-slate-50 rounded-xl p-4 shadow-inner">
            {serviceData.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <p className="text-xl md:text-3xl font-extrabold text-primary-foreground">
                  {item.value}+
                </p>
                <p className="text-xs md:text-sm font-semibold text-gray-700 text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Vector Image */}
          <div className="relative mt-4">
            <img
              src={aboutus1}
              alt="vector-aboutus"
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
            {/* Optional decorative blobs */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-primary-foreground/30 to-pink-200 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-yellow-200 to-primary-foreground/40 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <p className="text-md md:text-2xl font-semibold text-center max-w-4xl mx-auto mb-4 px-4">
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
                onBook={() => {
                  window.location.href = "/book-appointment";
                }}
              />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 py-12 px-4">
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <p className="text-sm md:text-base font-bold text-primary-foreground uppercase tracking-wider">
            {whyChooseUs.title}
          </p>
          <p className="text-[14px] md:text-lg font-medium text-gray-700">
            {whyChooseUs.desc}
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {whyChooseUs.points.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary-foreground font-bold text-xl">{`0${
                    index + 1
                  }`}</div>
                  <p className="font-semibold text-gray-900 text-md">
                    {item.title}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Hero / Title */}
        <div className="w-full md:w-1/2 flex justify-start md:justify-end">
          <div className="relative">
            <p className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Why <br />
              Choose <br />
              <span className="text-primary-foreground">Belleza</span> <br />
              Hair <br />
              Transplant <br />
              Clinic
            </p>
            {/* Optional: Add subtle gradient overlay or decorative shapes */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-r from-primary-foreground/30 to-pink-200 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-r from-yellow-200 to-primary-foreground/40 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
      <CallToAction />
    </div>
  );
}
