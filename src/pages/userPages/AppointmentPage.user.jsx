import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";
import { Separator } from "@/components/ui/separator";

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
  const { user, loading } = useUser();
  return (
    <div className="min-h-screen py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-amber-700 tracking-tight">
            Your Appointments
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto font-medium">
            View your upcoming appointments arranged in a clean, easy-to-follow
            timeline.
          </p>
        </div>

        <Separator />
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            loading ...
          </div>
        ) : !user?.appointments || user.appointments.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            You don’t have any appointments yet.
          </div>
        ) : (
          user?.appointments?.map((appt) => (
            <Card
              key={appt?._id}
              className="py-0 overflow-hidden rounded-2xl shadow-md  border border-gray-200 bg-white"
            >
              {/* Header */}
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-400  p-5 border-b">
                <div>
                  <CardTitle className="text-xl font-bold text-white">
                    {appt?.patientId?.name?.first} {appt?.patientId?.name?.last}
                  </CardTitle>
                  <p className="text-sm text-gray-100 capitalize mt-1">
                    {appt?.patientId?.lookingFor.replace("-", " ")}
                  </p>
                </div>

                {/* Status Badge */}
                <div>{getStatusBadge(appt?.status)}</div>
              </CardHeader>

              {/* Content */}
              <CardContent className="p-6 space-y-5 text-gray-700">
                {/* Date, Time, Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span>
                      {new Date(appt?.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span>{appt?.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span>
                      {appt?.city}, {appt?.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span>{appt?.patientId?.phone}</span>
                    {appt?.patientId?.isPhoneVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span>{appt?.patientId?.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500">
                    Branch Info
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg font-medium">
                      <MapPin className="w-5 h-5 text-amber-600" />
                      <span>{appt?.patientId?.branch?.title}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <Mail className="w-5 h-5 text-amber-600" />
                      <span>{appt?.patientId?.branch?.contact?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <Phone className="w-5 h-5 text-amber-600" />
                      <span>{appt?.patientId?.branch?.contact?.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-amber-600" />
                      <span>{appt?.patientId?.branch?.contact?.address}</span>
                    </div>
                  </div>
                </div>
                {/* Message */}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Message</p>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {appt?.message}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end text-xs text-gray-400">
                  Booked on:{" "}
                  {new Date(appt?.createdAt).toLocaleDateString("en-IN", {
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
