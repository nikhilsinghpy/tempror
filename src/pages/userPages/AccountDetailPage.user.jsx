import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/use-user";
import { putHandler } from "@/services/api.services";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const AccountDetailUser = () => {
  const { user, loading, refetch } = useUser();

  const [form, setForm] = useState({
    name: { first: "", last: "" },
    email: "",
    address: "",
    phone: "",
    dob: "",
  });

  // Populate form when user data loads
  useEffect(() => {
    if (user) {
      setForm({
        name: {
          first: user.name.first || "",
          last: user.name.last || "",
        },
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Handle nested name fields
    if (id === "firstName" || id === "lastName") {
      setForm((prev) => ({
        ...prev,
        name: { ...prev.name, [id === "firstName" ? "first" : "last"]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let missingFields = [];
    for (const key in form) {
      if (key === "name") {
        if (!form.name.first.trim() || !form.name.last.trim()) {
          missingFields.push("First and Last Name");
        }
      } else {
        if (!form[key]?.trim()) {
          missingFields.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
      }
    }
    if (missingFields.length > 0) {
      toast.warning("Please fill in: " + missingFields.join(", "));
      return;
    }
    const changedFields = Object.keys(form).reduce((acc, key) => {
      if (form[key] !== user[key]) {
        acc[key] = form[key];
      }
      return acc;
    }, {});

    toast.promise(
      putHandler("/user/update", changedFields, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }),
      {
        loading: "Updating user...",
        success: (response) => {
          refetch();
          return response.message;
        },
        error: (error) => {
          return error.message;
        },
      },
      {
        duration: 5000,
      }
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-amber-400 to-amber-600 h-44 flex justify-center items-end rounded-b-[6rem]">
          <div className="absolute -bottom-20 flex flex-col items-center">
            <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xl mt-3 font-semibold text-gray-800">
              {`${form.name.first} ${form.name.last}`}
            </p>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>
        </div>

        {/* Account Info Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-28 p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-600"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              value={form.name.first}
              onChange={handleChange}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-600"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              value={form.name.last}
              onChange={handleChange}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </Label>
            <Input
              id="email"
              readOnly
              disabled
              value={form.email}
              onChange={handleChange}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-600"
            >
              Phone
            </Label>
            <Input
              id="phone"
              value={form.phone}
              readOnly
              disabled
              onChange={handleChange}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-600"
            >
              Address
            </Label>
            <Textarea
              id="address"
              value={form.address}
              onChange={handleChange}
              className="bg-gray-50 border-gray-200 resize-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="dob" className="text-sm font-medium text-gray-600">
              Date of Birth
            </Label>
            <Input
              id="dob"
              value={form.dob}
              onChange={handleChange}
              type="date"
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-2 rounded-lg transition-all duration-200"
            >
              Update Profile
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t py-3 text-center text-xs text-gray-500 bg-gray-50">
          © 2025 Belleza Wellness | Profile Management
        </div>
      </div>
    </div>
  );
};

export default AccountDetailUser;
