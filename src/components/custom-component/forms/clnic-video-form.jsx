import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";

export default function ClinicVideoForm({ setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    youTubeVideoUrl: "",
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    toast.promise(
      postHandler("/websiteSection/clinicVideo/create", formData, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "Submitting form...",
        success: (response) => {
          setFormData({
            youTubeVideoUrl: "",
            title: "",
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
        <Label htmlFor="title">Video Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter video title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="youTubeVideoUrl">YouTube Video URL</Label>
        <Input
          id="youTubeVideoUrl"
          name="youTubeVideoUrl"
          placeholder="Enter YouTube video URL"
          value={formData.youTubeVideoUrl}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
}
