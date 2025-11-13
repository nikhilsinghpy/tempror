import TableCs from "@/components/custom-component/Table/table-cs";
import { getHandler, putHandler } from "@/services/api.services";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { searchApi } from "@/services/searchApi.services";
import { downloadFile } from "@/utils/downloadFile";
const contactColumns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Looking For", accessor: "lookingFor" },
  { header: "Branch", accessor: "branch" },
  { header: "Message", accessor: "message" },
  { header: "Created At", accessor: "createdAt" },
  { header: "Status", accessor: "status" },
];

function formatData(data) {
  return data.map((item) => ({
    ...item,
    branch: item.branch.title,
    createdAt: new Date(item.createdAt).toLocaleString(),
  }));
}

export default function QueryListAdmin() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const [contactData, setContactData] = useState({
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

  const handleChange = (value) => {
    toast.promise(
      putHandler(
        `/contact/updateStatus/${selectedRow._id}`,
        {
          status: value,
        },
        { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
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
      setContactData({
        data: formattedData,
        pagination: response?.data?.pagination || {},
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
    }
  };
  const fetchData = async (query) => {
    let url = "/contact/get";
    if (date && query) {
      url = `/contact/get?${query}&filterType=today`;
    } else if (date) {
      url = `/contact/get?filterType=today`;
    } else if (query) {
      url = `/contact/get?${query}`;
    }
    try {
      const response = await getHandler(url, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });

      const formattedData = formatData(response.data.data);
      setContactData({
        data: formattedData,
        pagination: response?.data?.pagination || {},
      });
      console.log(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downLoadCSV = async ({ filterType, startDate, endDate }) => {
    try {
      let url = `/contact/export?filterType=${filterType}`;
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

  const handleNext = (page) => fetchData(`page=${page}`);
  const handlePrevious = (page) => fetchData(`page=${page}`);
  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold ">
        {date ? `Today's Query` : `Query List`}
      </h1>
      <TableCs
        data={contactData.data}
        columns={contactColumns}
        rowsPerPage={10}
        onClick={handleClick}
        handleSearch={handleSearch}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        paginationData={contactData.pagination}
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
                      <label className="text-sm font-medium">Start Date</label>
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Query Preview</DialogTitle>
            <DialogDescription>
              Review the details of your query below before taking any action.
            </DialogDescription>
            <ul>
              <li>
                <strong>Name:</strong> {selectedRow?.name}
              </li>
              <li>
                <strong>Email:</strong> {selectedRow?.email}
              </li>
              <li>
                <strong>Phone:</strong> {selectedRow?.phone}
              </li>
              <li>
                <strong>Looking For:</strong> {selectedRow?.lookingFor}
              </li>
              <li>
                <strong>Branch:</strong> {selectedRow?.branch}
              </li>
              <li>
                <strong>Message:</strong> {selectedRow?.message}
              </li>
              <li>
                <strong>Created At:</strong> {selectedRow?.createdAt}
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
                    {["PENDING", "REPLIED", "REJECTED", "RESOLVED"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
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
