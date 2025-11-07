import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock } from "lucide-react";

export default function ResultCard({ data }) {
  const { title, treatment, image, branch, createdAt } = data;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="py-0 h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-slate-200">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image?.secure_url}
          alt={title}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-primary-foreground text-white text-xs px-3 py-1 rounded-full">
          {branch?.title}
        </Badge>
      </div>
      <CardContent className="space-y-2 px-3 pb-3">
        {title}
        <p className="text-slate-600 text-sm">{`${treatment?.slice(
          0,
          70
        )}...`}</p>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" /> Added on {formattedDate}
        </div>

        <div className="border-t border-slate-100 pt-3 space-y-1">
          <div className="flex items-center text-sm gap-2 text-slate-700">
            <MapPin className="h-4 w-4 text-slate-500" />
            <span>{branch?.contact?.address}</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-slate-700">
            <Phone className="h-4 w-4 text-slate-500" />
            <span>{branch?.contact?.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
