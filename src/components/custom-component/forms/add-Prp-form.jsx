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
    firstname: "",
    lastname: "",
    email: "",
    treatmentType: "",
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
    toast.promise(
      postHandler("/prp/create", formData, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      }),
      {
        loading: "Submitting form...",
        success: (response) => {
          fetchData();
          setIsOpen(false);
          return response.message;
        },
        error: (error) => {
          toast.error(error.message || "Something went wrong!");
        },
      }
    );
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
      {/* Firstname */}
      <div className="flex gap-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="firstname">First Name</Label>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Lastname */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>
      </div>

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

      {/* Email */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
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
            <SelectGroup>
              <SelectLabel>Select Branch</SelectLabel>
              <SelectItem value="Hair PRP">Hair PRP</SelectItem>
              <SelectItem value="Eyebrow PRP">Eyebrow PRP</SelectItem>
              <SelectItem value="Beard PRP">Beard PRP</SelectItem>
              <SelectItem value="Face PRP">Face PRP</SelectItem>
              <SelectItem value="Under-eye PRP">Under-eye PRP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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

      {/* Branch */}
      <div className="space-y-2">
        <Label htmlFor="branchId">Branch</Label>
        <Select
          value={formData.branchId}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, branchId: value }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Branch" />
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
