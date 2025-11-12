import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center ">
      <p className="text-lg text-gray-700"> You look a little lost…</p>
      <p className="text-4xl md:text-5xl font-extrabold text-[#facc15] mt-2">
        Ooops! Page not found
      </p>
      <p className="text-center max-w-md text-gray-600 mt-3">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="max-w-7xl mx-auto flex items-center justify-center mt-4">
        <Link to="/">
          <Card>
            <CardContent className="flex items-center gap-4">
              <Home className="text-black" />
              <div>
                <p className="font-semibold text-black">Home Page</p>
                <p className="text-sm text-gray-600">
                  There's no place like home…
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
