import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getHandler, postHandler } from "@/services/api.services";
import { toast } from "sonner";

export default function AddPrpForm({ fetchData, setIsOpen }) {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    treatmentType: "",
    status: "pending",
    date: "",
    time: "",
    branchId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.promise(postHandler("/prp/create", formData), {
      loading: "Submitting form...",
      success: (response) => {
        fetchData(); // Call the fetchData function to refresh the table data
        setIsOpen(false);
        return response.message;
      },
      error: (error) => {
        toast.error(error.message || "Something went wrong!");
      },
    });
  };
  const fetchBranches = async () => {
    try {
      const response = await getHandler("/branch/get");
      setBranches(response.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <form className="grid gap-4 p-4" onSubmit={handleSubmit}>
      {/* Phone */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />
      </div>

      {/* Treatment Type */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="treatmentType">Treatment Type</Label>
        <Select
          value={formData.treatmentType}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, treatmentType: value }))
          }
        >
          <SelectTrigger className={"w-full"}>
            <SelectValue placeholder="Select treatment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hair PRP">Hair PRP</SelectItem>
            <SelectItem value="Eyebrow PRP">Eyebrow PRP</SelectItem>
            <SelectItem value="Beard PRP">Beard PRP</SelectItem>
            <SelectItem value="Face PRP">Face PRP</SelectItem>
            <SelectItem value="Under-eye PRP">Under-eye PRP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          disabled
          placeholder="Enter status"
          required
        />
      </div>

      {/* Date */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Time */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="time">Time</Label>
        <Input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="branchId">Branch</Label>
        <Select
          value={formData.branchId}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, branchId: value }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Branch" />{" "}
            {/* Show placeholder if empty */}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Branch</SelectLabel>
              {branches.map((branch) => (
                <SelectItem key={branch._id} value={branch._id}>
                  {branch.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="mt-4 w-full">
        Submit
      </Button>
    </form>
  );
}
