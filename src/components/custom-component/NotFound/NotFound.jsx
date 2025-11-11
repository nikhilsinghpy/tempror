import React from "react";


export default function NotFoundPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center ">
      <p className="text-lg text-gray-700"> You look a little lost…</p>
      <p className="text-4xl md:text-5xl font-extrabold text-[#facc15] mt-2">
        Ooops! Page not found
      </p>
      <p className="text-center max-w-md text-gray-600 mt-3">
        Book a 30-minute call to discuss your plans, needs, and goals. We’ll get
        on the same page and create an action plan.
      </p>
    </div>
  );
}
