import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, MapPin, Phone, X } from "lucide-react";

const queryData = {
  _id: "690da6fa3341202303b1b333",
  name: "Paras Parivaarorg",
  email: "parasparivaar39@gmail.com",
  phone: "08882580006",
  lookingFor: "beard-transplant",
  branch: {
    title: "Belleza Rohini",
    contact: {
      phone: "+91-9876543210",
      email: "rohini@belleza.com",
      address: "123 Rohini Sector-5, Delhi, India",
      mapUrl: "https://maps.google.com/?q=Belleza+Rohini",
    },
  },
  message:
    "The status column is added manually (as you showed in your example).",
  createdAt: "2025-11-07T07:59:54.695Z",
  status: "RESOLVED",
};

export default function QueryPageUser() {
  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-extrabold text-amber-700 tracking-tight mb-6">
          My Queries
        </h1>
        <Card className="py-0 overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
          {/* Header */}
          <CardHeader className=" bg-gradient-to-r from-amber-600 to-amber-400 p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <CardTitle className="text-xl font-bold text-white">
                  {queryData.name}
                </CardTitle>
                <p className="text-sm text-gray-300 capitalize mt-1">
                  {queryData.lookingFor.replace("-", " ")}
                </p>
              </div>
              <p
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  queryData.status.toLowerCase() === "resolved"
                    ? "bg-green-100 text-green-800"
                    : queryData.status.toLowerCase() === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {queryData.status.charAt(0).toUpperCase() +
                  queryData.status.slice(1).toLowerCase()}
              </p>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-6 space-y-6 text-gray-700">
            {/* User Info */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500">Your Info</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <span>{queryData.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span>{queryData.phone}</span>
                </div>
              </div>
            </div>

            {/* Branch Info */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-500">Branch Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg font-medium">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>{queryData.branch.title}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <span>{queryData.branch.contact.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span>{queryData.branch.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>{queryData.branch.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500">Message</p>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {queryData.message}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end text-xs text-gray-400">
              Booked on:{" "}
              {new Date(queryData.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
