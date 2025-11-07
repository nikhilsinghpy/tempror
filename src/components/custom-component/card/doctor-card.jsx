import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function DoctorCard({
  name,
  specialty,
  hospital,
  avatarUrl,
  rating = 4.8,
  reviewsCount = 128,
  experienceYears = 10,
  location,
  bio,
  onBook,
  onClick,
}) {
  return (
    <Card
      className="w-full h-full shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <CardHeader className="flex flex-col items-start gap-3 ">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={`${name} avatar`} />
              ) : (
                <AvatarFallback>
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-base leading-tight">{name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {specialty} {hospital ? `• ${hospital}` : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {rating?.toFixed(1) || "4.8"}
              </span>
            </div>
            <span className="text-xs text-muted-foreground text-end">
              {reviewsCount} reviews
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pt-0">
        <div className="mb-3 flex items-center gap-3">
          <Badge className="rounded-md px-2 py-1">{experienceYears} yrs</Badge>
          {location && (
            <span className="text-sm text-muted-foreground">{location}</span>
          )}
        </div>

        {bio ? (
          <p className="text-sm text-muted-foreground line-clamp-3">{bio}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Compassionate, evidence-based care with a patient-first approach.
          </p>
        )}
      </CardContent>

      <CardFooter className="px-6 py-4">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Available</span>
            <span className="text-sm font-medium">Mon • Sun</span>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={onBook} size="sm">
              Book
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
