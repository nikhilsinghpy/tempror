import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { postHandler } from "@/services/api.services";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ResultDialog({ open, onOpenChange, result , phone }) {
  if (!result.label) return null;

  const isLose = result.label.includes("Better Luck");

  const handleClaimReward = async (payload) => {
    toast.loading("Claiming reward...");
    try {
      const response = await postHandler(
        "/reward/claim",
        {
          phone,
          title: payload.label,
          type: "unknown",
          value: payload.label,
        },
        {
          "Content-Type": "application/json",
        }
      );
      toast.dismiss();
      toast.success(response.message || "Reward claimed successfully 🎉");
    } catch (error) {
      console.error("Failed to claim reward:", error);
      toast.dismiss();
      toast.error(error?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    handleClaimReward(result);
  }, []);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className={"hidden"}>
        <DialogTitle>🎉 Congratulations!</DialogTitle>
        <DialogDescription>You have won the following reward</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={
          "bg-white rounded-3xl border-4 border-yellow-400 shadow-xl overflow-hidden"
        }
      >
        <div className="relative  mx-auto ">
          {/* Badge */}
          <div className="flex justify-center mt-10">
            <div className="relative">
              <div
                className={`w-28 h-28  rounded-full flex items-center justify-center shadow-lg border-${
                  isLose ? "gray" : "yellow"
                }-400 bg-${isLose ? "gray" : "yellow"}-400 shadow-lg`}
              >
                <div
                  className={`w-14 h-14  rounded-full flex items-center justify-center border-${
                    isLose ? "gray" : "yellow"
                  }-400 bg-${isLose ? "gray" : "yellow"}-100 shadow-lg`}
                >
                  ⭐
                </div>
              </div>
              {/* Ribbons */}
              <div className="absolute -bottom-6 left-3 w-10 h-10 bg-purple-500 rotate-12 rounded-md" />
              <div className="absolute -bottom-6 right-3 w-10 h-10 bg-purple-500 -rotate-12 rounded-md" />
            </div>
          </div>

          {/* Text */}
          <div className="text-center px-6 mt-8">
            <h2 className="text-2xl font-black text-black">
              {isLose ? "Better Luck Next Time!" : "Congratulations!"}
            </h2>

            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              {isLose
                ? "Don't be discouraged! Try spinning the wheel again for another chance at winning exciting rewards."
                : `You've won: ${result.label}! Our team will reach out to you with more details soon.`}
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center my-8 gap-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            {!isLose && (
              <DialogClose asChild>
                <Button>Claim</Button>
              </DialogClose>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
