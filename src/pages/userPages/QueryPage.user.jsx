import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, MapPin, Phone, X } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { Separator } from "@/components/ui/separator";

export default function QueryPageUser() {
  const { user, loading } = useUser();
  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center ">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-amber-700 tracking-tight">
            Your Queries
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto font-medium">
            View your Registed queries arranged in a clean, easy-to-follow
            timeline.
          </p>
        </div>

        <Separator />
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            loading ...
          </div>
        ) : !user?.queries || user.queries.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            You don’t have any queries yet.
          </div>
        ) : (
          user?.queries?.map((query) => (
            <Card className="py-0 overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
              {/* Header */}
              <CardHeader className=" bg-gradient-to-r from-amber-600 to-amber-400 p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-xl font-bold text-white">
                      {query.name}
                    </CardTitle>
                    <p className="text-sm text-gray-300 capitalize mt-1">
                      {query.lookingFor.replace("-", " ")}
                    </p>
                  </div>
                  <p
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      query.status.toLowerCase() === "resolved"
                        ? "bg-green-100 text-green-800"
                        : query.status.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {query.status.charAt(0).toUpperCase() +
                      query.status.slice(1).toLowerCase()}
                  </p>
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent className="p-6 space-y-6 text-gray-700">
                {/* User Info */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500">
                    Your Info
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                      <Mail className="w-5 h-5 text-amber-600" />
                      <span>{query.email}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                      <Phone className="w-5 h-5 text-amber-600" />
                      <span>{query.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Branch Info */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500">
                    Branch Info
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg font-medium">
                      <MapPin className="w-5 h-5 text-amber-600" />
                      <span>{query.branch.title}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <Mail className="w-5 h-5 text-amber-600" />
                      <span>{query.branch.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <Phone className="w-5 h-5 text-amber-600" />
                      <span>{query.branch.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-amber-600" />
                      <span>{query.branch.contact.address}</span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Message</p>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {query.message}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end text-xs text-gray-400">
                  Booked on:{" "}
                  {new Date(query.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
