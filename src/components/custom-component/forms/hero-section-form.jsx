import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash } from "lucide-react";

export default function HeroSectionForm() {
  const [formData, setFormData] = useState({
    section: "",
    title: "",
    description: "",
    buttons: [{ label: "", type: "", link: "", icon: "" }],
    features: [{ icon: "", text: "" }],
    image: { url: "", alt: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonChange = (index, field, value) => {
    const updatedButtons = [...formData.buttons];
    updatedButtons[index][field] = value;
    setFormData((prev) => ({ ...prev, buttons: updatedButtons }));
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index][field] = value;
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleImageChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      image: { ...prev.image, [field]: value },
    }));
  };

  const addButton = () => {
    setFormData((prev) => ({
      ...prev,
      buttons: [...prev.buttons, { label: "", type: "", link: "", icon: "" }],
    }));
  };

  const removeButton = (index) => {
    const updatedButtons = formData.buttons.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, buttons: updatedButtons }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { icon: "", text: "" }],
    }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form JSON:", JSON.stringify(formData, null, 2));
    alert("Check console for generated JSON data!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Section</Label>
        <Input
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Beard Transplant"
        />
      </div>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Achieve a Fuller Beard with Precision"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the treatment..."
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className="text-lg font-semibold">Buttons</Label>
        {formData.buttons.map((button, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-2"
          >
            <Input
              placeholder="Label"
              value={button.label}
              onChange={(e) =>
                handleButtonChange(index, "label", e.target.value)
              }
            />
            <Input
              placeholder="Type (primary/secondary)"
              value={button.type}
              onChange={(e) =>
                handleButtonChange(index, "type", e.target.value)
              }
            />
            <Input
              placeholder="Link"
              value={button.link}
              onChange={(e) =>
                handleButtonChange(index, "link", e.target.value)
              }
            />
            <Input
              placeholder="Icon"
              value={button.icon}
              onChange={(e) =>
                handleButtonChange(index, "icon", e.target.value)
              }
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeButton(index)}
            >
              <Trash size={16} />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addButton}
          className="mt-2"
          variant="outline"
        >
          <Plus size={16} className="mr-1" /> Add Button
        </Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className="text-lg font-semibold">Features</Label>
        {formData.features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-2"
          >
            <Input
              placeholder="Icon"
              value={feature.icon}
              onChange={(e) =>
                handleFeatureChange(index, "icon", e.target.value)
              }
            />
            <Input
              placeholder="Text"
              value={feature.text}
              onChange={(e) =>
                handleFeatureChange(index, "text", e.target.value)
              }
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeFeature(index)}
            >
              <Trash size={16} />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addFeature}
          className="mt-2"
          variant="outline"
        >
          <Plus size={16} className="mr-1" /> Add Feature
        </Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className="text-lg font-semibold">Image</Label>
        <Input
          placeholder="Image URL"
          value={formData.image.url}
          onChange={(e) => handleImageChange("url", e.target.value)}
        />
        <Input
          placeholder="Alt Text"
          className="mt-2"
          value={formData.image.alt}
          onChange={(e) => handleImageChange("alt", e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Update Hero Section</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </form>
  );
}
