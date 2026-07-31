"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export default function ContactButton({ href = "/contact", className = "" }) {
  const { t } = useLocale();

  return (
    <a
      href={href}
      style={{
        background: "linear-gradient(270deg, #4db6ac 0%, #00838f 100% )",
      }}
      className={[
        "btn-fancy inline-flex items-center gap-2 rounded-full px-5 py-2.5",
        "text-white text-base  hover:opacity-95 hover:scale-105 transition",
        className,
      ].join(" ")}
    >
      {t("common.nav.contact")}{" "}
      <svg
        className="w-3.5 text-white dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  );
}
