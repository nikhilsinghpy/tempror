import TableCs from "@/components/custom-component/Table/table-cs";
import React from "react";
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
  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">Clients PRP List</h1>
      <TableCs
        data={appointmentdata}
        columns={appointmentcolumns}
        rowsPerPage={10}
      />
    </div>
  );
}
