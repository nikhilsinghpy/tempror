import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { getHandler, postHandler } from "@/services/api.services";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PostResultForm({ setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    treatment: "",
    image: null,
    patientPhone: "",
    branchId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.promise(
      postHandler("/surgeryResult/create", formData, {
        "Content-Type": "multipart/form-data",
      }),
      {
        loading: "Submitting form...",
        success: (response) => {
          setFormData({
            title: "",
            treatment: "",
            image: null,
            patientPhone: "",
            branchId: "",
          });
          setLoading(false);
          setIsOpen(false);
          return response.message;
        },
        error: (error) => {
          setLoading(false);
          return error.message || "Something went wrong!";
        },
      }
    );
    setLoading(false);
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
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter result title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="treatment">Treatment</Label>
        <Textarea
          id="treatment"
          name="treatment"
          placeholder="Enter treatment details"
          value={formData.treatment}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="patientPhone">Patient Phone</Label>
        <Input
          id="patientPhone"
          name="patientPhone"
          placeholder="Enter patient phone number"
          value={formData.patientPhone}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="branchId">Branch</Label>
        <Select
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
      <div className="space-y-2">
        <Label htmlFor="image">Upload Image</Label>
        <div className="flex items-center gap-2">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Upload className="text-gray-500" size={20} />
        </div>
        {formData.image && (
          <p className="text-sm text-green-600 mt-1">
            Selected: {formData.image.name}
          </p>
        )}
      </div>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </form>
  );
}
