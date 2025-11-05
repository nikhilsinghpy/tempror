import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";
import React from "react";

export default function ReviewCard() {
  const review = {
    name: "Sana Malik",
    rating: 3.8,
    reviewText:
      "Superb service and amazing results! The clinic maintains high hygiene standards and uses the latest technology. Highly satisfied.",
    source: "Instagram",
    sourceUrlLogo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    sourceUrl: "https://www.instagram.com/bellezaclinic/",
    createdAt: "2025-11-05T12:40:04.852Z",
  };

  // Format date nicely
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => {
          const fullStars = Math.floor(review.rating);
          const isHalf = i === fullStars && review.rating % 1 >= 0.5;

          if (i < fullStars) {
            return (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400 mr-1 fill-yellow-400"
              />
            );
          } else if (isHalf) {
            return (
              <StarHalf
                key={i}
                className="w-5 h-5 text-yellow-400 mr-1 fill-yellow-400"
              />
            );
          } else {
            return <Star key={i} className="w-5 h-5 text-gray-300 mr-1" />;
          }
        })}
      </div>

      <CardContent className="p-0">
        <p className="text-gray-700 text-sm mb-4">{review.reviewText}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="w-8 h-8 mr-3">
              <AvatarImage
                src="https://i.pravatar.cc/40?img=47"
                alt={review.name}
              />
              <AvatarFallback>
                {review.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{review.name}</p>
              <p className="text-xs text-gray-400">{formattedDate}</p>
            </div>
          </div>

          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <img
              src={review.sourceUrlLogo}
              alt={review.source}
              className="w-5 h-5"
            />
            <span className="text-xs text-gray-500">{review.source}</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
