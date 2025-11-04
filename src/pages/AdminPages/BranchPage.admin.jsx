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
// const convertToFormData = (branchData) => {
//   console.log("Branch Data:", branchData);
//   const formData = new FormData();
//   // ✅ Basic text fields
//   formData.append("badge", branchData.badge || "");
//   formData.append("title", branchData.title || "");
//   formData.append("description", branchData.description || "");
//   formData.append("openingHours", branchData.openingHours || "");
//   // ✅ Buttons
//   branchData.buttons.forEach((btn, index) => {
//     formData.append(`buttons[${index}][label]`, btn.label || "");
//     formData.append(`buttons[${index}][type]`, btn.type || "");
//     formData.append(`buttons[${index}][link]`, btn.link || "");
//     formData.append(`buttons[${index}][icon]`, btn.icon || "");
//   });
//   // ✅ Features
//   branchData.features.forEach((f, index) => {
//     formData.append(`features[${index}][icon]`, f.icon || "");
//     formData.append(`features[${index}][text]`, f.text || "");
//   });
//   // ✅ Contact
//   Object.entries(branchData.contact).forEach(([key, value]) => {
//     formData.append(`contact[${key}]`, value || "");
//   });
//   // ✅ Clinic Videos
//   branchData.clinicVideo.forEach((video, index) => {
//     formData.append(
//       `clinicVideo[${index}][youTubeVideoUrl]`,
//       video.youTubeVideoUrl || ""
//     );
//     formData.append(`clinicVideo[${index}][title]`, video.title || "");
//     formData.append(
//       `clinicVideo[${index}][image][alt]`,
//       video.image?.alt || ""
//     );
//   });
//   // ✅ Why Choose Us
//   formData.append("whyChooseUs[title]", branchData.whyChooseUs.title || "");
//   formData.append(
//     "whyChooseUs[description]",
//     branchData.whyChooseUs.description || ""
//   );
//   branchData.whyChooseUs.features.forEach((f, index) => {
//     formData.append(`whyChooseUs[features][${index}][title]`, f.title || "");
//     formData.append(
//       `whyChooseUs[features][${index}][description]`,
//       f.description || ""
//     );
//     formData.append(`whyChooseUs[features][${index}][icon]`, f.icon || "");
//   });
//   // ✅ SEO Fields
//   formData.append("seo[metaTitle]", branchData.seo.metaTitle || "");
//   formData.append("seo[metaDescription]", branchData.seo.metaDescription || "");
//   formData.append("seo[canonicalUrl]", branchData.seo.canonicalUrl || "");
//   branchData.seo.metaKeywords.forEach((keyword, i) =>
//     formData.append(`seo[metaKeywords][${i}]`, keyword)
//   );
//   formData.append("seo[ogImage][alt]", branchData.seo.ogImage?.alt || "");
//   formData.append(
//     "seo[structuredData]",
//     JSON.stringify(branchData.seo.structuredData || {})
//   );
//   // ✅ File uploads (must match multer field names)
//   if (branchData.image) formData.append("image", branchData.image);
//   if (branchData.ogImage) formData.append("ogImage", branchData.ogImage);
//   if (branchData.whyChooseUsImage)
//     formData.append("whyChooseUsImage", branchData.whyChooseUsImage);

//   return formData;
// };
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
    try {
      setLoading(true);
      // Send via postHandler
      const response = await postHandler("/branch/create", branchData, {
        "Content-Type": "multipart/form-data",
      });
      toast.dismiss();
      setIsOpen(false);
      setLoading(false);
      toast.success(response.message);
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await putHandler(
        `/branch/update/${branchData._id}`,
        branchData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      toast.dismiss();
      setIsOpen(false);
      setLoading(false);
      toast.success(response.message);
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
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
