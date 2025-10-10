import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function ResultCard({ resultCardData }) {
  return (
    <div className="flex items-center gap-2">
      <Card className={"!p-0 overflow-hidden"}>
        <CardContent className={"!p-0"}>
          <img src={resultCardData?.before} alt="" />
          <p className="my-4 text-center font-bold ">Before</p>
        </CardContent>
      </Card>
      <Card className={"!p-0 overflow-hidden"}>
        <CardContent className={"!p-0"}>
          <img src={resultCardData?.after} alt="" />
          <p className="my-4 text-center font-bold ">After</p>
        </CardContent>
      </Card>
    </div>
  );
}
