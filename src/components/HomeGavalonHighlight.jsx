"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { getNewsArticle } from "@/i18n/messages";

const ARTICLE_SLUG = "workshop-gavalon-legal-management-system-2026";

export default function HomeGavalonHighlight() {
  const { locale, messages } = useLocale();
  const copy = messages.home?.gavalonHighlight ?? {};
  const article = getNewsArticle(locale, ARTICLE_SLUG);

  if (!article) return null;

  const heroImage = article.media?.heroImage;
  const registrationUrl = article.registrationUrl;

  return (
    <div className="mb-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:mb-12 md:rounded-[32px]">
      <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[220px] bg-slate-100 sm:min-h-[280px] lg:min-h-full">
          {heroImage ? (
            <img
              src={heroImage}
              alt={copy.imageAlt ?? article.media?.heroAlt ?? "GAVALON Workshop"}
              className="absolute inset-0 h-full w-full object-contain object-center p-2 sm:p-3"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-900/10" />
        </div>

        <div className="flex flex-col justify-center px-6 py-7 md:px-8 md:py-9 lg:px-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            {copy.eyebrow ?? article.category}
          </span>

          <h3 className="mt-4 text-2xl font-bold leading-[1.3] tracking-[-0.02em] text-slate-900 md:text-[1.75rem] md:leading-[1.28]">
            {copy.title ?? article.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600 md:text-[15px]">
            {copy.description ?? article.summary}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`/news/${ARTICLE_SLUG}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {copy.readArticle ?? copy.readMore ?? "อ่านเพิ่มเติม"}
              <span aria-hidden>→</span>
            </a>
            {registrationUrl ? (
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-teal-300 bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95"
              >
                {copy.registerWorkshop ?? "ลงทะเบียน Workshop"}
                <span aria-hidden>→</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
