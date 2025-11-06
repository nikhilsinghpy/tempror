import DoctorCard from "@/components/custom-component/card/doctor-card";
import DoctorForm from "@/components/custom-component/forms/doctor-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getHandler, postHandler, putHandler } from "@/services/api.services";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DoctorPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    experience: "",
    bio: "",
    rating: "",
    education: [
      {
        college: "",
        degree: "",
        specialization: "",
        year: "",
        location: "",
        cgpa: "",
      },
    ],
    branchId: "",
    email: "",
    phone: "",
    profile: null,
  });

  const handleClose = () => {
    setIsOpen(false);
    setSelectedDoctor(null);
  };
  const handleSubmit = async () => {
    setLoading(true);
    toast.promise(
      postHandler("/doctor/add", formData, {
        "Content-Type": "multipart/form-data",
      }),
      {
        loading: "Submitting form...",
        success: (response) => {
          setLoading(false);
          fetchData();
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
    toast.promise(
      putHandler(`/doctor/update/${selectedDoctor._id}`, selectedDoctor, {
        "Content-Type": "multipart/form-data",
      }),
      {
        loading: "Submitting form...",
        success: (response) => {
          setLoading(false);
          fetchData();
          return response.message;
        },
        error: (error) => {
          setLoading(false);
          return error.message || "Something went wrong!";
        },
      }
    );
  };
  const fetchData = async () => {
    try {
      const reponse = await getHandler("/doctor/get");
      setData(reponse.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Manage Doctors</h1>
        <Button onClick={() => setIsOpen(true)}>+ Add Doctor</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((doctor, index) => (
          <DoctorCard
            key={index}
            name={doctor?.name}
            specialty={doctor?.speciality}
            hospital={doctor?.branch?.title}
            rating={doctor?.rating}
            reviewsCount={doctor?.totalReviews}
            experienceYears={doctor?.experience}
            location={doctor?.branch?.contact?.address}
            avatarUrl={doctor?.profile?.secure_url}
            bio={doctor?.bio}
            onBook={() => console.log("Booked appointment with Dr. Ananya")}
            onClick={() => {
              setSelectedDoctor(doctor);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className={"gap-2 !max-w-[40vw]"}>
          <SheetHeader>
            <SheetTitle>
              {selectedDoctor ? "Update Doctor" : "Add New Doctor"}
            </SheetTitle>
            <SheetDescription className={"capitalize"}>
              {selectedDoctor
                ? "Here you can update the doctor's details that will appear on the website."
                : "Here you can add a new doctor profile to display on the website. You can edit the details later after adding."}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-200px)] p-4 space-y-4">
            {selectedDoctor ? (
              <DoctorForm
                newDoctorData={selectedDoctor}
                setNewDoctorData={setSelectedDoctor}
              />
            ) : (
              <DoctorForm
                newDoctorData={formData}
                setNewDoctorData={setFormData}
              />
            )}
          </ScrollArea>

          <SheetFooter className={"border-t shadow-2xl"}>
            <div className="flex justify-end gap-2">
              {selectedDoctor ? (
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
