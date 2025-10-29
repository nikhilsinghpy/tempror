import React from "react";
import { Button } from "@/components/ui/button";
import image from "../../../assets/images/im1.webp";

export default function HeroBanner() {
  return (
    <div className="w-full border md:h-[80vh] h-full rounded-2xl overflow-hidden">
      <img
        src={"https://template.canva.com/EAFuQYgmRyU/1/0/1600w-Bjs-Cr6KJFQ.jpg"}
        alt="Hero Banner"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
