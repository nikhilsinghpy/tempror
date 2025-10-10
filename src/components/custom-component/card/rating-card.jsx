// components/RatingCard.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function RatingCard({ ratingData }) {
  const fullStars = Math.floor(ratingData.rating);
  const hasHalfStar = ratingData.rating % 1 !== 0;

  return (
    <Card className="!gap-0 p-2">
      <CardHeader className="!p-1 gap-0">
        <CardTitle className="text-sm">{ratingData.platform} Rating</CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        <div className="flex items-center space-x-1 mb-1">
          {/* Render full stars */}
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          {/* Optionally render a half star */}
          {hasHalfStar && (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
          )}
          {/* Empty stars */}
          {[
            ...Array(
              ratingData.stars_displayed - fullStars - (hasHalfStar ? 1 : 0)
            ),
          ].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-gray-300" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {ratingData.rating_type.charAt(0).toUpperCase() +
            ratingData.rating_type.slice(1)}{" "}
          rating of {ratingData.rating} out of {ratingData.max_rating}
        </p>
      </CardContent>
    </Card>
  );
}
