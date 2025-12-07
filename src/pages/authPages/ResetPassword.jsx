import { useState } from "react";
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
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.promise(
      postHandler(
        "/auth/reset-password",
        {
          newPassword: password,
        },
        {
          Authorization: `Bearer ${localStorage.getItem("verificationToken")}`,
        }
      ),
      {
        loading: "Resetting password...",
        success: (response) => {
          localStorage.removeItem("verificationToken");
          navigate("/auth/login");
          return response.message;
        },
        error: (error) => error.message || "Something went wrong!",
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <img src={"https://res.cloudinary.com/dlfpme2sn/image/upload/v1765022631/logo_ojc0cv.png"} alt="logo" className="w-32 h-full mb-4" loading="lazy"/>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter and confirm your new password to regain access
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* New Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Reset Password
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
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
