import { Button } from "@/components/ui/button";
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
    "https://res.cloudinary.com/dlfpme2sn/image/upload/v1765017770/Google_Favicon_2025.svg_bnxtqm.png",
  facebook:
    "https://res.cloudinary.com/dlfpme2sn/image/upload/v1765017791/Facebook_f_logo__2019.svg_s0svyw.png",
  instagram:
    "https://res.cloudinary.com/dlfpme2sn/image/upload/v1765017898/Instagram_logo_2022.svg_dct2mv.webp",
  youtube:
    "https://res.cloudinary.com/dlfpme2sn/image/upload/v1765017897/YouTube_full-color_icon__2017.svg_ss2hc1.webp",
  twitter:
    "https://res.cloudinary.com/dlfpme2sn/image/upload/v1765017896/X_logo_2023.svg_vgickn.webp",
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
    toast.promise(
      postHandler("/review/add", formData, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
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
      }
    );
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
      {formData.sourceUrlLogo && (
        <div className="space-y-2">
          <Label>Source Logo</Label>
          <img
            src={formData.sourceUrlLogo}
            alt={`${formData.source} logo`}
            loading="lazy"
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
