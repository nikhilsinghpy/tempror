import DoctorCard from "@/components/custom-component/card/doctor-card";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import HeroSectionNonAnimate from "@/components/custom-component/HeroSection/hero-section-nonAnimate";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import React from "react";

export default function BranchPage() {
  return (
    <div className="p-2 space-y-12">
      <HeroSectionNonAnimate
        heroImage="https://images.unsplash.com/photo-1522071820081-009f5f766356?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        title="Belleza Jaipur Branch"
        intro="Transform your look at Belleza Clinic, Jaipur! Experts in Hair, Beard, and Eyebrow & Eyelash Transplants, blending advanced technology with world-class results."
        CTA={{
          href: "#",
          text: "Book an Appointment",
        }}
        badge={{ icon: MapPin, text: "Jaipur" }}
        contact={[
          { icon: MapPin, text: "Shop 12, Rohini Sector 5, Delhi, India" },
          { icon: Phone, text: "+91 98765 43210" },
        ]}
      />
      <div className="max-w-7xl mx-auto">
        <p className="text-md md:text-2xl font-semibold text-start mb-10 px-4">
          Top Doctors From Belleza Jaipur
        </p>
        <CrouselCs autoPlayEnabled={true}>
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
                onClick={() => {
                  window.location.href = "/book-appointment";
                }}
              />
            </CarouselItem>
          ))}
        </CrouselCs>
      </div>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://media.istockphoto.com/id/1496720417/photo/high-five-for-being-such-a-brave-little-boy.jpg?s=612x612&w=0&k=20&c=jrhbbPCEEN5Z3nSmTdu6fBC84v0kFuuJ8L4l2reghn4="
              alt="Doctors"
              className="rounded-xl shadow-lg object-cover w-full "
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-500 mb-6">
              We provide expert care with modern facilities and a compassionate
              team, ensuring personalized treatment for every patient.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6 py-4">
              <div>
                <h3 className="font-semibold text-gray-900">Primary Care</h3>
                <p className="text-gray-500 text-sm">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lab Test</h3>
                <p className="text-gray-500 text-sm">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Symptom Check</h3>
                <p className="text-gray-500 text-sm">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Heart Rate</h3>
                <p className="text-gray-500 text-sm">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia.
                </p>
              </div>
            </div>

            <Button>Book Appointment</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
