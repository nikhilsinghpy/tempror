import React, { useEffect, useState } from "react";
import HeroSectionForm from "@/components/custom-component/forms/hero-section-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { deleteHandler, getHandler } from "@/services/api.services";
import HeroSectionNonAnimate from "@/components/custom-component/HeroSection/hero-section-nonAnimate";
import { MapPin, Trash2 } from "lucide-react";

export default function HeroSectionAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [heroSections, setHeroSections] = useState([]);

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this section?");
    if (!confirmed) return;
    toast.promise(deleteHandler(`/websiteSection/heroSection/delete/${id}`), {
      loading: "Deleting...",
      success: (response) => {
        fetchData();
        return response.message;
      },
      error: (error) => error.message || "Something went wrong!",
    });
  };
  const fetchData = async () => {
    try {
      const reponse = await getHandler("/websiteSection/get");
      setHeroSections(reponse.data.websiteSections.heroSection);
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
        <h1 className="text-2xl font-bold ">Hero Section </h1>
        <Button onClick={() => setIsOpen(true)}>Add New Hero Section</Button>
      </div>

      <div className="space-y-4">
        {heroSections?.map((item, index) => (
          <div key={index} className="relative border rounded-2xl">
            <HeroSectionNonAnimate
              heroImage={item?.image?.url?.secure_url}
              title={item?.title}
              intro={item?.description}
              CTA={item?.buttons}
              badge={{ icon: MapPin, text: item?.badge }}
              features={item?.features}
            />
            <Button
              variant={"destructive"}
              size={"icon"}
              className={"absolute -top-2 -right-2"}
              onClick={() => handleDelete(item._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className={"!max-w-full gap-2"}>
          <SheetHeader>
            <SheetTitle>Post Result of Patient Treatment</SheetTitle>
            <SheetDescription>
              Here you can post the result of patient treatment to the website
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-170px)] p-4 space-y-4">
            <HeroSectionForm setIsOpen={setIsOpen} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
