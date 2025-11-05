import React, { useEffect, useState } from "react";
import PostResultForm from "@/components/custom-component/forms/post-result-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { deleteHandler, getHandler } from "@/services/api.services";
import { toast } from "sonner";
import ResultCard from "@/components/custom-component/card/result-card";
import { Trash2 } from "lucide-react";
export default function PostResultAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [surgeryResults, setSurgeryResults] = useState([]);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const fetchData = async () => {
    try {
      const reponse = await getHandler("/surgeryResult/get");
      setSurgeryResults(reponse.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  const handleDelete = (id) => {
    toast.promise(deleteHandler(`/surgeryResult/delete/${id}`), {
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
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Post Result</h1>
        <Button onClick={handleOpen}>Post Result</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 ">
        {surgeryResults.map((item, index) => (
          <div>
            <ResultCard data={item} key={index} />
            <Button
              onClick={() => handleDelete(item._id)}
              className={"w-full mt-3"}
              variant={"destructive"}
            >
              <Trash2 /> Delete
            </Button>
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
          <PostResultForm setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
