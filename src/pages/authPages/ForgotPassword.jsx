import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo.png";
import { toast } from "sonner";
import { getValidPhone } from "@/utils/validatePhone.utils";
import { postHandler } from "@/services/api.services";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  // Step 1: State for phone
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  // Step 2: Handle input change
  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  // Step 3: Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validPhone = getValidPhone(phone);
    if (!validPhone) {
      throw new Error("Please enter a valid phone number");
    }
    await toast.promise(
      postHandler("/auth/register/FORGET_PASSWORD", { phone: validPhone }),
      {
        loading: "Sending OTP...",
        success: (response) => {
          localStorage.setItem(
            "verificationToken",
            response.data.verificationToken
          );
          navigate("/auth/verify-otp");
          return response.message;
        },
        error: (error) => error.message || "Something went wrong!",
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <img src={logo} alt="logo" className="w-32 h-full mb-4" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your Phone below and we’ll send you instructions to reset your
            password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  required
                  value={phone}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full mt-4">
                Send OTP
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Remember your password?{" "}
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
