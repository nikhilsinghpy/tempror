import TableCs from "@/components/custom-component/Table/table-cs";
import React from "react";

export default function AdminHomePage() {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
  ];

  const data = [
    { name: "Paras", email: "paras@example.com", role: "Admin" },
    { name: "Amit", email: "amit@example.com", role: "User" },
    { name: "Rohit", email: "rohit@example.com", role: "Moderator" },
    { name: "Sita", email: "sita@example.com", role: "User" },
    { name: "Vikram", email: "vikram@example.com", role: "User" },
    { name: "Maya", email: "maya@example.com", role: "Admin" },
  ];
  return <TableCs data={data} columns={columns} rowsPerPage={3} />;
}
