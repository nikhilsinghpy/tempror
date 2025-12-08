import AddPrpForm from "@/components/custom-component/forms/add-Prp-form";
import TableCs from "@/components/custom-component/Table/table-cs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getHandler } from "@/services/api.services";
import { searchApi } from "@/services/searchApi.services";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { downloadFile } from "@/utils/downloadFile";
import { Link } from "react-router-dom";
const columns = [
  { header: "Patient Name", accessor: "patientFirstName" },
  { header: "Patient Last Name", accessor: "patientLastName" },
  { header: "Patient Email", accessor: "patientEmail" },
  { header: "Patient Phone", accessor: "patientPhone" },
  { header: "Treatment Type", accessor: "treatmentType" },
  { header: "Session ID", accessor: "sessionId" },
  { header: "Status", accessor: "status" },
  { header: "User ID", accessor: "patientUserId" },
  { header: "Date", accessor: "date" },
  { header: "Time", accessor: "time" },
  { header: "Branch", accessor: "branch" },
  { header: "Branch Phone", accessor: "branchPhone" },
  { header: "Scheduled At", accessor: "createdAt" },
];

function formatData(data) {
  return data.map((item) => ({
    ...item,

    // Patient details with fallback
    patientFirstName: item?.patient?.name?.first || "N/A",
    patientLastName: item?.patient?.name?.last || "N/A",
    patientEmail: item?.patient?.email || "N/A",
    patientPhone: item?.patient?.phone || "N/A",
    patientUserId: item?.patient?.userId || "N/A",

    // Branch details (from patient.branch)
    branch: item?.patient?.branch?.badge || "N/A",
    branchPhone: item?.patient?.branch?.contact?.phone || "N/A",

    // Time & Date formatting
    createdAt: item?.createdAt
      ? new Date(item.createdAt).toLocaleString()
      : "N/A",

    date: item?.date
      ? new Date(item.date).toLocaleDateString()
      : "N/A",

    time: item?.time || "N/A",
  }));
}

export default function ClientPRPPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrp, setselectedPrp] = useState(null);
  const [customCsv, setCustomCsv] = useState({
    filterType: "",
    startDate: "",
    endDate: "",
  });
  const [PrpData, setPrpData] = useState({
    data: [],
    pagination: {},
  });
  const fetchData = async (query) => {
    try {
      let url = `/prp/get?${query}`;
      const response = await getHandler(url, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      });
      const formatedData = formatData(response.data.data);
      setPrpData({
        data: formatedData,
        pagination: response.data.pagination,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.messege || "Something went wrong!");
    }
  };

  const handleNext = (page) => fetchData(`page=${page}`);
  const handlePrevious = (page) => fetchData(`page=${page}`);
  const handleSearch = async (search) => {
    if (!search.trim()) {
      return;
    }
    try {
      const response = await searchApi(search, "/prp/get");
      const formatdata = formatData(response.data.data);
      setPrpData({
        data: formatdata,
        pagination: response.data.pagination,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };
  const downLoadCSV = async ({ filterType, startDate, endDate }) => {
    try {
      let url = `/prp/export?filterType=${filterType}`;
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await axios.get(url, {
        responseType: "blob",
        baseURL: "http://localhost:4040/api/v1",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // ✅ Create blob and trigger download
      const fileType =
        response.headers["content-type"] ||
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      downloadFile(response.data, "prp_schedules.xlsx", fileType);
      setCustomCsv({
        filterType: "",
        startDate: "",
        endDate: "",
      });
      toast.success("CSV downloaded successfully!");
    } catch (error) {
      console.error(error);
      setCustomCsv({
        filterType: "",
        startDate: "",
        endDate: "",
      });
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-4 w-full space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Patient PRP List</h1>
        <Button asChild>
          <Link to="/admin/patient/patient-prp/schedule">+ Add PRP Schedule</Link>
        </Button>
      </div>
      <div className="md:max-w-[75vw]">
        <TableCs
          data={PrpData.data}
          columns={columns}
          rowsPerPage={1}
          paginationData={PrpData.pagination}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          onSearch={handleSearch}
          buttonChildren={
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal />
                    Data Filter
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>Select Duration</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => fetchData("filterType=today")}
                  >
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => fetchData("filterType=week")}
                  >
                    This Week
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => fetchData("filterType=month")}
                  >
                    This Month
                  </DropdownMenuItem>

                  {/* Custom Submenu */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Custom</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-3 w-64">
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
                          <label className="text-sm font-medium">
                            End Date
                          </label>
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
                            fetchData(
                              `filterType=custom&startDate=${customCsv.startDate}&endDate=${customCsv.endDate}`
                            )
                          }
                          className="mt-2 w-full"
                        >
                          Apply Filter
                        </Button>
                      </div>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-green-700 text-white hover:bg-green-600"
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

                  {/* Custom Submenu */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Custom</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-3 w-64">
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
                          <label className="text-sm font-medium">
                            End Date
                          </label>
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
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }
        />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {selectedPrp ? "Update PRP Schedule" : "Schedule A New PRP"}
            </SheetTitle>
            <SheetDescription className={"capitalize"}>
              {selectedPrp
                ? "Here you can update the PRP review details that will appear on the website."
                : "Here you can add a new PRP review to display on the website. You can edit the details later after adding."}
            </SheetDescription>
          </SheetHeader>
          <AddPrpForm fetchData={fetchData} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
