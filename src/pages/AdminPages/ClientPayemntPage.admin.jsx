import TableCs from "@/components/custom-component/Table/table-cs";
import React from "react";
const appointmentcolumns = [
  { header: "Patient Name", accessor: "patientName" },
  { header: "Contact", accessor: "contact" },
  { header: "Appointment Date", accessor: "appointmentDate" },
  { header: "Time Slot", accessor: "timeSlot" },
  { header: "Doctor", accessor: "doctor" },
  { header: "Payment Status", accessor: "paymentStatus" },
  { header: "Amount", accessor: "amount" },
];

const appointmentdata = [
  {
    patientName: "Rahul Sharma",
    contact: "rahul.sharma@example.com",
    appointmentDate: "2025-10-25",
    timeSlot: "10:00 AM - 11:00 AM",
    doctor: "Dr. Mehta",
    paymentStatus: "Paid",
    amount: "₹4,000",
  },
  {
    patientName: "Amit Patel",
    contact: "amit.patel@example.com",
    appointmentDate: "2025-10-27",
    timeSlot: "11:30 AM - 12:00 PM",
    doctor: "Dr. Singh",
    paymentStatus: "Pending",
    amount: "₹3,500",
  },
  {
    patientName: "Priya Verma",
    contact: "priya.verma@example.com",
    appointmentDate: "2025-10-29",
    timeSlot: "02:00 PM - 02:30 PM",
    doctor: "Dr. Kapoor",
    paymentStatus: "Paid",
    amount: "₹4,200",
  },
  {
    patientName: "Rohit Yadav",
    contact: "rohit.yadav@example.com",
    appointmentDate: "2025-10-30",
    timeSlot: "04:00 PM - 04:45 PM",
    doctor: "Dr. Mehta",
    paymentStatus: "Paid",
    amount: "₹3,800",
  },
  {
    patientName: "Sneha Gupta",
    contact: "sneha.gupta@example.com",
    appointmentDate: "2025-11-01",
    timeSlot: "10:30 AM - 11:15 AM",
    doctor: "Dr. Sharma",
    paymentStatus: "Refunded",
    amount: "₹4,000",
  },
  {
    patientName: "Vikas Jain",
    contact: "vikas.jain@example.com",
    appointmentDate: "2025-11-02",
    timeSlot: "03:00 PM - 03:30 PM",
    doctor: "Dr. Singh",
    paymentStatus: "Pending",
    amount: "₹3,500",
  },
];

export default function ClientPayemntPageAdmin() {
  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">Clients Payment & Shedule</h1>
      <TableCs
        data={appointmentdata}
        columns={appointmentcolumns}
        rowsPerPage={10}
      />
    </div>
  );
}
