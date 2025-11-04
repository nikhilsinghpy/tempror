import DynamicIcon from "@/components/ui/dynamic-icon";
import { ArrowRight } from "lucide-react";
import React from "react";

export default function HeroSectionNonAnimate({
  heroImage,
  title,
  intro,
  CTA,
  badge: { icon, text },
  features = [],
}) {
  const Icon = icon;
  console.log(CTA);
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-8">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
              <Icon className="h-4 w-4" />
              {text}
            </p>
            <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-4 text-slate-600 text-[12px] md:text-sm">
              {intro}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {CTA?.map((item, index) => (
                <a
                  key={index}
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
                      item.type === "primary" ? "text-white" : "text-slate-900"
                    }`}
                    name={item.icon}
                  />
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-slate-600">
              {features.map((item, index) => (
                <span className="inline-flex items-center gap-2" key={index}>
                  <DynamicIcon className={`ml-2 h-4 w-4 `} name={item.icon} />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <img
                src={heroImage}
                alt="Lifestyle product banner"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
