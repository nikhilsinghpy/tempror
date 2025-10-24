import StatusCard from "@/components/custom-component/card/status-card";
import { ChartPieSimple } from "@/components/custom-component/Chart/pie-chart";
import TableCs from "@/components/custom-component/Table/table-cs";
import { Calendar, CheckCircle, MapPin, Users } from "lucide-react";
import React from "react";

const stats = [
  {
    title: "Total enquiries",
    value: "8,450",
    change: "5.2%",
    isPositive: true,
    icon: Users,
  },
  {
    title: "Total appointments booked",
    value: "3,120",
    change: "4.8%",
    isPositive: true,
    icon: Calendar,
  },
  {
    title: "Total treatments completed",
    value: "1,742",
    change: "3.1%",
    isPositive: true,
    icon: CheckCircle,
  },
  {
    title: "Clinic branches",
    value: "2",
    change: "0%",
    isPositive: true,
    icon: MapPin,
  },
];
const chartData = [
  { metric: "enquiries", value: 8450, fill: "var(--color-enquiries)" },
  { metric: "appointments", value: 3120, fill: "var(--color-appointments)" },
  { metric: "treatments", value: 1742, fill: "var(--color-treatments)" },
];
const chartConfig = {
  value: {
    label: "Count",
  },
  enquiries: {
    label: "Total Enquiries",
    color: "var(--chart-1)",
  },
  appointments: {
    label: "Total Appointments Booked",
    color: "var(--chart-2)",
  },
  treatments: {
    label: "Total Treatments Completed",
    color: "var(--chart-3)",
  },
};
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
    treatmentType: "FUE Hair Transplant",
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
    treatmentType: "FUT Hair Transplant",
    appointmentDate: "2025-10-29",
    doctor: "Dr. Kapoor",
    status: "Completed",
  },
  {
    patientName: "Rohit Yadav",
    contact: "rohit.yadav@example.com",
    treatmentType: "Beard Transplant",
    appointmentDate: "2025-10-30",
    doctor: "Dr. Mehta",
    status: "Confirmed",
  },
  {
    patientName: "Sneha Gupta",
    contact: "sneha.gupta@example.com",
    treatmentType: "Hairline Restoration",
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
const filters = [
  {
    key: "treatmentType",
    label: "Treatment Type",
    values: [
      "Hair Transplant",
      "Beard Transplant",
      "Eyebrow Transplant",
      "PRP Therapy",
      "Hair Restoration",
    ],
  },
  {
    key: "doctor",
    label: "Doctor / Specialist",
    values: ["Dr. A. Mehta", "Dr. R. Singh", "Dr. K. Patel"],
  },
  {
    key: "graftCount",
    label: "Graft Count",
    values: [
      "Up to 1000 Grafts",
      "1000 - 2000 Grafts",
      "2000 - 3000 Grafts",
      "3000+ Grafts",
    ],
  },
  {
    key: "appointmentDate",
    label: "Appointment Date",
    values: ["Today", "Tomorrow", "This Week", "Next Week"],
  },
  {
    key: "timeSlot",
    label: "Preferred Time Slot",
    values: [
      "Morning (9 AM - 12 PM)",
      "Afternoon (12 PM - 4 PM)",
      "Evening (4 PM - 8 PM)",
    ],
  },
  {
    key: "paymentStatus",
    label: "Payment Status",
    values: ["Paid", "Pending", "Cancelled"],
  },
  {
    key: "appointmentStatus",
    label: "Appointment Status",
    values: ["Confirmed", "Completed", "Cancelled", "Rescheduled"],
  },
];

export default function AdminHomePage() {
  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">Admin Home Page</h1>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <StatusCard key={index} item={item} />
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/2">
          <ChartPieSimple
            chartData={chartData}
            chartConfig={chartConfig}
            dataKey="value"
            nameKey="metric"
            title="Total Enquiries, Appointments, Treatments"
            description="Showing the calculated values for the last months"
            footerTitle="Treatment Booking is Increased by 5%"
            footerDesc="Showing the calculated values for the last months"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-lg font-bold mb-2 ">Upcoming Appointments</h1>
          <TableCs
            data={appointmentdata}
            columns={appointmentcolumns}
            rowsPerPage={6}
            filters={filters}
          />
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-lg font-bold mb-2">Recent Queries</h1>
        <TableCs
          data={appointmentdata}
          columns={appointmentcolumns}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
}
