import React, { useState } from "react";
import ReviewCard from "@/components/custom-component/card/review-card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AddReviewForm from "@/components/custom-component/forms/add-review-form";
export default function ManageReviewAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 w-full space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Clients PRP List</h1>
        <Button onClick={() => setIsOpen(true)}>Post Result</Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 15 }).map((index) => (
          <ReviewCard key={index} />
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Post Review</SheetTitle>
            <SheetDescription>
              Here you can post review that you want to show in website
            </SheetDescription>
            <AddReviewForm />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
