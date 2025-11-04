import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import React from "react";

export default function BranchCard({ branch, onClick }) {
  return (
    <Card className={"h-fit"} onClick={() => onClick(branch)}>
      <CardContent className={"space-y-2"}>
        <CardTitle>{branch.title}</CardTitle>
        <CardDescription>{branch.description}</CardDescription>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {branch.contact.address}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {branch.contact.phone}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
