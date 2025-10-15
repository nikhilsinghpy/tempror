import { ArrowRight } from "lucide-react";
import React from "react";

export default function HeroSectionNonAnimate({
  heroImage,
  title,
  intro,
  CTA,
  badge: { icon, text },
  contact = [],
}) {
  const Icon = icon;
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
              <a
                href={CTA.href}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium hover:bg-slate-800"
              >
                {CTA.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-slate-600">
              {contact.map((item, index) => (
                <span className="inline-flex items-center gap-2" key={index}>
                  <item.icon className="h-4 w-4" />
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
