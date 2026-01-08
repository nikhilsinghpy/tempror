import React from "react";
import { Separator } from "@/components/ui/separator";
import { Calendar, CalendarCheck, Clock, Scissors, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";
import { Badge } from "@/components/ui/badge";

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
            {user?.PRP?.map((data) => (
              <div key={data.id} className="relative pl-10">
                {/* Timeline Dot */}
                <div className="absolute left-[-11px] top-1 w-5 h-5 bg-amber-600 rounded-full border-4 border-white shadow-md"></div>
                <Card className="w-full max-w-md rounded-2xl shadow-sm hover:shadow-md transition">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Scissors className="w-5 h-5 text-primary" />
                      PRP Session #{data.sessionId}
                    </CardTitle>

                    <Badge
                      variant={
                        data.status === "SCHEDULED" ? "secondary" : "default"
                      }
                      className="uppercase"
                    >
                      {data.status}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        Treatment:
                      </span>
                      {data.treatmentType.replace("-", " ").toUpperCase()}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(data.date).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {data.time}
                    </div>

                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Created on {new Date(data.createdAt).toLocaleDateString()}
                    </div>
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
