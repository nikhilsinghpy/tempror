import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import DynamicIcon from "@/components/ui/dynamic-icon";

export default function HeroSection({ heroData = [] }) {
  const [index, setIndex] = useState(0);

  const hasData = Array.isArray(heroData) && heroData.length > 0;
  const current = hasData ? heroData[index] : null;

  const handleNext = useCallback(() => {
    if (hasData) {
      setIndex((prev) => (prev + 1) % heroData.length);
    }
  }, [hasData, heroData.length]);

  useEffect(() => {
    if (!hasData) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, hasData]);

  if (!hasData) {
    return (
      <section className="py-20 text-center text-slate-600">
        <p>No hero data available.</p>
      </section>
    );
  }

  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current?._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                {current?.badge && (
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
                    <Plus className="h-4 w-4" />
                    {current.badge}
                  </p>
                )}
                <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                  {current?.title}
                </h1>
                <p className="mt-4 text-slate-600 text-sm ">
                  {current?.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {Array.isArray(current?.buttons) &&
                    current.buttons.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200
                          ${
                            item.type === "primary"
                              ? "bg-slate-900 text-white hover:bg-slate-800"
                              : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                      >
                        {item.label}
                        <DynamicIcon
                          className={`ml-2 h-4 w-4 ${
                            item.type === "primary"
                              ? "text-white"
                              : "text-slate-900"
                          }`}
                          name={item.icon}
                        />
                      </a>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600">
                  {current?.features?.length > 0 &&
                    current?.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <DynamicIcon name={feature?.icon} className="h-4 w-4" />
                        {feature?.text}
                      </div>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Section */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.image?.secure_url || index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
              >
                {current?.image?.secure_url ? (
                  <img
                    src={current.image.secure_url}
                    alt={current?.title || "Hero banner"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                    No Image Available
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
