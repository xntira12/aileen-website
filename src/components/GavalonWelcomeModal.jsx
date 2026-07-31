"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gavalonHighlightImg from "../assets/img/gavalon/GAVALON-2 (1).png";
import { useLocale } from "@/i18n/LocaleProvider";

const ARTICLE_SLUG = "npc-aileen-solutions-gavalon-partnership";

export default function GavalonWelcomeModal() {
  const { messages } = useLocale();
  const copy = messages.home?.gavalonHighlight ?? {};

  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const showTimer = window.setTimeout(() => setShow(true), 200);
    return () => window.clearTimeout(showTimer);
  }, [mounted]);

  const close = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [show, close]);

  if (!mounted || !show) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={copy.imageAlt ?? "GAVALON"}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[3px]"
        aria-label={copy.close ?? "Close"}
        onClick={close}
      />

      <div className="relative z-[1] w-full max-w-3xl animate-[gavalonModalIn_280ms_ease-out] md:max-w-4xl">
        <button
          type="button"
          onClick={close}
          className="absolute -right-1 -top-1 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-slate-900/80 text-lg text-white backdrop-blur transition hover:bg-slate-900 sm:right-0 sm:top-0 sm:-translate-y-1/2 sm:translate-x-1/2"
          aria-label={copy.close ?? "Close"}
        >
          ×
        </button>

        <img
          src={gavalonHighlightImg.src}
          alt={copy.imageAlt ?? "GAVALON"}
          className="mx-auto max-h-[min(68vh,620px)] w-full rounded-2xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-3xl"
        />

        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={`/news/${ARTICLE_SLUG}`}
            onClick={close}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100 sm:w-auto"
          >
            {copy.readMore ?? "อ่านเพิ่มเติม"}
            <span aria-hidden>→</span>
          </a>
          <button
            type="button"
            onClick={close}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-teal-300 bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95 sm:w-auto"
          >
            {copy.visitSite ?? "เข้าสู่เว็บไซต์"}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes gavalonModalIn {
          from { opacity: 0; transform: scale(0.97) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body,
  );
}
