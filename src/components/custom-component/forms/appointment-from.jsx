import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";

export default function AppointmentForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      first: "",
      last: "",
    },
    phone: "",
    email: "",
    city: "",
    state: "",
    message: "",
    lookingFor: "",
    date: "",
    time: "",
  });

  // handleChange function (works for nested and normal fields)
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "firstName" || id === "lastName") {
      setFormData((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          [id === "firstName" ? "first" : "last"]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSelectChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.promise(postHandler("/appointment/create", formData), {
      loading: "Submitting form...",
      success: (response) => {
        setFormData({
          name: {
            first: "",
            last: "",
          },
          phone: "",
          email: "",
          city: "",
          state: "",
          message: "",
          lookingFor: "",
          date: "",
          time: "",
        });
        setLoading(false);
        return response.message;
      },
      error: (error) => error.message || "Something went wrong!",
    });
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-2xl shadow-md"
    >
      {/* Name Fields */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={formData.name.first}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={formData.name.last}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="Enter your state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Appointment Date & Time */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Select Service */}
      <div className="space-y-2">
        <Label htmlFor="lookingFor">Looking For</Label>
        <Select
          onValueChange={(value) => handleSelectChange("lookingFor", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                formData.lookingFor ? formData.lookingFor : "Select a service"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hair-transplant">Hair Transplant</SelectItem>
            <SelectItem value="beard-transplant">Beard Transplant</SelectItem>
            <SelectItem value="eyebrow-transplant">
              Eyebrow Transplant
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex items-center justify-center">
        <Button type="submit" disabled={loading}>
          Submit Appointment
        </Button>
      </div>
    </form>
  );
}
