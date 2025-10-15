import React from "react";
import logo from "../../assets/images/logo.png";
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

export default function SignUp() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <img src={logo} alt="logo" className="w-32 h-full mb-4" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Fill in your details below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* First Name */}
              <div className="grid gap-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input id="firstname" type="text" placeholder="John" required />
              </div>

              {/* Last Name */}
              <div className="grid gap-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input id="lastname" type="text" placeholder="Doe" required />
              </div>

              {/* Phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  required
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
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
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
