import React, { useState } from "react";
import { Gift, Sparkles } from "lucide-react";
import ResultDialog from "@/components/custom-component/dialogs-cs/result-dialog";
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";

function getItemByProbability(items) {
  // Step 1: Calculate total probability
  const totalProbability = items.reduce(
    (sum, item) => sum + item.probability,
    0
  );

  // Step 2: Generate random number
  const random = Math.random() * totalProbability;

  // Step 3: Pick item based on weight
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.probability;
    if (random < cumulative) {
      return item;
    }
  }
}

const Confetti = ({ id }) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomDelay = Math.random() * 0.2;
  const randomDuration = 1.5 + Math.random() * 1;
  const randomX = -150 + Math.random() * 300;
  const randomY = -100 + Math.random() * 200;
  const randomRotate = Math.random() * 720;

  return (
    <div
      className={`absolute w-3 h-3 ${randomColor} rounded-sm`}
      style={{
        left: "50%",
        top: "50%",
        animation: `confettiExplosion ${randomDuration}s ease-out ${randomDelay}s forwards`,
        "--tx": `${randomX}px`,
        "--ty": `${randomY}px`,
        "--rotate": `${randomRotate}deg`,
      }}
    />
  );
};

const ExplosionParticle = ({ id }) => {
  const angle = (id * 360) / 16;
  const distance = 150;
  const tx = Math.cos((angle * Math.PI) / 180) * distance;
  const ty = Math.sin((angle * Math.PI) / 180) * distance;

  return (
    <div
      className="absolute w-4 h-4 bg-gradient-to-br from-orange-400 to-red-600 rounded-full"
      style={{
        left: "50%",
        top: "50%",
        animation: "explosionParticle 0.6s ease-out forwards",
        "--tx": `${tx}px`,
        "--ty": `${ty}px`,
      }}
    />
  );
};

export default function GiftBox({ rewards, phone,onConsume, setRewaredData }) {
  const [stage, setStage] = useState("idle");
  const [reward, setReward] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClaimReward = (payload) => {
    toast.promise(
      postHandler(
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
      ),
      {
        loading: "Claiming reward...",
        success: (response) => {
          setRewaredData(response.data);
          onConsume();
          return response.message || "Reward claimed successfully 🎉";
        },
        error: (error) => {
          return error?.message || "Something went wrong!";
        },
      }
    );
  };

  const handleClick = () => {
    if (stage === "idle") {
      // Start shaking
      setStage("shaking");

      // After shaking, explode
      setTimeout(() => {
        setStage("exploding");
        const randomReward = getItemByProbability(rewards);
        setReward(randomReward);
        setShowConfetti(true);

        // Show dialog after explosion
        setTimeout(() => {
          setStage("exploded");
          setShowDialog(true);
          handleClaimReward(randomReward);
        }, 800);
      }, 1500);
    }
  };

  return (
    <>
      <style>{`
        @keyframes confettiExplosion {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0) rotate(var(--rotate));
            opacity: 0;
          }
        }
        
        @keyframes explosionParticle {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg) scale(1); }
          10% { transform: translateX(-15px) rotate(-8deg) scale(1.05); }
          20% { transform: translateX(15px) rotate(8deg) scale(1.05); }
          30% { transform: translateX(-15px) rotate(-8deg) scale(1.1); }
          40% { transform: translateX(15px) rotate(8deg) scale(1.1); }
          50% { transform: translateX(-20px) rotate(-10deg) scale(1.15); }
          60% { transform: translateX(20px) rotate(10deg) scale(1.15); }
          70% { transform: translateX(-20px) rotate(-10deg) scale(1.2); }
          80% { transform: translateX(20px) rotate(10deg) scale(1.2); }
          90% { transform: translateX(-15px) rotate(-8deg) scale(1.25); }
        }
        
        @keyframes explode {
          0% { 
            transform: scale(1.3);
            opacity: 1;
          }
          50% { 
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% { 
            transform: scale(0);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6); }
        }
        
        @keyframes dialogAppear {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes rewardBounce {
          0% {
            transform: scale(0) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }
      `}</style>

      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(80)].map((_, i) => (
            <Confetti key={i} id={i} />
          ))}
        </div>
      )}

      {/* Gift Box */}
      {stage !== "exploded" && (
        <div className="relative">
          {/* Explosion particles */}
          {stage === "exploding" && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <ExplosionParticle key={i} id={i} />
              ))}
            </div>
          )}

          <div
            onClick={handleClick}
            className={`${
              stage === "idle" ? "cursor-pointer hover:scale-110" : ""
            } transition-transform`}
            style={{
              animation:
                stage === "shaking"
                  ? "shake 1.5s ease-in-out"
                  : stage === "exploding"
                  ? "explode 0.6s ease-out forwards"
                  : "none",
            }}
          >
            <div className="relative bg-gradient-to-br from-red-500 to-red-700 p-8 rounded-2xl shadow-2xl">
              <Gift className="w-20 h-20 text-white" strokeWidth={1.5} />

              {/* Ribbon */}
              <div className="absolute top-0 left-1/2 w-4 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 transform -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-y-1/2" />

              {/* Bow */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-yellow-400 rounded-full" />

              {/* Sparkles */}
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300" />
              <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-yellow-300" />
            </div>

            {stage === "idle" && (
              <p className="text-white text-lg font-bold text-center mt-4">
                Click to open!
              </p>
            )}

            {stage === "shaking" && (
              <p className="text-yellow-300 text-lg font-bold text-center mt-4 animate-pulse">
                Opening...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Reward Dialog */}
      {showDialog && reward && (
        <ResultDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          result={reward.label}
        />
      )}
    </>
  );
}
