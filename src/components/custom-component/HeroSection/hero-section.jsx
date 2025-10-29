import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, Undo2, Shirt } from "lucide-react";

export default function HeroSection({ heroData }) {
  const [index, setIndex] = useState(0);
  const current = heroData[index];

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % heroData.length);
  }, [heroData.length]);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
              >
                <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
                  <Plus className="h-4 w-4" />
                  {current.tag}
                </p>
                <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                  {current.title}
                </h1>
                <p className="mt-4 text-slate-600 text-base sm:text-lg">
                  {current.description}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {current.cta.map((item, index) => (
                    <a
                      href={item.href}
                      key={index}
                      className={`inline-flex border items-center justify-center rounded-md  px-4 py-2.5 text-sm font-medium ${
                        item.varient === "primary"
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-white text-slate-900 hover:bg-slate-200"
                      }`}
                    >
                      {item.title}
                      <item.icon className="ml-2 h-4 w-4" />
                    </a>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <Undo2 className="h-4 w-4 text-slate-700" />
                    Free 7-day returns
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Shirt className="h-4 w-4 text-slate-700" />
                    Best Quality at Affordable Price
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
              >
                <img
                  src={current.image}
                  alt="Lifestyle product banner"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Change data button (demo) */}
      </div>
    </section>
  );
}
