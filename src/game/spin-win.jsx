import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkle, Trophy, TrophyIcon } from "lucide-react";
import React from "react";
import WheelOfFortune from "./spin-wheel";
const REWARDS = [
  {
    id: 1,
    label: "Free Surgery",
    probability: 1,
    text: "#ffffff",
    color: "#f0b000",
  },
  {
    id: 2,
    label: "Free PRP",
    probability: 5,
    text: "#30090b",
    color: "#F9FAFB",
  },
  {
    id: 3,
    label: "Free 5 Years of Doctor Consultation",
    probability: 8,
    text: "#ffffff",
    color: "#f0b000",
  },
  {
    id: 4,
    label: "Free Surgery up to 1000 Grafts",
    probability: 2,
    text: "#30090b",
    color: "#F9FAFB",
  },
  {
    id: 5,
    label: "10% Discount on Surgery",
    probability: 20,
    text: "#ffffff",
    color: "#f0b000",
  },
  {
    id: 6,
    label: "Better Luck Next Time",
    probability: 60,
    text: "#30090b",
    color: "#F9FAFB",
  },
];

export default function SpinWin() {
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
        <CardContent>
          <WheelOfFortune sectors={REWARDS}/>
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
    </div>
  );
}
