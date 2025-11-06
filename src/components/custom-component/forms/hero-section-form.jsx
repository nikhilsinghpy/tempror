import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SheetClose } from "@/components/ui/sheet";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";

export default function HeroSectionForm({ setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    description: "",
    buttons: [{ label: "", type: "", link: "", icon: "" }],
    features: [{ icon: "", text: "" }],
    image: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const addButton = () => {
    setFormData((prev) => ({
      ...prev,
      buttons: [...prev.buttons, { label: "", type: "", link: "", icon: "" }],
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { icon: "", text: "" }],
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.promise(
      postHandler("/websiteSection/herosection/create", formData, {
        "Content-Type": "multipart/form-data",
      }),
      {
        loading: "Submitting form...",
        success: (response) => {
          setFormData({
            badge: "",
            title: "",
            description: "",
            buttons: [{ label: "", type: "", link: "", icon: "" }],
            features: [{ icon: "", text: "" }],
            image: null,
          });
          setIsOpen(false);
          setLoading(false);
          return response.message;
        },
        error: (error) => {
          setLoading(false);
          return error.message || "Something went wrong!";
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="gap-4 px-2 grid grid-cols-2">
      <div className="space-y-2">
        <Label>Badge</Label>
        <Input
          value={formData.badge}
          onChange={(e) => handleInputChange("badge", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Image</Label>
        <Input type="file" onChange={handleImageChange} />
        {formData.image && <p>Selected: {formData.image.name}</p>}
      </div>

      <div className="space-y-2">
        <Label>Buttons</Label>
        {formData.buttons.map((btn, index) => (
          <div key={index} className="space-y-2 border p-2 rounded relative">
            <Input
              placeholder="Label"
              value={btn.label}
              onChange={(e) =>
                handleButtonChange(index, "label", e.target.value)
              }
            />
            <Select
              onValueChange={(value) =>
                handleButtonChange(index, "type", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Link"
              value={btn.link}
              onChange={(e) =>
                handleButtonChange(index, "link", e.target.value)
              }
            />
            <Input
              placeholder="Icon"
              value={btn.icon}
              onChange={(e) =>
                handleButtonChange(index, "icon", e.target.value)
              }
            />

            {index > 0 && (
              <Button
                type="button"
                variant={"destructive"}
                size={"icon"}
                className="absolute -top-2 -right-2"
                onClick={() => {
                  const updatedButtons = [...formData.buttons];
                  updatedButtons.splice(index, 1);
                  setFormData((prev) => ({
                    ...prev,
                    buttons: updatedButtons,
                  }));
                }}
              >
                <Trash2 />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={addButton}>
          Add Button
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Features</Label>
        {formData.features.map((feature, index) => (
          <div key={index} className="space-y-2 border p-2 rounded relative">
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

            {index > 0 && (
              <Button
                type="button"
                variant={"destructive"}
                size={"icon"}
                className="absolute -top-2 -right-2"
                onClick={() => {
                  const updatedFeatures = [...formData.features];
                  updatedFeatures.splice(index, 1);
                  setFormData((prev) => ({
                    ...prev,
                    features: updatedFeatures,
                  }));
                }}
              >
                <Trash2 />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={addFeature}>
          Add Feature
        </Button>
      </div>

      <div className="flex gap-2 col-span-2 justify-end items-center">
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
        <SheetClose asChild>
          <Button variant={"outline"}>Close</Button>
        </SheetClose>
      </div>
    </form>
  );
}
