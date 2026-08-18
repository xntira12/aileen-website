"use client";

import Link from "next/link";
import { useLocale } from "../../i18n/LocaleProvider";
import { getNewsArticles } from "../../i18n/messages";

export function getCategoryTheme(category) {
  const CATEGORY_THEME = {
    "Event Highlight": {
      badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
      accent: "bg-emerald-500",
      surface: "from-emerald-50 via-white to-teal-50",
      ring: "hover:border-emerald-200",
      link: "text-emerald-700",
    },
    Conference: {
      badge: "border-sky-200 bg-sky-50 text-sky-700",
      accent: "bg-sky-500",
      surface: "from-sky-50 via-white to-cyan-50",
      ring: "hover:border-sky-200",
      link: "text-sky-700",
    },
    Seminar: {
      badge: "border-amber-200 bg-amber-50 text-amber-700",
      accent: "bg-amber-500",
      surface: "from-amber-50 via-white to-orange-50",
      ring: "hover:border-amber-200",
      link: "text-amber-700",
    },
  };

  return (
    CATEGORY_THEME[category] ?? {
      badge: "border-slate-200 bg-slate-100 text-slate-700",
      accent: "bg-slate-500",
      surface: "from-slate-50 via-white to-slate-100",
      ring: "hover:border-slate-200",
      link: "text-slate-700",
    }
  );
}

export function SectionHeading({ eyebrow, title, description, compact = false }) {
  return (
    <div
      className={[
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        compact ? "mb-6 md:mb-7" : "mb-8 md:mb-10",
      ].join(" ")}
    >
      <div className="max-w-2xl">
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white font-semibold uppercase text-sky-700",
            compact ? "px-3.5 py-1.5 text-[10px] tracking-[0.18em]" : "px-4 py-2 text-[11px] tracking-[0.22em]",
          ].join(" ")}
        >
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          {eyebrow}
        </span>
        <h2
          className={[
            "font-semibold tracking-[-0.03em] text-slate-900",
            compact ? "mt-3 text-2xl md:text-[2rem]" : "mt-4 text-3xl md:text-4xl",
          ].join(" ")}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p
          className={[
            "text-slate-600",
            compact ? "max-w-lg text-sm leading-6" : "max-w-xl text-sm leading-7 md:text-base",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 18s5-4.5 5-9a5 5 0 1 0-10 0c0 4.5 5 9 5 9Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="10" cy="9" r="1.8" fill="currentColor" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8h9m0 0-3.5-3.5M12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetaRow({ article, className = "" }) {
  return (
    <div
      className={
        className || "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500"
      }
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarIcon />
        {article.date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <PinIcon />
        {article.location}
      </span>
    </div>
  );
}

export function ArticleCover({ article, tall = false, compact = false, className = "" }) {
  const theme = getCategoryTheme(article.category);
  const height = tall
    ? "h-full min-h-[240px] md:min-h-[320px]"
    : compact
      ? "h-[220px]"
      : "h-[260px]";

  if (article.media?.heroImage) {
    return (
      <div
        className={[
          "relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100",
          height,
          className,
        ].join(" ")}
      >
        <img
          src={article.media.heroImage}
          alt={article.media.heroAlt || article.title}
          className="h-full w-full object-cover"
          style={{
            ...(article.media.heroObjectPosition
              ? { objectPosition: article.media.heroObjectPosition }
              : {}),
            ...(article.media.heroImageScale
              ? {
                  transform: `scale(${article.media.heroImageScale})`,
                  transformOrigin: article.media.heroObjectPosition || "center",
                }
              : {}),
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br",
        theme.surface,
        height,
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.09)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative flex h-full items-end p-5 md:p-6">
        <div>
          <div className={`mb-4 h-1.5 w-16 rounded-full ${theme.accent}`} />
          <p className="max-w-sm text-sm font-medium leading-6 text-slate-700">{article.location}</p>
        </div>
      </div>
    </div>
  );
}

export function ArticleCard({ article, featured = false, compact = false }) {
  const { locale, messages } = useLocale();
  const componentsCopy = messages.news?.components ?? {};
  const theme = getCategoryTheme(article.category);
  const metaClassName = compact
    ? "mt-0 flex flex-col items-start gap-1.5 text-[13px] leading-5 text-slate-500"
    : undefined;

  return (
    <Link
      href={`/news/${article.slug}`}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1",
        theme.ring,
        featured ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      <ArticleCover
        article={article}
        tall={featured}
        compact={compact}
        className="rounded-none border-0 border-b border-slate-200"
      />

      <div className={["flex flex-1 flex-col", compact ? "p-4 md:p-5" : "p-5 md:p-6"].join(" ")}>
        <MetaRow article={article} className={metaClassName} />

        <h3
          className={[
            "font-semibold text-slate-900",
            featured
              ? "mt-4 text-2xl leading-snug md:text-3xl"
              : compact
                ? "mt-3 min-h-[3.4rem] text-[1.08rem] leading-[1.55rem] line-clamp-2"
                : "mt-4 text-xl leading-snug",
          ].join(" ")}
        >
          {article.title}
        </h3>

        <p
          className={[
            "flex-1 text-sm text-slate-600",
            compact ? "mt-3 min-h-[4.6rem] leading-6 line-clamp-3" : "mt-3 leading-7 line-clamp-3",
          ].join(" ")}
        >
          {article.summary}
        </p>

        <span
          className={[
            "inline-flex items-center gap-2 text-sm font-semibold",
            theme.link,
            compact ? "mt-5" : "mt-5",
          ].join(" ")}
        >
          {componentsCopy.readMore}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRightIcon />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function FeaturedArticle({ article }) {
  const { messages } = useLocale();
  const componentsCopy = messages.news?.components ?? {};

  return (
    <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)]">
        <ArticleCover
          article={article}
          tall
          className="rounded-none border-0 border-b border-slate-200 lg:border-b-0 lg:border-r"
        />

        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <MetaRow article={article} />

            <h3 className="mt-4 text-3xl font-semibold leading-[1.28] tracking-[-0.04em] text-slate-900 md:text-4xl md:leading-[1.25]">
              {article.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">{article.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {article.highlights?.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {componentsCopy.readFull}
            </Link>
            <a
              href="#all-news"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {componentsCopy.otherNews}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function GalleryTile({ title, ratio = "wide", category = "Conference", image, alt, onOpen }) {
  const { messages } = useLocale();
  const componentsCopy = messages.news?.components ?? {};
  const theme = getCategoryTheme(category);
  const height =
    ratio === "portrait" ? "min-h-[240px] md:min-h-[300px]" : "min-h-[220px] md:min-h-[260px]";

  if (image) {
    const content = (
      <>
        <img
          src={image}
          alt={alt || title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-slate-950/0 transition duration-300 group-hover:bg-slate-950/10" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5 md:p-6">
          <p className="text-sm font-medium leading-6 text-white">{title}</p>
        </div>
      </>
    );

    if (onOpen) {
      return (
        <button
          type="button"
          onClick={onOpen}
          className={[
            "group relative block w-full overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 text-left",
            height,
          ].join(" ")}
          aria-label={`${componentsCopy.viewImage}: ${alt || title}`}
        >
          {content}
        </button>
      );
    }

    return (
      <a
        href={image}
        target="_blank"
        rel="noopener noreferrer"
        className={["group relative block overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100", height].join(" ")}
        aria-label={`${componentsCopy.viewImage}: ${alt || title}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br",
        theme.surface,
        height,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.09)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="relative flex h-full items-end p-5 md:p-6">
        <div>
          <div className={`mb-3 h-1.5 w-12 rounded-full ${theme.accent}`} />
          <p className="text-sm font-medium leading-6 text-slate-700">{title}</p>
        </div>
      </div>
    </div>
  );
}
