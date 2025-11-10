import AddPrpForm from "@/components/custom-component/forms/add-Prp-form";
import TableCs from "@/components/custom-component/Table/table-cs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getHandler } from "@/services/api.services";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
const appointmentcolumns = [
  { header: "Patient Name", accessor: "patientName" },
  { header: "Contact", accessor: "contact" },
  { header: "Treatment Type", accessor: "treatmentType" },
  { header: "Appointment Date", accessor: "appointmentDate" },
  { header: "Doctor", accessor: "doctor" },
  { header: "Status", accessor: "status" },
];

const appointmentdata = [
  {
    patientName: "Rahul Sharma",
    contact: "rahul.sharma@example.com",
    treatmentType: "PRP Therapy",
    appointmentDate: "2025-10-25",
    doctor: "Dr. Mehta",
    status: "Confirmed",
  },
  {
    patientName: "Amit Patel",
    contact: "amit.patel@example.com",
    treatmentType: "PRP Therapy",
    appointmentDate: "2025-10-27",
    doctor: "Dr. Singh",
    status: "Pending",
  },
  {
    patientName: "Priya Verma",
    contact: "priya.verma@example.com",
    treatmentType: "PRP Therapy",
    appointmentDate: "2025-10-29",
    doctor: "Dr. Kapoor",
    status: "Completed",
  },
  {
    patientName: "Rohit Yadav",
    contact: "rohit.yadav@example.com",
    treatmentType: "PRP Therapy",
    appointmentDate: "2025-10-30",
    doctor: "Dr. Mehta",
    status: "Confirmed",
  },
  {
    patientName: "Sneha Gupta",
    contact: "sneha.gupta@example.com",
    treatmentType: "PRP Therapy",
    appointmentDate: "2025-11-01",
    doctor: "Dr. Sharma",
    status: "Cancelled",
  },
  {
    patientName: "Vikas Jain",
    contact: "vikas.jain@example.com",
    treatmentType: "PRP Therapy",
    appointmentDate: "2025-11-02",
    doctor: "Dr. Singh",
    status: "Pending",
  },
  {
    patientName: "Vikas Jain",
    contact: "vikas.jain@example.com",
    treatmentType: "PRP Therapy",
    appointmentDate: "2025-11-02",
    doctor: "Dr. Singh",
    status: "Pending",
  },
  {
    patientName: "Vikas Jain",
    contact: "vikas.jain@example.com",
    treatmentType: "PRP Therapy",
    appointmentDate: "2025-11-02",
    doctor: "Dr. Singh",
    status: "Pending",
  },
];

export default function ClientPRPPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrp, setselectedPrp] = useState(null);
  const [PrpData, setPrpData] = useState({
    data: [],
    pagination: {},
  });
  const fetchData = async () => {
    try {
      const response = await getHandler("/prp/get");
      console.log(response.data);
      setPrpData({
        data: response.data,
        pagination: response.pagination,
      });
    } catch (error) {
      toast.error(error.messege || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-4 w-full space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Clients PRP List</h1>
        <Button onClick={() => setIsOpen(true)}>+ Add PRP Schedule</Button>
      </div>
      <TableCs
        data={appointmentdata}
        columns={appointmentcolumns}
        rowsPerPage={10}
      />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {selectedPrp ? "Update PRP Review" : "Add New PRP Review"}
            </SheetTitle>
            <SheetDescription className={"capitalize"}>
              {selectedPrp
                ? "Here you can update the PRP review details that will appear on the website."
                : "Here you can add a new PRP review to display on the website. You can edit the details later after adding."}
            </SheetDescription>
          </SheetHeader>
          <AddPrpForm fetchData={fetchData} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
