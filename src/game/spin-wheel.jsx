import React, { useEffect, useRef, useState } from "react";
import {  Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResultDialog from "@/components/custom-component/dialogs-cs/result-dialog";

const iconMap = {
  candy: "🍬",
  gift: "🎁",
  trophy: "🏆",
  x: "❌",
};
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  // 1. Split the text into words
  var words = text.split(" ");
  var line = "";
  var lines = [];

  // 2. Loop through words, building lines that don't exceed maxWidth
  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + " ";
    var metrics = context.measureText(testLine); // Check the width
    var testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      // If the current word pushes the line over the width,
      // add the current line (without the new word) to the array
      lines.push(line.trim());
      // Start a new line with the current word
      line = words[n] + " ";
    } else {
      // Otherwise, keep building the current line
      line = testLine;
    }
  }
  // Add the last line
  lines.push(line.trim());

  // 3. Draw each line
  // You need to adjust your drawing style (like textAlign) for multi-line text.
  // Since you had textAlign = "right", you probably want to keep that.

  // NOTE: Because your original code used textAlign = "right" and placed the
  // text at `rad - 10`, we will assume this is where the *right edge* of the
  // wrapped text should be.
  var currentY = y;

  context.textAlign = "right"; // Keep your original alignment

  for (var i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, currentY);
    currentY += lineHeight; // Move down for the next line
  }
}
const WheelOfFortune = ({ sectors: propSectors }) => {
  const sectorsToUse = propSectors;
  const canvasRef = useRef(null);
  const angVelRef = useRef(0);
  const angRef = useRef(0);
  const spinButtonClickedRef = useRef(false);
  const animationRef = useRef(null);

  const [currentSector, setCurrentSector] = useState(sectorsToUse[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [leftSpins, setLeftSpins] = useState(1);

  const tot = sectorsToUse.length;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectorsToUse.length;
  const friction = 0.991;

  const rand = (m, M) => Math.random() * (M - m) + m;

  const getIndex = () => Math.floor(tot - (angRef.current / TAU) * tot) % tot;

  const drawSector = (ctx, sector, i, rad) => {
    const ang = arc * i;
    ctx.save();

    // COLOR with gradient
    const gradient = ctx.createRadialGradient(rad, rad, 0, rad, rad, rad);
    gradient.addColorStop(0, sector.color);
    gradient.addColorStop(1, adjustBrightness(sector.color, -20));

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();

    // Border between sectors
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // ICON
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "center";
    ctx.font = "40px Arial";
    const icon = sector.icon ? iconMap[sector.icon] : "⭐";
    ctx.fillText(icon, rad / 2, 15);

    // TEXT
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 12px 'Lato', sans-serif";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    // Call the new wrapping function
    var startX = rad - 10;
    var startY = 10;
    var maxWrapWidth = 100; // Adjust this value based on your needs
    var lineSpacing = 16; // A little more than your 13px font size
    wrapText(ctx, sector.label, startX, startY, maxWrapWidth, lineSpacing);

    ctx.restore();
  };

  const adjustBrightness = (color, amount) => {
    const num = parseInt(color.replace("#", ""), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  };

  const rotate = (canvas) => {
    const sector = sectorsToUse[getIndex()];
    canvas.style.transform = `rotate(${angRef.current - PI / 2}rad)`;
    setCurrentSector(sector);
  };

  const frame = (canvas) => {
    // Fire an event after the wheel has stopped spinning
    if (!angVelRef.current && spinButtonClickedRef.current) {
      const finalSector = sectorsToUse[getIndex()];
      setResult(`Woop! You won ${finalSector.label}`);
      setIsSpinning(false);
      spinButtonClickedRef.current = false;
      return;
    }

    angVelRef.current *= friction;
    if (angVelRef.current < 0.002) angVelRef.current = 0;
    angRef.current += angVelRef.current;
    angRef.current %= TAU;
    rotate(canvas);
  };

  const engine = (canvas) => {
    frame(canvas);
    animationRef.current = requestAnimationFrame(() => engine(canvas));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dia = canvas.width;
    const rad = dia / 2;

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(rad, rad, rad, 0, TAU);
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Draw sectors
    sectorsToUse.forEach((sector, i) => drawSector(ctx, sector, i, rad));
    rotate(canvas);

    // Start engine
    engine(canvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleSpin = () => {
    if (!angVelRef.current) {
      angVelRef.current = rand(0.25, 0.45);
      spinButtonClickedRef.current = true;
      setIsSpinning(true);
      setLeftSpins((prev) => prev - 1);
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Decorative circles */}

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-20">
          <div className="relative">
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-t-red-500 drop-shadow-2xl"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-yellow-400"></div>
          </div>
        </div>

        {/* Wheel container with shadow */}
        <div className="relative bg-gradient-to-br from-amber-600 to-yellow-700 rounded-full p-4 shadow-2xl">
          <canvas
            ref={canvasRef}
            id="wheel"
            width="300"
            height="300"
            className="drop-shadow-2xl rounded-full"
          />

          {/* Center button decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl border-4 border-white flex items-center justify-center z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        id="spin"
        onClick={handleSpin}
        disabled={isSpinning || leftSpins <= 0}
        className={"my-5"}
      >
        <Sparkles className="w-8 h-8" />
        SPIN {leftSpins > 0 ? `(${leftSpins} left)` : "(No spins left)"}
        <Sparkles className="w-8 h-8" />
      </Button>
      <ResultDialog open={!!result} onOpenChange={setResult} result={result} />

      {/* Floating particles effect */}
    </div>
  );
};

export default WheelOfFortune;
