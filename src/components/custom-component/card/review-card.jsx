import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

export default function ReviewCard() {
  return (
    <Card className="p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 mr-1" />
        ))}
      </div>
      <CardContent className="p-0">
        <h3 className="font-semibold text-sm md:text-md mb-2">
          Fantastic Collaboration
        </h3>
        <p className="text-gray-600 text-[10px] md:text-xs mb-4">
          SmartUXDesign transformed my online presence! Their innovative website
          design not only captivated my audience but also elevated user
          engagement.
        </p>
        <div className="flex items-center">
          <Avatar className="w-8 h-8 mr-3">
            <AvatarImage
              src="https://i.pravatar.cc/40?img=5"
              alt="Floyd Miles"
            />
            <AvatarFallback>FM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Floyd Miles</p>
            <p className="text-xs text-gray-400">2025-12-12</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
