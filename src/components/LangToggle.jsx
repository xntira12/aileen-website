"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function LangToggle({ scrolled }) {
  const { locale, toggleLocale } = useLocale();
  const trackBgInactive = scrolled ? "bg-slate-300" : "bg-white/30";
  const trackBg = locale === "en" ? "bg-[#27b7a6]" : trackBgInactive;
  const labelColorInactive = scrolled ? "text-slate-500" : "text-white/80";
  const labelColor = locale === "en" ? "text-white/80" : labelColorInactive;

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
      className={`relative h-7 w-[52px] shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${trackBg}`}
    >
      <span
        className={`absolute left-[3px] top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-md transition-transform duration-300 ${
          locale === "en" ? "translate-x-[24px]" : "translate-x-0"
        }`}
      />
      <span
        className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-bold leading-none transition-all duration-300 ${labelColor} ${
          locale === "en" ? "left-[9px]" : "right-[9px]"
        }`}
      >
        {locale === "th" ? "EN" : "TH"}
      </span>
    </button>
  );
}
