import PatientFrom from "@/components/custom-component/forms/patient-from";
import TableCs from "@/components/custom-component/Table/table-cs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { getHandler, postHandler, putHandler } from "@/services/api.services";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileText, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { searchApi } from "@/services/searchApi.services";
import { downloadFile } from "@/utils/downloadFile";
const patientColumns = [
  { header: "Branch", accessor: "branch" },
  { header: "Patient ID", accessor: "_id" },
  { header: "First Name", accessor: "namefirst" },
  { header: "Last Name", accessor: "namelast" },
  { header: "Phone", accessor: "phone" },
  { header: "Age", accessor: "age" },
  { header: "Gender", accessor: "gender" },
  { header: "Profession", accessor: "profession" },
  { header: "Residential Address", accessor: "residentialAddress" },
  { header: "Marital Status", accessor: "maritalStatus" },
  { header: "Medical History", accessor: "medicalInformationmedicalHistory" },
  {
    header: "Taking Any Medicine",
    accessor: "medicalInformationtakingAnyMedicine",
  },
  {
    header: "Allergic To Any Medicine",
    accessor: "medicalInformationallergicToAnyMedicine",
  },
  {
    header: "Allergic To Any Other",
    accessor: "medicalInformationallergicToAnyOther",
  },
  {
    header: "Genetic History For Hair Fall",
    accessor: "medicalInformationgeneticHistoryForHairFall",
  },
  { header: "Reference", accessor: "reference" },
  { header: "Purpose Of Visit", accessor: "purposeOfVisit" },
  { header: "Looking For", accessor: "lookingFor" },
  { header: "Baldness Pattern", accessor: "baldnessPattern" },
  { header: "Diagnosis", accessor: "surgeryDetailsdiagnosis" },
  {
    header: "No. of Follicles Required",
    accessor: "surgeryDetailsnoOfFolliclesRequired",
  },
  { header: "Date of Surgery", accessor: "surgeryDetailsdateOfSurgery" },
  { header: "Cost of Surgery", accessor: "surgeryDetailscostOfSurgery" },
  { header: "Remarks", accessor: "surgeryDetailsremarks" },
  { header: "Booking Amount", accessor: "surgeryDetailsbookingAmount" },
  { header: "Added At", accessor: "createdAt" },
];

function formatData(data) {
  const formattedData = data.map((patient) => ({
    ...patient,
    branch: patient.branch.title,
    namefirst: patient.name.first,
    namelast: patient.name.last,
    medicalInformationmedicalHistory: patient.medicalInformation.medicalHistory,
    medicalInformationtakingAnyMedicine:
      patient.medicalInformation.takingAnyMedicine,
    medicalInformationallergicToAnyMedicine:
      patient.medicalInformation.allergicToAnyMedicine,
    medicalInformationallergicToAnyOther:
      patient.medicalInformation.allergicToAnyOther,
    medicalInformationgeneticHistoryForHairFall:
      patient.medicalInformation.geneticHistoryForHairFall,
    surgeryDetailsdiagnosis: patient.surgeryDetails.diagnosis,
    surgeryDetailsnoOfFolliclesRequired:
      patient.surgeryDetails.noOfFolliclesRequired,
    surgeryDetailsdateOfSurgery: patient.surgeryDetails.dateOfSurgery,
    surgeryDetailscostOfSurgery: patient.surgeryDetails.costOfSurgery,
    surgeryDetailsremarks: patient.surgeryDetails.remarks,
    surgeryDetailsbookingAmount: patient.surgeryDetails.bookingAmount,
    createdAt: new Date(patient.createdAt).toLocaleString(),
  }));
  return formattedData;
}
export default function ClientListPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customCsv, setCustomCsv] = useState({
    filterType: "",
    startDate: "",
    endDate: "",
  });
  const [patients, setPatients] = useState({
    data: [],
    pagination: {},
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatientData, setNewPatientData] = useState({
    phone: "",
    name: {
      first: "",
      last: "",
    },
    age: "",
    gender: "", // "male" | "female" | "other"
    profession: "",
    residentialAddress: "",
    maritalStatus: "", // "married" | "unmarried"
    medicalInformation: {
      medicalHistory: "",
      takingAnyMedicine: "",
      allergicToAnyMedicine: "",
      allergicToAnyOther: "",
      geneticHistoryForHairFall: "",
    },
    reference: "", // "social-media" | "google" | "website" | "word-of-mouth" | "others"
    purposeOfVisit: "",
    lookingFor: "", // "hair-transplant" | "beard-transplant" | "eyebrow-transplant" | "other"
    branchId: "",
    baldnessPattern: "", // number 1–8
    surgeryDetails: {
      diagnosis: "",
      noOfFolliclesRequired: "",
      dateOfSurgery: "",
      costOfSurgery: "",
      remarks: "",
      bookingAmount: "",
    },
  });

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    setIsOpen(true);
  };
  const handleSubmit = () => {
    setLoading(true);
    toast.promise(
      postHandler(`/patient/register`, newPatientData, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "adding new patient... ",
        success: (response) => {
          setIsOpen(false);
          setLoading(false);
          return response.message;
        },
        error: (error) => {
          setLoading(false);
          return error.message || "Something went wrong!";
        },
      }
    );
  };
  const handleUpdate = () => {
    setLoading(true);
    toast.promise(
      putHandler(`/patient/update/${selectedPatient._id}`, selectedPatient, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "Updating patient... ",
        success: (response) => {
          setIsOpen(false);
          setLoading(false);
          return response.message;
        },
        error: (error) => {
          setLoading(false);
          return error.message || "Something went wrong!";
        },
      }
    );
  };

  const downLoadCSV = async ({ filterType, startDate, endDate }) => {
    try {
      let url = `/patient/export?filterType=${filterType}`;
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await axios.get(url, {
        responseType: "blob",
        baseURL: "http://localhost:4000/api/v1",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // ✅ Create blob and trigger download
      const fileType =
        response.headers["content-type"] ||
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      downloadFile(response.data, "patient.xlsx", fileType);
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

  const handleSearch = async (text) => {
    if (!text.trim()) {
      return;
    }
    try {
      const response = await searchApi(text, "/patient/get");
      const formattedData = formatData(response.data.data);
      setPatients({
        data: formattedData,
        pagination: response.data.pagination,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };
  const fetchData = async (query) => {
    try {
      let url = "/patient/get";
      if (query) url = `/patient/get?${query}`;
      const response = await getHandler(url);
      const formattedData = formatData(response.data.data);
      setPatients({
        data: formattedData,
        pagination: response.data.pagination,
      });
      if (query === "custom") {
        setCustomCsv({
          filterType: "",
          startDate: "",
          endDate: "",
        });
      }
    } catch (error) {
      if (query === "custom") {
        setCustomCsv({
          filterType: "",
          startDate: "",
          endDate: "",
        });
      }
      toast.error(error.message || "Something went wrong!");
    }
  };

  const handleNext = (page) => fetchData(`page=${page}`);
  const handlePrevious = (page) => fetchData(`page=${page}`);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-4 w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Clients List</h1>
        <Button onClick={() => setIsOpen(true)}>Add New Patient</Button>
      </div>
      <div className="md:max-w-[77vw]">
        <TableCs
          data={patients.data}
          columns={patientColumns}
          rowsPerPage={10}
          onClick={handleRowClick}
          paginationData={patients.pagination}
          onSearch={handleSearch}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
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
        <SheetContent className={"gap-2 !max-w-[40vw]"}>
          <SheetHeader>
            <SheetTitle>
              {selectedPatient ? "Update Patient" : "Add New Patient"}
            </SheetTitle>
            <SheetDescription className={"capitalize"}>
              {selectedPatient
                ? "Here you can update the patient's details that will appear on the website or in your records."
                : "Here you can add a new patient profile to your system. You can edit their details later after adding."}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-200px)] p-4 space-y-4">
            {selectedPatient ? (
              <PatientFrom
                patientData={selectedPatient}
                setPatientData={setSelectedPatient}
              />
            ) : (
              <PatientFrom
                patientData={newPatientData}
                setPatientData={setNewPatientData}
              />
            )}
          </ScrollArea>

          <SheetFooter className={"border-t shadow-2xl"}>
            <div className="flex justify-end gap-2">
              {selectedPatient ? (
                <Button onClick={handleUpdate} disabled={loading}>
                  Update Patient
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  Register Patient
                </Button>
              )}
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
