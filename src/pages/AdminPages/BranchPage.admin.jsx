import React, { useState } from "react";
import BranchCard from "@/components/custom-component/card/branch-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import HeroSectionForm from "@/components/custom-component/forms/hero-section-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CrouselCs } from "@/components/custom-component/crouselcs/crousel-cs";
import { CarouselItem } from "@/components/ui/carousel";
import DoctorCard from "@/components/custom-component/card/doctor-card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
export default function BranchPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "Why Choose Us",
    image: null,
    description:
      "We provide expert care with modern facilities and a compassionate team, ensuring personalized treatment for every patient.",
    features: [
      {
        heading: "Primary Care",
        text: "Far far away, behind the word mountains, far from the countries Vokalia.",
      },
      {
        heading: "Lab Test",
        text: "Far far away, behind the word mountains, far from the countries Vokalia.",
      },
      {
        heading: "Symptom Check",
        text: "Far far away, behind the word mountains, far from the countries Vokalia.",
      },
      {
        heading: "Heart Rate",
        text: "Far far away, behind the word mountains, far from the countries Vokalia.",
      },
    ],
  });

  const handleFeatureChange = (index, key, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][key] = value;
    setFormData({ ...formData, features: newFeatures });
  };
  const handleImageChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Content:", formData);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = (branch) => {
    console.log(branch);
  };
  return (
    <div className="p-4 w-full ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-4">Branch </h1>
        <Button onClick={() => setIsOpen(true)}>+ Add New Branch</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <BranchCard key={index} onClick={handleClick} />
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className={"!max-w-full gap-2"}>
          <SheetHeader>
            <SheetTitle>Add A New Branch Here</SheetTitle>
            <SheetDescription className={"capitalize"}>
              Here you can add a new branch that you want to show in website. It
              can be Edit after adding
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-170px)] p-4 space-y-4 ">
            <div className="space-y-4">
              <p className="text-xl font-semibold  border-b">Hero section</p>
              <HeroSectionForm />
            </div>
            <div className="space-y-4">
              <span>
                <p className="text-xl font-semibold">Branch Doctor</p>
                <p className="text-[12px]  border-b">
                  Doctor Can be Edit Add Update from Doctor page
                </p>
              </span>
              <CrouselCs autoPlayEnabled={true}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="lg:basis-1/2 py-4">
                    <DoctorCard
                      name="Dr. Ananya Sharma"
                      specialty="Cardiologist"
                      hospital="City Heart Institute"
                      rating={4.9}
                      reviewsCount={342}
                      experienceYears={12}
                      location="Rohini, Delhi"
                      avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRripLcqGUKIBfgbtmux6U1UY9UkgezqzJzFw&s"
                      bio={`Dr. Ananya Sharma is a senior cardiologist with 12+ years of experience in interventional cardiology. She focuses on patient-centred care and minimally invasive procedures.`}
                      onClick={() => {
                        window.location.href = "/book-appointment";
                      }}
                    />
                  </CarouselItem>
                ))}
              </CrouselCs>
            </div>
            <div className="space-y-4">
              <p className="text-xl font-semibold  border-b">Why Choose Us</p>
              <div className="space-y-2">
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="space-y-2 border p-4 rounded-lg bg-gray-50"
                  >
                    <Label>Feature {index + 1} Title</Label>
                    <Input
                      value={feature.heading}
                      onChange={(e) =>
                        handleFeatureChange(index, "heading", e.target.value)
                      }
                    />
                    <Label>Description</Label>
                    <Textarea
                      rows={2}
                      value={feature.text}
                      onChange={(e) =>
                        handleFeatureChange(index, "text", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xl font-semibold  border-b">
                Contact Information
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="map">Map / Address</Label>
                  <Textarea
                    id="map"
                    rows={3}
                    placeholder="Enter your address or Google Maps link"
                    value={formData.map}
                    onChange={(e) =>
                      setFormData({ ...formData, map: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className={"border-t shadow-2xl"}>
            <div className="flex justify-end gap-2">
              <Button type="submit">Update Hero Section</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
