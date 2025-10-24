import React, { useState } from "react";
// adjust path according to your project
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PostClinicVideo() {
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can add your API call here to save the video info
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="title">Video Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter video title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoUrl">YouTube Video URL</Label>
        <Input
          id="videoUrl"
          name="videoUrl"
          placeholder="Enter YouTube video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Post Video
      </Button>
    </form>
  );
}
