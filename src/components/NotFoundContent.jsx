"use client";

import Link from "next/link";
import { useLocale } from "../i18n/LocaleProvider";

export default function NotFoundContent() {
  const { messages } = useLocale();
  const nf = messages.common?.notFound ?? {};

  return (
    <div className="min-h-screen bg-[#060A14] flex flex-col items-center justify-center text-white text-center px-6">
      <p className="text-7xl font-bold text-white/10">404</p>
      <h1 className="mt-4 text-2xl font-semibold">{nf.title}</h1>
      <p className="mt-2 text-sm text-white/50">{nf.description}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
      >
        {nf.backHome}
      </Link>
    </div>
  );
}
