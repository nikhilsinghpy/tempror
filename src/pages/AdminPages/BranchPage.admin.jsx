import React, { useEffect, useState } from "react";
import BranchCard from "@/components/custom-component/card/branch-card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import BranchForm from "@/components/custom-component/forms/branch-form";
import { getHandler, postHandler, putHandler } from "@/services/api.services";
import { toast } from "sonner";

export default function BranchPageAdmin() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branchData, setBranchData] = useState({
    badge: "",
    title: "",
    description: "",
    buttons: [
      {
        label: "",
        type: "",
        link: "",
        icon: "",
      },
    ],
    features: [
      {
        icon: "",
        text: "",
      },
    ],
    openingHours: "Monday to Sunday, 9:00 AM - 8:00 PM",
    contact: {
      phone: "",
      email: "",
      address: "",
      mapUrl: "",
    },
    clinicVideo: [
      {
        youTubeVideoUrl: "",
        title: "",
      },
    ],
    whyChooseUs: {
      title: "",
      description: "",

      features: [
        {
          title: "",
          description: "",
          icon: "",
        },
      ],
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [],
      canonicalUrl: "",
      ogImage: {
        alt: "",
      },
      structuredData: {},
    },

    image: null,
    ogImage: null,
    whyChooseUsImage: null,
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = (branch) => {
    setBranchData(branch);
    setUpdating(true);
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await toast.promise(
      postHandler("/branch/create", branchData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "Creating branch... ",
        success: (response) => {
          setIsOpen(false);
          setLoading(false);
          return response.message;
        },
        error: (error) => {
          setLoading(false);
          return error.message || "Something went wrong!";
        },
      }
    );
  };

  const handleUpdate = async () => {
    setLoading(true);
    await toast.promise(
      putHandler(`/branch/update/${branchData._id}`, branchData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "Updating branch... ",
        success: (response) => {
          setIsOpen(false);
          setLoading(false);
          return response.message;
        },
        error: (error) => {
          setLoading(false);
          return error.message || "Something went wrong!";
        },
      }
    );
  };

  const fetchBranches = async () => {
    try {
      const response = await getHandler("/branch/get");
      setBranches(response.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);
  return (
    <div className="p-4 w-full ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-4">Branch </h1>
        <Button onClick={() => setIsOpen(true)}>+ Add New Branch</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {branches.map((_, index) => (
          <BranchCard key={index} onClick={handleClick} branch={_} />
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className={"!max-w-full gap-2"}>
          <SheetHeader>
            <SheetTitle>
              {isUpdating ? "Update Branch" : "Add New Branch"}
            </SheetTitle>
            <SheetDescription className={"capitalize"}>
              {isUpdating
                ? " Here you can update a branch that you want to show in website. "
                : " Here you can add a new branch that you want to show in website. This can be Edit after adding"}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-170px)] p-4 space-y-4">
            <BranchForm branchData={branchData} setBranchData={setBranchData} />
          </ScrollArea>

          <SheetFooter className={"border-t shadow-2xl"}>
            <div className="flex justify-end gap-2">
              {isUpdating ? (
                <Button onClick={handleUpdate} disabled={loading}>
                  Update
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  Submit
                </Button>
              )}
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
