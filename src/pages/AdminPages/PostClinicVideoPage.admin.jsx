import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import YouTubeCard from "@/components/custom-component/card/youtube-video-card";
import ClinicVideoForm from "@/components/custom-component/forms/clnic-video-form";
import { deleteHandler, getHandler } from "@/services/api.services";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
export default function PostClinicVideoPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [clinicVideos, setClinicVideos] = useState([]);
  const fetchData = async () => {
    try {
      const reponse = await getHandler("/websiteSection/get");
      setClinicVideos(reponse.data.clinicVideo);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this videos?");
    if (!confirmed) return;
    toast.promise(deleteHandler(`/websiteSection/clinicVideo/delete/${id}`), {
      loading: "Deleting...",
      success: (response) => {
        fetchData();
        return response.message;
      },
      error: (error) => error.message || "Something went wrong!",
    });
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Post Result</h1>
        <Button onClick={() => setIsOpen(true)}>Post Result</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3  gap-2 ">
        {clinicVideos.map((_, index) => (
          <div className="relative">
            <YouTubeCard
              videoUrl={_.youTubeVideoUrl}
              title={_.title}
              key={index}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(_._id)}
              className={"absolute -top-2 -right-2"}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Post Clinic Video</SheetTitle>
            <SheetDescription>
              Here you can post clinic video that you want to show in website
            </SheetDescription>
          </SheetHeader>
          <ClinicVideoForm setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
