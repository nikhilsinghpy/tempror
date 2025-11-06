import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";

export default function HeroBannerForm({ setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      postHandler("/websiteSection/herobanner/create", formData, {
        "Content-Type": "multipart/form-data",
      }),
      {
        loading: "Submitting form...",
        success: (response) => {
          setFormData({
            title: "",
            subtitle: "",
            image: null,
          });
          setIsOpen(false);
          setIsLoading(false);
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
      <div className="flex flex-col space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter banner title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          name="subtitle"
          placeholder="Enter banner subtitle"
          value={formData.subtitle}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="image">Banner Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        {formData.image && (
          <p className="text-sm text-gray-500">
            Selected: {formData.image.name}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
}
