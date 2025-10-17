import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";

export default function AuthLayout() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          unstyled: true,
          className:
            "flex items-center gap-2 rounded-md shadow-lg p-4 border min-w-[250px] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px] max-w-[90vw] mx-auto",
          classNames: {
            error: "text-red-600 bg-white border-red-600 ",
            success: "text-green-600 bg-white border-green-600 ",
            warning: "text-yellow-600 bg-white border-yellow-600 ",
            info: "text-blue-400 bg-white border-blue-400 ",
          },
        }}
      />
      <Outlet />
    </>
  );
}
