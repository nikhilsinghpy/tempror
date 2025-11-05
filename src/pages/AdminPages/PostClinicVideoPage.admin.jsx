import React, { useState } from "react";
import PostResultForm from "@/components/custom-component/forms/post-result-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import PostClinicVideo from "@/components/custom-component/forms/post-clinic-video";
import YouTubeCard from "@/components/custom-component/card/youtube-video-card";
export default function PostClinicVideoPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Post Result</h1>
        <Button onClick={handleOpen}>Post Result</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <YouTubeCard
            videoUrl={`https://www.youtube.com/watch?v=8RkkhinL8cM`}
            key={index}
          />
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Post Clinic Video</SheetTitle>
            <SheetDescription>
              Here you can post clinic video that you want to show in website
            </SheetDescription>
          </SheetHeader>
          <PostClinicVideo />
        </SheetContent>
      </Sheet>
    </div>
  );
}
