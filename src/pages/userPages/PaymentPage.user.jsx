import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { Separator } from "@/components/ui/separator";

const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-red-500 text-white">Pending</Badge>;
    case "scheduled":
      return <Badge className="bg-amber-500 text-white">Scheduled</Badge>;
    case "paid":
      return <Badge className="bg-green-600 text-white">Paid</Badge>;
    default:
      return null;
  }
};
export default function PaymentPageUser() {
  const { user, loading } = useUser();
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4">
      <div className="space-y-4 min-w-sm md:min-w-3xl">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-amber-700 tracking-tight">
            Your Payments & Schedules
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto font-medium">
            View your upcoming payments arranged in a clean, easy-to-follow
            timeline.
          </p>
        </div>

        <Separator />

        {loading ? (
          <p className="text-gray-600 text-md max-w-md font-semibold">
            loading Payments ...
          </p>
        ) : !user?.payments || user.payments.length === 0 ? (
          <p className="text-center max-w-md mx-auto py-20 text-gray-500 text-lg">
            You don’t have any active payment schedule yet. Your payment plan
            will be generated according to your selected services and billing
            preferences.
          </p>
        ) : (
          <div className="w-full max-w-2xl space-y-4">
            {user?.payments?.map((item) => (
              <Card key={item.id} className="shadow-md rounded-2xl">
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    {item.title}
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-lg font-semibold">Amount: {item.amount}</p>
                  <p className="text-sm text-gray-600">
                    {item.status === "paid"
                      ? item.dueDate
                      : `Due Date: ${item.dueDate}`}
                  </p>

                  {item.status === "pending" && (
                    <Button className="w-full" variant={"outline"}>
                      Pay Now
                    </Button>
                  )}

                  {item.status === "scheduled" && (
                    <p className="text-sm text-amber-600 font-semibold">
                      Auto reminder will be sent before due date
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
