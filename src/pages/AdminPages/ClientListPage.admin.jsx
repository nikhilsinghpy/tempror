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

const appointmentdata = [];
export default function ClientListPageAdmin() {
  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">Clients List</h1>
      <TableCs
        data={appointmentdata}
        columns={appointmentcolumns}
        rowsPerPage={10}
      />
    </div>
  );
}
