import DoctorCard from "@/components/custom-component/card/doctor-card";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import React from "react";

export default function BranchPage() {
  return (
    <div className="p-2 space-y-12">
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-8">
            <div>
              {/* Content */}
              <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
                <MapPin className="h-4 w-4" />
                Jaipur
              </p>
              <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                Belleza Jaipur Branch
              </h1>
              <p className="mt-4 text-slate-600 text-[12px] md:text-sm">
                Transform your look at Belleza Clinic, Jaipur! Experts in Hair,
                Beard, and Eyebrow & Eyelash Transplants, blending advanced
                technology with world-class results.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium hover:bg-slate-800"
                >
                  Book an Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 " />
                  Shop 12, Rohini Sector 5, Delhi, India
                </span>
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </span>
              </div>
            </div>

            <div className="relative">
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <img
                  src={
                    "https://images.unsplash.com/photo-1522071820081-009f5f766356?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  }
                  alt="Lifestyle product banner"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
                onBook={() => console.log("Booked appointment with Dr. Ananya")}
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
