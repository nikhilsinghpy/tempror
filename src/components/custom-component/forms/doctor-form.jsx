import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { getHandler } from "@/services/api.services";
import { DeleteIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DoctorForm({ newDoctorData, setNewDoctorData }) {
  const [branches, setBranches] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...newDoctorData.education];
    updatedEducation[index][name] = value;
    setNewDoctorData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewDoctorData((prev) => ({
      ...prev,
      profile: file,
    }));
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
    <div className="space-y-4 px-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter Doctor name"
          onChange={handleChange}
          value={newDoctorData.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile">Profile</Label>
        <Input
          type={"file"}
          id="profile"
          name="profile"
          placeholder="Enter Doctor profile"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="speciality">Speciality</Label>
        <Input
          id="speciality"
          name="speciality"
          placeholder="Enter Doctor Speciality"
          onChange={handleChange}
          value={newDoctorData.speciality}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Experience</Label>
        <Input
          type={"number"}
          id="experience"
          name="experience"
          placeholder="Enter Doctor Experience"
          onChange={handleChange}
          value={newDoctorData.experience}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">bio</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Enter Doctor bio"
          onChange={handleChange}
          value={newDoctorData.bio}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <Input
          id="rating"
          type={"number"}
          name="rating"
          placeholder="Enter Doctor Rating"
          onChange={handleChange}
          value={newDoctorData.rating}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        {newDoctorData.education.map((edu, index) => (
          <div
            className="space-y-2 p-2 border rounded-md mt-4 relative"
            key={index}
          >
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input
                id="college"
                name="college"
                placeholder="college"
                onChange={(e) => handleEducationChange(index, e)}
                value={edu.college}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                placeholder="Degree"
                onChange={(e) => handleEducationChange(index, e)}
                value={edu.degree}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                placeholder="specialization"
                onChange={(e) => handleEducationChange(index, e)}
                value={edu.specialization}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type={"number"}
                placeholder="year"
                onChange={(e) => handleEducationChange(index, e)}
                value={edu.year}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="location"
                onChange={(e) => handleEducationChange(index, e)}
                value={edu.location}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cgpa">CGPA</Label>
              <Input
                id="cgpa"
                type={"number"}
                name="cgpa"
                placeholder="cgpa"
                onChange={(e) => handleEducationChange(index, e)}
                value={edu.cgpa}
              />
            </div>
            {index !== 0 && (
              <Button
                className="absolute -top-2 -right-2"
                onClick={() => {
                  setNewDoctorData((prev) => ({
                    ...prev,
                    education: prev.education.filter((_, i) => i !== index),
                  }));
                }}
              >
                <DeleteIcon />
              </Button>
            )}
          </div>
        ))}

        <Button
          onClick={() => {
            setNewDoctorData((prev) => ({
              ...prev,
              education: [...prev.education, {}],
            }));
          }}
        >
          Add Education
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="branchId">Branch</Label>
        <Select
          onValueChange={(value) =>
            setNewDoctorData((prev) => ({ ...prev, branchId: value }))
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

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Enter Doctor email"
          onChange={handleChange}
          value={newDoctorData?.email || newDoctorData.contact?.email}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="Enter Doctor phone"
          onChange={handleChange}
          value={newDoctorData?.phone || newDoctorData.contact?.phone}
        />
      </div>
    </div>
  );
}
