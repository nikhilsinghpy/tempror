import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postHandler } from "@/services/api.services";
import React, { useState } from "react";
import { toast } from "sonner";

const mapping = {
  google:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/512px-Google_Favicon_2025.svg.png",
  facebook:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/250px-Facebook_f_logo_%282019%29.svg.png",
  instagram:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png",
  youtube:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
  twitter:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/250px-X_logo_2023.svg.png",
};
export default function AddReviewForm({ fetchData, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    reviewText: "",
    source: "",
    sourceUrlLogo: "",
    sourceUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSourceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      source: value,
      sourceUrlLogo: mapping[value] || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(postHandler("/review/add", formData), {
      loading: "Submitting form...",
      success: (response) => {
        setIsLoading(false);
        setFormData({
          name: "",
          rating: 0,
          reviewText: "",
          source: "",
          sourceUrlLogo: "",
          sourceUrl: "",
        });
        fetchData();
        setIsOpen(false);
        return response.message;
      },
      error: (error) => {
        setIsLoading(false);
        return error.message || "Something went wrong!";
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1–5)</Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>

      {/* Review Text */}
      <div className="space-y-2">
        <Label htmlFor="reviewText">Review</Label>
        <Textarea
          id="reviewText"
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          placeholder="Write your review here..."
        />
      </div>

      {/* Source Select */}
      <div className="space-y-2">
        <Label htmlFor="source">Source</Label>
        <Select onValueChange={handleSourceChange} value={formData.source}>
          <SelectTrigger className={"w-full"}>
            <SelectValue placeholder="Select review source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="youtube">Youtube</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Source URL */}
      <div className="space-y-2">
        <Label htmlFor="sourceUrl">Source URL</Label>
        <Input
          id="sourceUrl"
          name="sourceUrl"
          value={formData.sourceUrl}
          onChange={handleChange}
          placeholder="Paste the source URL (optional)"
        />
      </div>

      {/* Source Logo (Preview) */}
      {formData.sourceUrlLogo && (
        <div className="space-y-2">
          <Label>Source Logo</Label>
          <img
            src={formData.sourceUrlLogo}
            alt={`${formData.source} logo`}
            className="w-12 h-12 rounded-md border"
          />
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        Submit Review
      </Button>
    </form>
  );
}
