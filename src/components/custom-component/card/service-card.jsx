import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

export default function ServiceCard({ serviceData }) {
  const Icon = serviceData.icon;

  return (
    <Card>
      <CardHeader>
        <div className="p-3 shadow-2xl rounded-md w-fit border">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold">
          {serviceData.value} {serviceData.title}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {serviceData.description}
        </p>
      </CardContent>
    </Card>
  );
}
