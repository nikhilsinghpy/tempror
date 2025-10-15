import { Button } from "@/components/ui/button";
import React from "react";

export default function CallToAction() {
  return (
    <div className="max-w-7xl mx-auto my-16 px-4 py-12 bg-gradient-to-r from-primary-foreground/30 to-slate-200 rounded-2xl flex flex-col items-center text-center shadow-lg">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Ready to take the first step toward{" "}
        <span className="text-primary-foreground">renewed confidence?</span>
      </h2>
      <p className="text-md sm:text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
        Book your free consultation with our hair experts today!
      </p>
      <Button
        className={"bg-primary-foreground text-white"}
        onClick={() => {
          window.location.href = "/contact-us";
        }}
      >
        Book Appointment
      </Button>
    </div>
  );
}
