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

const appointmentdata = [];

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
