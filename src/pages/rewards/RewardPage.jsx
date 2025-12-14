import GiftBox from "@/components/custom-component/giftbox/gift-box";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Lock,
  Sparkle,
  Sparkles,
  Trophy,
  TrophyIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getValidPhone } from "@/utils/validatePhone.utils";
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";

const REWARDS = [
  { id: 1, label: "Free Surgery", probability: 0.001, color: "#f0b000" },
  { id: 2, label: "Free PRP", probability: 0.199, color: "#F9FAFB" },
  {
    id: 3,
    label: "Free 5 Years of Doctor Consultation",
    probability: 9,
    color: "#f0b000",
  },
  {
    id: 4,
    label: "Free Surgery up to 1000 Grafts",
    probability: 0.8,
    color: "#F9FAFB",
  },
  {
    id: 5,
    label: "10% Discount on Surgery",
    probability: 50,
    color: "#f0b000",
  },
  { id: 6, label: "Better Luck Next Time", probability: 40, color: "#F9FAFB" },
];

export default function RewardPage() {
  const [userPhone, setUserPhone] = useState("");
  const [rewaredData, setRewaredData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [screenshot, setScreenshot] = useState(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [giftSlots, setGiftSlots] = useState([]);
  const fileInputRef = useRef(null);
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const validPhone = getValidPhone(userPhone);
    if (!validPhone) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    toast.promise(
      postHandler(
        "/reward/get",
        { phone: validPhone },
        { "Content-Type": "application/json" }
      ),
      {
        loading: "Submitting form...",
        success: (response) => {
          setIsDialogOpen(false);
          setRewaredData(response.data);
          return response.message;
        },
        error: (error) => error?.message || "Something went wrong!",
      }
    );
  };

  /* ---------------- FILE UPLOAD ---------------- */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB");
      return;
    }

    setScreenshot(file);
  };

  /* ---------------- TASK SUBMIT ---------------- */
  const handleSubmitTask = () => {
    if (!screenshot) return;

    const formData = new FormData();
    formData.append("image", screenshot);
    formData.append("phone", userPhone);

    toast.promise(
      postHandler("/reward/task/submit", formData, {
        "Content-Type": "multipart/form-data",
      }),
      {
        loading: "Uploading screenshot...",
        success: (res) => {
          setTaskDialogOpen(false);
          setScreenshot(null);
          setRewaredData(res.data);
          return res.message || "Gift unlocked 🎉";
        },
        error: (err) => err?.message || "Upload failed",
      }
    );
  };

  /* Sync backend count → slots */
  useEffect(() => {
    const count = rewaredData?.gifts?.available ?? 0;
    setGiftSlots(
      Array.from({ length: count }, (_, i) => ({
        id: crypto.randomUUID(), // 🔥 stable identity
      }))
    );
  }, [rewaredData?.gifts?.available]);

  /* Remove ONE gift safely */
  const consumeOneGift = () => {
    setGiftSlots((prev) => prev.slice(0, -1)); // ✅ remove LAST only
  };
  return (
    <div className="w-full p-4">
      <Card className="w-full max-w-6xl mx-auto text-gray-800">
        <CardHeader>
          <div className="flex flex-col items-center">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              Reward Wheel
            </CardTitle>
            <p className="mb-4 text-gray-600 text-[10px] md:text-xl font-medium mt-4 flex items-center gap-2">
              <Sparkle className="text-amber-400" /> Spin to unlock exclusive
              medical rewards! <Sparkle className="text-amber-400" />
            </p>
          </div>
        </CardHeader>

        <Separator />

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {giftSlots.length > 0 ? (
              giftSlots.map((slot) => (
                <GiftBox
                  key={slot.id}
                  rewards={REWARDS}
                  phone={userPhone}
                  onConsume={consumeOneGift} 
                  setRewaredData={setRewaredData}
                />
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Complete the task to get more rewards
                </p>
                <Button onClick={() => setTaskDialogOpen(true)}>
                  Earn a GiftBox
                </Button>
              </div>
            )}
          </div>
          {rewaredData?.tasks?.filter((task) => task.approved === false)
            .length > 0 && (
            <>
              <Separator className="my-6" />

              <p className="text-sm text-muted-foreground mb-2">
                Pending Approval Gifts
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {rewaredData?.tasks
                  ?.filter((task) => task.approved === false)
                  .map((task) => (
                    <div
                      key={task._id} // ✅ important
                      className="relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-100 p-6 text-center shadow-sm"
                    >
                      {/* Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
                        <Clock className="h-3 w-3" />
                        Pending Approval
                      </div>

                      {/* Icon */}
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                        <Lock className="h-8 w-8 text-gray-500" />
                      </div>

                      {/* Title */}
                      <p className="text-sm font-semibold text-gray-700">
                        {task.title || "Post Google Review"}
                      </p>

                      {/* Subtitle */}
                      <p className="mt-1 text-xs text-gray-500">
                        Your submission is under review
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </CardContent>

        <Separator />

        <CardFooter>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {REWARDS.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-yellow-400 transition-all hover:shadow-md"
                style={{ backgroundColor: reward.color }}
              >
                <TrophyIcon
                  style={{ color: reward.color }}
                  className="w-5 h-5"
                />
                <span className="text-gray-900 font-semibold text-sm leading-tight">
                  {reward.label}
                </span>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Phone Number Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!localStorage.getItem("userPhone")) setIsDialogOpen(true);
          else setIsDialogOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handlePhoneSubmit}>
            <DialogHeader>
              <DialogTitle>Enter Your Phone Number</DialogTitle>
              <DialogDescription>
                Please provide your phone number to proceed and claim your
                rewards.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  maxLength={10}
                  value={userPhone}
                  placeholder="Enter your phone number eg: 9876543210"
                  onChange={(e) =>
                    setUserPhone(e.target.value.replace(/\D/g, ""))
                  }
                  required
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button type="submit" disabled={userPhone.length !== 10}>
                <Sparkles className="w-4 h-4 mr-1" />
                Get Rewards
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Complete the Task to Earn a Gift 🎁</DialogTitle>
            <DialogDescription>
              Leave a review and upload a screenshot to unlock your gift box.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="font-semibold text-sm">
                Task: Post a Google Review ⭐
              </h4>
              <p className="text-sm text-muted-foreground">
                Leave an honest review on our Google page and upload a
                screenshot as proof.
              </p>

              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(
                      "https://reviewthis.biz/bellezareview",
                      "_blank"
                    )
                  }
                >
                  Post Review
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {screenshot ? "Screenshot Selected ✅" : "Upload Screenshot"}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="w-full"
              disabled={!screenshot}
              onClick={handleSubmitTask}
            >
              Submit & Unlock Gift 🎉
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
