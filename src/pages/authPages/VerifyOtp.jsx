import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo.png";
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    await toast.promise(
      postHandler(
        "/auth/verify-otp",
        { otp: enteredOtp },
        {
          Authorization: `Bearer ${localStorage.getItem("verificationToken")}`,
        }
      ),
      {
        loading: "Verifying OTP...",
        success: (response) => {
          if (response.data.requestType === "FORGET_PASSWORD") {
            navigate("/auth/reset-password");
          } else if (response.data.requestType === "PHONE_VERIFICATION") {
            localStorage.removeItem("verificationToken");
            navigate("/auth/login");
          }
          return response.message;
        },
        error: (error) => error.message || "Something went wrong!",
      }
    );
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setIsResending(true);
    setTimer(30); // start 30s countdown
    await toast.promise(
      postHandler(
        "/auth/resend-verification",
        {},
        {
          Authorization: `Bearer ${localStorage.getItem("verificationToken")}`,
        }
      ),
      {
        loading: "Resending OTP...",
        success: (response) => response.message || "OTP resent successfully!",
        error: (error) => error.message || "Failed to resend OTP",
      }
    );

    setIsResending(false);
  };

  // Timer countdown logic
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <img src={logo} alt="logo" className="w-32 h-full mb-4" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your registered email or phone number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-10 h-12 text-center text-lg font-medium"
                  required
                />
              ))}
            </div>
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={otp.join("").length < 6}
            >
              Verify
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResendOtp}
            disabled={timer > 0 || isResending}
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Didn’t receive the code? Try again after{" "}
            {timer > 0 ? `${timer}s` : "a while"}.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
