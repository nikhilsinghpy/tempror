import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React from "react";

export default function itemusCard({ item }) {
  return (
    <Card className={`rounded-2xl shadow-sm`}>
      <CardContent className="flex flex-col gap-2 ">
        <div className="flex items-center text-gray-500 text-sm">
          <item.icon className="w-4 h-4 mr-2" />
          {item.title}
        </div>
        <div className="text-2xl font-semibold flex justify-between">
          {item.value}
          <div
            className={`flex items-center text-sm font-medium ${
              item.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.isPositive ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {item.change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
