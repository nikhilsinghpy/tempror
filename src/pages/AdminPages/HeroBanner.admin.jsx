import HeroBannerForm from "@/components/custom-component/forms/hero-banner-form";
import HeroBanner from "@/components/custom-component/HeroSection/hero-banner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { deleteHandler, getHandler } from "@/services/api.services";
import { Trash } from "lucide-react";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HeroBannerAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [heroBanners, setHeroBanners] = useState([]);

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this banner?");
    if (!confirmed) return;
    toast.promise(
      deleteHandler(`/websiteSection/herobanner/delete/${id}`, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "Deleting...",
        success: (response) => {
          fetchData();
          return response.message;
        },
        error: (error) => error.message || "Something went wrong!",
      }
    );
  };
  const fetchData = async () => {
    try {
      const reponse = await getHandler("/websiteSection/get");
      setHeroBanners(reponse.data.websiteSections.heroBanner);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-4 w-full ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Hero Banner</h1>
        <Button onClick={() => setIsOpen(true)}>Add Banner</Button>
      </div>
      {heroBanners?.map((_, index) => (
        <div className="mt-4 relative">
          <HeroBanner key={index} item={_} />
          <Button
            className="absolute -top-2 -right-2"
            size={"icon"}
            variant={"destructive"}
            onClick={() => handleDelete(_._id)}
          >
            <Trash />
          </Button>
        </div>
      ))}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Post Result of Patient Treatment</SheetTitle>
            <SheetDescription>
              Here you can post the result of patient treatment to the website
            </SheetDescription>
          </SheetHeader>
          <HeroBannerForm setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
