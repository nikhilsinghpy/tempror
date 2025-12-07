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
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";
import { getValidPhone } from "@/utils/validatePhone.utils";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // Step 1: State for phone and password
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  // Step 2: Handle input change
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
    for (let key in formData) {
      if (!formData[key]?.trim()) {
        throw new Error(`Please enter ${key}`);
      }
    }
    const validPhone = getValidPhone(formData.phone);
    if (!validPhone) {
      throw new Error("Please enter a valid phone number");
    }
    const newPayload = {
      phone: validPhone,
      password: formData.password,
    };
    toast.promise(
      postHandler(
        "/auth/login/web",
        newPayload,
        {
          "Content-Type": "application/json",
        },
        {
          withCredentials: true,
        }
      ),
      {
        loading: "Logging in...",
        success: (response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          navigate("/");
          return response.message;
        },
        error: (error) => error.message || "Something went wrong!",
      },
      {
        duration: 3000,
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <img src={"https://res.cloudinary.com/dlfpme2sn/image/upload/v1765022631/logo_ojc0cv.png"} alt="logo" className="w-32 h-full mb-4" loading="lazy"/>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your phone number and password to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number eg: 1234567890"
                  required
                  min="10"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/sign-up"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
