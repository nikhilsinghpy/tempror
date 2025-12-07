import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postHandler } from "@/services/api.services";
import { getValidPhone } from "@/utils/validatePhone.utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  // Step 1: State for all form fields
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;
    if (id === "phone") {
      newValue = value.replace(/\D/g, "");
    }
    setFormData({
      ...formData,
      [id]: newValue,
    });
  };
  // Step 3: Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = Object.keys(formData).filter(
      (key) => !formData[key]?.trim()
    );
    if (missingFields.length > 0) {
      toast.error(`Please enter ${missingFields.join(", ")}`);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    const validPhone = getValidPhone(formData.phone);
    if (!validPhone) {
      toast.error("Please enter a valid phone number");
      return;
    }
    const payload = { ...formData, phone: validPhone };
    await toast.promise(postHandler("/user/register", payload), {
      loading: "Registering user...",
      success: (response) => {
        localStorage.setItem(
          "verificationToken",
          response.data.verificationToken
        );
        navigate("/auth/verify-otp");
        return response.message;
      },
      error: (err) => err.message || "Something went wrong!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <img src={"https://res.cloudinary.com/dlfpme2sn/image/upload/v1765022631/logo_ojc0cv.png"} alt="logo" className="w-32 h-full mb-4" loading="lazy" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Fill in your details below to sign up
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* First Name */}

              <div className="flex items-center gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="John"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>

                {/* Last Name */}
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Doe"
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  min="8"
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  min="8"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full mt-4">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
