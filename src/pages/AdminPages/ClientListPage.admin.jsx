import TableCs from "@/components/custom-component/Table/table-cs";
import { postHandler, putHandler } from "@/services/api.services";
import React, { useState } from "react";
import { toast } from "sonner";
const appointmentcolumns = [
  { header: "Patient Name", accessor: "patientName" },
  { header: "Contact", accessor: "contact" },
  { header: "Treatment Type", accessor: "treatmentType" },
  { header: "Appointment Date", accessor: "appointmentDate" },
  { header: "Doctor", accessor: "doctor" },
  { header: "Status", accessor: "status" },
];

const appointmentdata = [];
export default function ClientListPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    phone: "",
    firstName: "",
    LastName: "",
    age: "",
    gender: "",
    profession: "",
    residentialAddress: "",
    maritalStatus: "",
    medicalInformation: {
      medicalHistory: "",
      takingAnyMedicine: "",
      allergicToAnyMedicine: "",
      allergicToAnyOther: "",
      geneticHistoryForHairFall: "",
    },
    reference: "",
    purposeOfVisit: "",
    lookingFor: "",
    branchId: "",
    baldnessPattern: "",
    surgeryDetails: {
      diagnosis: "",
      noOfFolliclesRequired: "",
      dateOfSurgery: "",
      costOfSurgery: "",
      remarks: "",
      bookingAmount: "",
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    toast.promise(
      postHandler(`/patient/register`, newPatient, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "adding new patient... ",
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
  const handleUpdate = () => {
    setLoading(true);
    toast.promise(
      putHandler(`/patient/update/${selectedPatient._id}`, selectedPatient, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "Updating patient... ",
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
  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">Clients List</h1>
      <div className="md:max-w-[77vw]">
        <TableCs
          data={appointmentdata}
          columns={appointmentcolumns}
          rowsPerPage={10}
        />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className={"gap-2 !max-w-[40vw]"}>
          <SheetHeader>
            <SheetTitle>
              {selectedPatient ? "Update Patient" : "Add New Patient"}
            </SheetTitle>
            <SheetDescription className={"capitalize"}>
              {selectedPatient
                ? "Here you can update the patient's details that will appear on the website or in your records."
                : "Here you can add a new patient profile to your system. You can edit their details later after adding."}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-200px)] p-4 space-y-4">
            {/* form fields go here */}
          </ScrollArea>

          <SheetFooter className={"border-t shadow-2xl"}>
            <div className="flex justify-end gap-2">
              {selectedPatient ? (
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
