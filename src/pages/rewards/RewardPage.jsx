import GiftBox from "@/components/custom-component/giftbox/gift-box";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkle, Trophy, TrophyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const REWARDS = [
  {
    id: 1,
    label: "Free Surgery",
    probability: 0.001,
    text: "#ffffff",
    color: "#f0b000",
  },
  {
    id: 2,
    label: "Free PRP",
    probability: 0.199,
    text: "#30090b",
    color: "#F9FAFB",
  },
  {
    id: 3,
    label: "Free 5 Years of Doctor Consultation",
    probability: 9,
    text: "#ffffff",
    color: "#f0b000",
  },
  {
    id: 4,
    label: "Free Surgery up to 1000 Grafts",
    probability: 0.8,
    text: "#30090b",
    color: "#F9FAFB",
  },
  {
    id: 5,
    label: "10% Discount on Surgery",
    probability: 50,
    text: "#ffffff",
    color: "#f0b000",
  },
  {
    id: 6,
    label: "Better Luck Next Time",
    probability: 40,
    text: "#30090b",
    color: "#F9FAFB",
  },
];

export default function RewardPage() {
  const [userPhone, setUserPhone] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    // Initialize user phone state if needed
    const phone = localStorage.getItem("userPhone");
    if (phone) {
      setUserPhone(phone);
    }
    else {
      setIsDialogOpen(true);
    }
  }, [userPhone]);
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
            <p className="text-gray-600 text-[10px] md:text-xl font-medium mt-4 flex items-center gap-2">
              <Sparkle className="text-amber-400" /> Spin to unlock exclusive
              medical rewards! <Sparkle className="text-amber-400" />
            </p>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <GiftBox rewards={REWARDS} key={index} />
          ))}
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
                <TrophyIcon className={`text-${reward.color} w-5 h-5`} />
                <span className="text-gray-900 font-semibold text-sm leading-tight">
                  {reward.label}
                </span>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
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
                <Input id="phone" name="phone" placeholder="Enter your phone number eg: 9876543210" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit"><Sparkle className="w-4 h-4 " /> Get Rewards</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
