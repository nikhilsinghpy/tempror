import React, { useEffect, useState } from "react";
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
import { deleteHandler, getHandler } from "@/services/api.services";
import { toast } from "sonner";
export default function ManageReviewAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const fetchData = async () => {
    try {
      const reponse = await getHandler("/review/get");
      setReviews(reponse.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this review?");
    if (!confirmed) return; 
    toast.promise(deleteHandler(`/review/delete/${id}`), {
      loading: "Deleting...",
      success: (response) => {
        fetchData();
        return response.message;
      },
      error: (error) => error.message || "Something went wrong!",
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-4 w-full space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Clients PRP List</h1>
        <Button onClick={() => setIsOpen(true)}>Post Result</Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {reviews?.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => {
                setSelectedReview(item);
                setIsOpen(true);
              }}
              className="cursor-pointer"
            >
              <ReviewCard review={item} />
            </div>
            <Button
              onClick={() => handleDelete(item._id)}
              variant="destructive"
              className="mt-2 w-full"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {selectedReview ? "Update Review" : "Add New Review"}
            </SheetTitle>
            <SheetDescription className={"capitalize"}>
              {selectedReview
                ? "Here you can update the review details that will appear on the website."
                : "Here you can add a new review to display on the website. You can edit the details later after adding."}
            </SheetDescription>
          </SheetHeader>
          <AddReviewForm fetchData={fetchData} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
