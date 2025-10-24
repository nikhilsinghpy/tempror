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
export default function PostResultAdmin() {
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
          <div
            className="p-2 border cursor-pointer rounded-md shadow-md "
            key={index}
            onClick={handleOpen}
          >
            <img
              src="https://facesurgeon.in/wp-content/uploads/2020/03/hair-transplantation-in-india.jpg"
              alt="demo"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Post Result of Patient Treatment</SheetTitle>
            <SheetDescription>
              Here you can post the result of patient treatment to the website
            </SheetDescription>
          </SheetHeader>
          <PostResultForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}
