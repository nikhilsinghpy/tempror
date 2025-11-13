import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getHandler } from "@/services/api.services";
export default function PatientFrom({ patientData, setPatientData }) {
  const [branches, setBranches] = useState([]);
  const updateField = (field, value) =>
    setPatientData((prev) => ({ ...prev, [field]: value }));

  const updateNestedField = (parent, field, value) =>
    setPatientData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));

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
    <form className="flex flex-col gap-6 px-2">
      {/* 👤 Personal Information */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-black">
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={patientData?.name?.first}
              onChange={(e) =>
                updateNestedField("name", "first", e.target.value)
              }
              placeholder="Enter first name"
            />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              value={patientData?.name?.last}
              onChange={(e) =>
                updateNestedField("name", "last", e.target.value)
              }
              placeholder="Enter last name"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={patientData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div className="space-y-2">
            <Label>Age</Label>
            <Input
              type="number"
              value={patientData.age}
              onChange={(e) => updateField("age", e.target.value)}
              placeholder="Enter age"
            />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select
              value={patientData.gender}
              onValueChange={(val) => updateField("gender", val)}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Profession</Label>
            <Input
              value={patientData.profession}
              onChange={(e) => updateField("profession", e.target.value)}
              placeholder="Enter profession"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label>Residential Address</Label>
            <Textarea
              value={patientData.residentialAddress}
              onChange={(e) =>
                updateField("residentialAddress", e.target.value)
              }
              placeholder="Enter address"
            />
          </div>
          <div className="space-y-2">
            <Label>Marital Status</Label>
            <Select
              value={patientData.maritalStatus}
              onValueChange={(val) => updateField("maritalStatus", val)}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="unmarried">Unmarried</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      {/* 🧬 Medical Information */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-black">
          Medical Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(patientData.medicalInformation).map((key) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </Label>
              <Input
                value={patientData.medicalInformation[key]}
                onChange={(e) =>
                  updateNestedField("medicalInformation", key, e.target.value)
                }
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* 🎯 Visit & Reference */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-black">Visit Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Reference</Label>
            <Select
              value={patientData.reference}
              onValueChange={(val) => updateField("reference", val)}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="word-of-mouth">Word of Mouth</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Purpose of Visit</Label>
            <Input
              value={patientData.purposeOfVisit}
              onChange={(e) => updateField("purposeOfVisit", e.target.value)}
              placeholder="Enter purpose"
            />
          </div>
          <div className="space-y-2">
            <Label>Looking For</Label>
            <Select
              value={patientData.lookingFor}
              onValueChange={(val) => updateField("lookingFor", val)}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select treatment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hair-transplant">Hair Transplant</SelectItem>
                <SelectItem value="beard-transplant">
                  Beard Transplant
                </SelectItem>
                <SelectItem value="eyebrow-transplant">
                  Eyebrow Transplant
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Baldness Pattern</Label>
            <Input
              type="number"
              value={patientData.baldnessPattern}
              onChange={(e) => updateField("baldnessPattern", e.target.value)}
              placeholder="Enter pattern number (1-8)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="branchId">Branch</Label>
            <Select
              value={patientData.branchId}
              onValueChange={(val) => updateField("branchId", val)}
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
        </div>
      </section>

      <Separator />

      {/* 🏥 Surgery Details */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-black">Surgery Details</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(patientData.surgeryDetails).map((key) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </Label>
              <Input
                type={
                  key.includes("date")
                    ? "date"
                    : key.includes("cost") ||
                      key.includes("Amount") ||
                      key.includes("noOfFollicles")
                    ? "number"
                    : "text"
                }
                value={patientData.surgeryDetails[key]}
                onChange={(e) =>
                  updateNestedField("surgeryDetails", key, e.target.value)
                }
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}
        </div>
      </section>
    </form>
  );
}
