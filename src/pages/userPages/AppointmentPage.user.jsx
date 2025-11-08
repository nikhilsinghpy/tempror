import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const appointments = [
  {
    _id: "690dc294644b4b889ae74d58",
    userId: "68f3391a40cf3dda1610885e",
    name: { first: "Paras", last: "Parivaarorg" },
    status: "COMPLETED",
    isPhoneVerified: false,
    phone: "08882580006",
    email: "parasparivaar39@gmail.com",
    city: "New Delhi",
    state: "Delhi",
    message:
      "Belleza Rohini — Delhi’s top Hair Transplant Clinic, specializing in FUE, DHI & Sapphire techniques. Trusted by 10,000+ happy clients.",
    lookingFor: "hair-transplant",
    date: "2025-11-07T00:00:00.000Z",
    time: "15:24",
    createdAt: "2025-11-07T09:57:40.061Z",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-yellow-700 border-yellow-300"
        >
          Pending
        </Badge>
      );
    case "CONFIRMED":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-700 border-blue-300"
        >
          Confirmed
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge className="bg-green-100 text-green-700 border-green-300">
          Completed
        </Badge>
      );
    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function AppointmentPageUser() {
  return (
    <div className="min-h-screen py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-extrabold text-amber-700 tracking-tight mb-6">
          My Appointments
        </h1>
        {appointments.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            You don’t have any appointments yet.
          </div>
        ) : (
          appointments.map((appt) => (
            <Card
              key={appt._id}
              className="py-0 overflow-hidden rounded-2xl shadow-md  border border-gray-200 bg-white"
            >
              {/* Header */}
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-400  p-5 border-b">
                <div>
                  <CardTitle className="text-xl font-bold text-white">
                    {appt.name.first} {appt.name.last}
                  </CardTitle>
                  <p className="text-sm text-gray-100 capitalize mt-1">
                    {appt.lookingFor.replace("-", " ")}
                  </p>
                </div>

                {/* Status Badge */}
                <div>{getStatusBadge(appt.status)}</div>
              </CardHeader>

              {/* Content */}
              <CardContent className="p-6 space-y-5 text-gray-700">
                {/* Date, Time, Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <span>
                      {new Date(appt.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span>{appt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <span>
                      {appt.city}, {appt.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                    <Phone className="w-5 h-5 text-amber-600" />
                    <span>{appt.phone}</span>
                    {appt.isPhoneVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                    <Mail className="w-5 h-5 text-amber-600" />
                    <span>{appt.email}</span>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Message</p>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {appt.message}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end text-xs text-gray-400">
                  Booked on:{" "}
                  {new Date(appt.createdAt).toLocaleDateString("en-IN", {
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
