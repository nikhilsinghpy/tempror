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
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const columns = [
  { header: "Session ID", accessor: "sessionId" },
  { header: "Status", accessor: "status" },
  { header: "Date", accessor: "date" },
  { header: "Time", accessor: "time" },
  { header: "Treatment Type", accessor: "treatmentType" },
  { header: "Patient Name", accessor: "patientFirstName" },
  { header: "Patient Last Name", accessor: "patientLastName" },
  { header: "Patient Email", accessor: "patientEmail" },
  { header: "Patient Phone", accessor: "patientPhone" },
  { header: "User ID", accessor: "patientUserId" },
  { header: "Branch Title", accessor: "branchTitle" },
  { header: "Branch Phone", accessor: "branchPhone" },
  { header: "Scheduled At", accessor: "createdAt" },
];

export default function ClientPRPPageAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrp, setselectedPrp] = useState(null);
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
      const formatdata = response.data.data.map((item) => ({
        ...item,
        patientFirstName: item.patientInfo.name.first,
        patientLastName: item.patientInfo.name.last,
        patientEmail: item.patientInfo.email,
        patientPhone: item.patientInfo.phone,
        patientUserId: item.patientInfo.userId,
        branchTitle: item.branch.title,
        branchPhone: item.branch.contact.phone,
        createdAt: new Date(item.createdAt).toLocaleString(),
        date: new Date(item.date).toLocaleDateString(),
      }));
      setPrpData({
        data: formatdata,
        pagination: response.data.pagination,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.messege || "Something went wrong!");
    }
  };

  const handleNext = (page) => fetchData(`page=${page}`);
  const handlePrevious = (page) => fetchData(`page=${page}`);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-4 w-full space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Clients PRP List</h1>
        <Button onClick={() => setIsOpen(true)}>+ Add PRP Schedule</Button>
      </div>
      <div className="md:max-w-[77vw]">
        <TableCs
          data={PrpData.data}
          columns={columns}
          rowsPerPage={1}
          paginationData={PrpData.pagination}
          handleNext={handleNext}
          handlePrev={handlePrevious}
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
