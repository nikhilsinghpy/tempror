import TableCs from "@/components/custom-component/Table/table-cs";
import React from "react";
import { useSearchParams } from "react-router-dom";

const contactColumns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Subject", accessor: "subject" },
  { header: "Message", accessor: "message" },
  { header: "Date", accessor: "date" },
  { header: "Status", accessor: "status" },
];
const contactData = [
  {
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    phone: "+91 98765 43210",
    subject: "Appointment Inquiry",
    message:
      "I would like to know the available time slots for Dr. Mehta next week.",
    date: "2025-10-22",
    status: "Replied",
  },
  {
    name: "Neha Sharma",
    email: "neha.sharma@example.com",
    phone: "+91 91234 56789",
    subject: "Billing Issue",
    message: "I was charged twice for my last consultation. Please check.",
    date: "2025-10-23",
    status: "Pending",
  },
  {
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 99876 54321",
    subject: "General Query",
    message: "Do you provide online consultations for dermatology?",
    date: "2025-10-21",
    status: "Replied",
  },
  {
    name: "Priya Verma",
    email: "priya.verma@example.com",
    phone: "+91 90909 80808",
    subject: "Feedback",
    message: "The booking experience was smooth. Keep up the good work!",
    date: "2025-10-19",
    status: "Closed",
  },
  {
    name: "Rohit Yadav",
    email: "rohit.yadav@example.com",
    phone: "+91 93456 78901",
    subject: "Doctor Availability",
    message: "Is Dr. Sharma available for appointments on weekends?",
    date: "2025-10-20",
    status: "Pending",
  },
  {
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    phone: "+91 97654 32109",
    subject: "Technical Issue",
    message: "I am unable to submit my form on your website. Kindly assist.",
    date: "2025-10-18",
    status: "Resolved",
  },
];

export default function QueryListAdmin() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">
        {date ? `Today's Appointment` : `Appointments`}
      </h1>
      <TableCs data={contactData} columns={contactColumns} rowsPerPage={10} />
    </div>
  );
}
