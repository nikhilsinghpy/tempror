import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export default function PostResultForm() {
  const [formData, setFormData] = useState({
    title: "",
    treatment: "",
    image: null,
    patientPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build FormData for file upload
    const data = new FormData();
    data.append("title", formData.title);
    data.append("treatment", formData.treatment);
    data.append("image", formData.image);
    data.append("patientPhone", formData.patientPhone);

    console.log("Form data submitted:", formData);
    alert("Form submitted! (Check console for data)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter result title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="treatment">Treatment</Label>
        <Textarea
          id="treatment"
          name="treatment"
          placeholder="Enter treatment details"
          value={formData.treatment}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="patientPhone">Patient Phone</Label>
        <Input
          id="patientPhone"
          name="patientPhone"
          placeholder="Enter patient phone number"
          value={formData.patientPhone}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Upload Image</Label>
        <div className="flex items-center gap-2">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Upload className="text-gray-500" size={20} />
        </div>
        {formData.image && (
          <p className="text-sm text-green-600 mt-1">
            Selected: {formData.image.name}
          </p>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
