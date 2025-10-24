import HeroSectionForm from "@/components/custom-component/forms/hero-section-form";
import React from "react";

export default function HeroSectionAdmin() {
  return (
    <div className="p-4 w-full ">
      <h1 className="text-2xl font-bold my-4">Hero Section </h1>
      <HeroSectionForm />
    </div>
  );
}
