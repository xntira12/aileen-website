"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useLocale } from "../i18n/LocaleProvider";

const homeVideo = "/video/main-bg.mp4";

export default function ServicePlaceholder({ serviceKey }) {
  const router = useRouter();
  const { messages } = useLocale();
  const copy = messages.servicePlaceholder ?? {};
  const serviceItem = messages.home?.services?.items?.find((item) => item.id === serviceKey);
  const title = serviceItem?.title ?? "";
  const summary = serviceItem ? `${serviceItem.summary} ${serviceItem.detail ?? ""}`.trim() : "";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          zIndex: 49,
          pointerEvents: "none",
          background: "linear-gradient(to bottom,rgba(6,10,20,.88),rgba(6,10,20,.4) 60%,transparent)",
        }}
      />
      <Navbar />

      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover">
          <source src={homeVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.8),rgba(6,78,59,0.4))]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center px-6 py-28">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-[0_30px_120px_rgba(2,6,23,0.45)] backdrop-blur-xl md:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            {copy.badge}
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200/80 md:text-lg">{summary}</p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/30 p-6">
            <p className="text-sm leading-7 text-slate-300">{copy.bodyNote}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => router.push("/service")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              {copy.backToServices}
            </button>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              {copy.contactUs}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
