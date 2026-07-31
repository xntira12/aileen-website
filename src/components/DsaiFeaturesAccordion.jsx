"use client";

import { useState } from "react";

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DsaiFeaturesAccordion({ features = [], accordion = {} }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">

          <div>
            <span className="lv8-pill">
              <span className="lv8-hdot" />
              {accordion.eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
              {accordion.title}
              <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                {accordion.titleHighlight}
              </span>
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-500">
              {accordion.description}
            </p>
          </div>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`overflow-hidden rounded-[14px] border transition-all duration-200 ${
                  openIndex === index
                    ? "border-slate-200 bg-white"
                    : "border-slate-200/70 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => toggle(index)}
                  aria-expanded={openIndex === index}
                >
                  <div className="min-w-0">
                    <span className="inline-flex items-center rounded-full bg-slate-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-600">
                      {feature.eyebrow}
                    </span>
                    <h3 className="mt-2.5 text-base font-medium leading-6 tracking-tight text-slate-800">
                      {feature.title}
                    </h3>
                  </div>
                  <ChevronIcon open={openIndex === index} />
                </button>

                <div
                  style={{
                    maxHeight: openIndex === index ? "300px" : "0px",
                    opacity: openIndex === index ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, opacity 0.25s ease",
                  }}
                >
                  <div className="px-5 pb-5">
                    <div className="mb-3 h-px bg-slate-100" />
                    <p className="text-sm leading-7 text-slate-500 md:text-[14px]">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
