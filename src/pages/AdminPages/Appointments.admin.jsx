import TableCs from "@/components/custom-component/Table/table-cs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getHandler, putHandler } from "@/services/api.services";
import { searchApi } from "@/services/searchApi.services";
import { downloadFile } from "@/utils/downloadFile";
import axios from "axios";
import { FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const columns = [
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
function formatData(data) {
  return data?.map((item) => ({
    ...item,
    firstName: item.name.first,
    lastName: item.name.last,
    isPhoneVerified: item.isPhoneVerified ? "Yes" : "No",
    date: new Date(item.date).toLocaleDateString(),
    time: item.time,
  }));
}
export default function AppointmentsAdmin() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const [appointmentdata, setAppointmentData] = useState({
    data: [],
    pagination: {},
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [customCsv, setCustomCsv] = useState({
    filterType: "",
    startDate: "",
    endDate: "",
  });

  const handleClick = (row) => {
    setIsDialogOpen(true);
    setSelectedRow(row);
  };
  const downLoadCSV = async ({ filterType, startDate, endDate }) => {
    try {
      let url = `/appointment/export?filterType=${filterType}`;
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await axios.get(url, {
        responseType: "blob", // 👈 critical
        baseURL: "http://localhost:4000/api/v1",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const fileType =
        response.headers["content-type"] ||
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      downloadFile(response.data, "patient.xlsx", fileType);
      toast.success("CSV downloaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const handleChange = async (value) => {
    await toast.promise(
      putHandler(
        `/appointment/updateStatus/${selectedRow._id}`,
        {
          status: value,
        },
        {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      ),
      {
        loading: "Updating status...",
        success: (response) => {
          fetchData();
          setIsDialogOpen(false);
          return response.message || "Status updated successfully!";
        },
        error: (error) => error.message || "Something went wrong!",
      }
    );
  };

  const handleSearch = async (text) => {
    if (!text.trim()) {
      return;
    }
    try {
      const response = await searchApi(text, "/appointment/get");
      const formattedData = formatData(response?.data?.data || []);
      setAppointmentData({
        data: formattedData,
        pagination: response?.data?.pagination || {},
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  const fetchData = async (query) => {
    try {
      let url = "/appointment/get";
      if (date && query) {
        url = `/appointment/get?${query}&filterType=today`;
      } else if (date) {
        url = `/appointment/get?filterType=today`;
      } else if (query) {
        url = `/appointment/get?${query}`;
      }

      const response = await getHandler(url, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });
      const formattedData = formatData(response.data.data);
      setAppointmentData({
        data: formattedData,
        pagination: response.data.pagination,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  const handleNext = (page) => fetchData(`page=${page}`);
  const handlePrevious = (page) => fetchData(`page=${page}`);
  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">
        {date ? `Today's Appointment` : `Appointments`}
      </h1>
      <div className="md:max-w-[77vw]">
        <TableCs
          data={appointmentdata.data}
          paginationData={appointmentdata.pagination}
          columns={columns}
          rowsPerPage={10}
          onClick={handleClick}
          onSearch={handleSearch}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          buttonChildren={
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className={"bg-green-700 text-white hover:bg-green-600"}
                  >
                    <FileText />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Select Duration</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => downLoadCSV({ filterType: "today" })}
                  >
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => downLoadCSV({ filterType: "week" })}
                  >
                    This Week
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => downLoadCSV({ filterType: "month" })}
                  >
                    This Month
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <div className="flex flex-col gap-2">
                      <div>
                        <label className="text-sm font-medium">
                          Start Date
                        </label>
                        <Input
                          type="date"
                          className="mt-1"
                          onChange={(e) =>
                            setCustomCsv({
                              ...customCsv,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">End Date</label>
                        <Input
                          type="date"
                          className="mt-1"
                          onChange={(e) =>
                            setCustomCsv({
                              ...customCsv,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>

                      <Button
                        onClick={() =>
                          downLoadCSV({
                            filterType: "custom",
                            startDate: customCsv.startDate,
                            endDate: customCsv.endDate,
                          })
                        }
                        className="mt-2 w-full"
                      >
                        Apply Filter
                      </Button>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Query Preview</DialogTitle>
            <DialogDescription>
              Review the details of your query below before taking any action.
            </DialogDescription>
            <ul>
              <li>
                <strong>First Name:</strong> {selectedRow?.firstName}
              </li>
              <li>
                <strong>Last Name:</strong> {selectedRow?.lastName}
              </li>
              <li>
                <strong>Phone:</strong> {selectedRow?.phone}
              </li>
              <li>
                <strong>Phone Verified:</strong> {selectedRow?.isPhoneVerified}
              </li>
              <li>
                <strong>Email:</strong> {selectedRow?.email}
              </li>
              <li>
                <strong>City:</strong> {selectedRow?.city}
              </li>
              <li>
                <strong>State:</strong> {selectedRow?.state}
              </li>
              <li>
                <strong>Message:</strong> {selectedRow?.message}
              </li>
              <li>
                <strong>Looking For:</strong> {selectedRow?.lookingFor}
              </li>
              <li>
                <strong>Date:</strong> {selectedRow?.Date}
              </li>
              <li>
                <strong>Time:</strong> {selectedRow?.time}
              </li>
              <li className="flex items-center gap-2">
                <strong>Status:</strong>{" "}
                <Select
                  value={selectedRow?.status}
                  onValueChange={handleChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"].map(
                      (s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </li>
            </ul>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
