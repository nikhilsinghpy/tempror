import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarCheck,
  CreditCard,
  Droplets,
  MessageSquare,
  Settings,
  User,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/use-user";

const navigationData = [
  { label: "Account Details", link: "/account/account-details", icon: User },
  {
    label: "Your Appointment",
    link: "/account/appointments",
    icon: CalendarCheck,
  },
  { label: "Your Query", link: "/account/queries", icon: MessageSquare },
  { label: "Diet Chart", link: "/account/diet-chart", icon: Utensils },
  { label: "Payment", link: "/account/payment", icon: CreditCard },
  { label: "PRP", link: "/account/prp", icon: Droplets },
  { label: "Settings", link: "/account/settings", icon: Settings },
];

export default function AccountPageUser() {
  const { user, loading } = useUser();

  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-amber-400 to-amber-600 h-40 flex justify-center items-end rounded-b-[5rem]">
          <div className="absolute -bottom-16 flex flex-col items-center">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {loading ? (
              <p className="mt-2 text-lg font-semibold text-white">
                Loading...
              </p>
            ) : (
              <>
                <p className="text-lg mt-3 font-semibold text-gray-800">
                  {user?.name?.first} {user?.name?.last}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </>
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-20 p-4 space-y-2">
          {navigationData.map((item) => (
            <Link to={item.link}>
              <div
                key={item.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                <p className="text-base font-medium">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Section */}
        <div className="border-t mt-4 py-3 text-center text-xs text-gray-500 bg-gray-50">
          © 2025 Belleza Wellness | All Rights Reserved
        </div>
      </div>
    </div>
  );
}
