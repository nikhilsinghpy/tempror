import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import React from "react";

const contact = [
  { icon: MapPin, text: "Shop 12, Rohini Sector 5, Delhi, India" },
  { icon: Phone, text: "+91 98765 43210" },
];

export default function BranchCard({ branch, onClick }) {
  return (
    <Card className={"h-fit"} onClick={onClick}>
      <CardContent className={"space-y-2"}>
        <CardTitle>Belleza Jaipur Branch</CardTitle>
        <CardDescription>
          Transform your look at Belleza Clinic, Jaipur! Experts in Hair, Beard,
          and Eyebrow & Eyelash Transplants, blending advanced technology with
          world-class results.
        </CardDescription>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-slate-600">
          {contact.map((item, index) => (
            <span className="inline-flex items-center gap-2" key={index}>
              <item.icon className="h-4 w-4" />
              {item.text}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
