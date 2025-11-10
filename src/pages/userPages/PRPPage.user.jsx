import React from "react";
import { Separator } from "@/components/ui/separator";
import { CalendarCheck, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";

export default function PRPPageUser() {
  const { user, loading } = useUser();
  return (
    <div className="min-h-screen w-full  p-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-10">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-amber-700 tracking-tight">
            Your PRP Timeline
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto font-medium">
            View your upcoming PRP sessions arranged in a clean, easy-to-follow
            timeline.
          </p>
        </div>

        <Separator />

        {/* TIMELINE */}
        {loading ? (
          <p className="text-gray-600 text-md max-w-md font-semibold">
            {" "}
            Loading PRP Timeline ...
          </p>
        ) : !user?.PRP || user?.PRP?.length === 0 ? (
          <p className="text-center py-20 text-gray-500 text-lg">
            You don’t have any PRP schedule yet. Stay tuned for updates!
          </p>
        ) : (
          <div className="relative border-l-4 border-amber-600 ml-4 space-y-10">
            {user?.PRP?.map((item) => (
              <div key={item.id} className="relative pl-10">
                {/* Timeline Dot */}
                <div className="absolute left-[-11px] top-1 w-5 h-5 bg-amber-600 rounded-full border-4 border-white shadow-md"></div>
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{item.session}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4 text-gray-400" />
                        {item.date} - {item.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-600">{item.doctor}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{item.note}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
