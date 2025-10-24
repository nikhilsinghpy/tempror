import DoctorCard from "@/components/custom-component/card/doctor-card";
import { Button } from "@/components/ui/button";
import React from "react";

export default function DoctorPageAdmin() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Manage Doctors</h1>
        <Button>+ Add Doctor</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 15 }).map((index) => (
          <DoctorCard
            key={index}
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
        ))}
      </div>
    </div>
  );
}
