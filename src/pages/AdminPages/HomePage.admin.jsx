import StatusCard from "@/components/custom-component/card/status-card";
import { ChartPieSimple } from "@/components/custom-component/Chart/pie-chart";
import TableCs from "@/components/custom-component/Table/table-cs";
import { getHandler } from "@/services/api.services";
import { Calendar, CheckCircle, MapPin, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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
  { header: "First Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  { header: "Phone", accessor: "phone" },
  { header: "Phone Verified", accessor: "isPhoneVerified" },
  { header: "Email", accessor: "email" },
  { header: "City", accessor: "city" },
  { header: "State", accessor: "state" },
  { header: "Message", accessor: "message" },
  { header: "Looking For", accessor: "lookingFor" },
  { header: "Date", accessor: "date" },
  { header: "Time", accessor: "time" },
  { header: "Status", accessor: "status" },
];
const queryColumns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Looking For", accessor: "lookingFor" },
  { header: "Branch", accessor: "branch" },
  { header: "Message", accessor: "message" },
  { header: "Created At", accessor: "createdAt" },
  { header: "Status", accessor: "status" },
];

export default function AdminHomePage() {
  const [stats, setStats] = useState({});
  const [graphData, setGraphData] = useState({});
  const [appointment, setAppointment] = useState([]);
  const [querys, setQuerys] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getHandler("/admindashboarddata/get", {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });
      setStats(response.data.statusCardData);
      setGraphData(response.data.graphData);
      const formatedapp = response?.data?.upcommmingAppointment?.map(
        (item) => ({
          ...item,
          firstName: item.name.first,
          lastName: item.name.last,
          isPhoneVerified: item.isPhoneVerified ? "Yes" : "No",
          date: new Date(item.date).toLocaleDateString(),
          time: item.time,
        })
      );
      setAppointment(formatedapp);

      const formatedqury = response?.data?.recentQuery?.map((item) => ({
        ...item,
        branch: item.branch.title,
        createdAt: new Date(item.createdAt).toLocaleString(),
      }));
      setQuerys(formatedqury);
    } catch (error) {
      toast.error(error.messege);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [
    {
      metric: "enquiries",
      value: graphData.enquiries,
      fill: "var(--color-enquiries)",
    },
    {
      metric: "appointments",
      value: graphData.appointments,
      fill: "var(--color-appointments)",
    },
    {
      metric: "treatments",
      value: graphData.treatments,
      fill: "var(--color-treatments)",
    },
  ];
  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">Admin Home Page</h1>

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
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
            <StatusCard
              item={{
                title: "Total enquiries",
                value: stats.enquiries,
                change: "5.2%",
                isPositive: true,
                icon: Users,
              }}
            />
            <StatusCard
              item={{
                title: "Total appointments booked",
                value: stats.appointments,
                change: "4.8%",
                isPositive: true,
                icon: Calendar,
              }}
            />
            <StatusCard
              item={{
                title: "Total treatments completed",
                value: stats.treatments,
                change: "3.1%",
                isPositive: true,
                icon: CheckCircle,
              }}
            />
            <StatusCard
              item={{
                title: "Clinic branches",
                value: stats.branches,
                change: "0%",
                isPositive: true,
                icon: MapPin,
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-lg font-bold mb-2">Upcoming Appointments</h1>
        <div className="md:max-w-[76vw]">
          <TableCs
            data={appointment}
            columns={appointmentcolumns}
            rowsPerPage={6}
          />
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-lg font-bold mb-2">Recent Queries</h1>
        <div className="md:max-w-[77vw]">
          <TableCs data={querys} columns={queryColumns} rowsPerPage={10} />
        </div>
      </div>
    </div>
  );
}
