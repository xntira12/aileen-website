import Link from "next/link";

export const CATEGORY_FILTERS = [
  { id: "all", label: "ทั้งหมด" },
  { id: "Event Highlight", label: "กิจกรรม" },
  { id: "Conference", label: "งานประชุม" },
  { id: "Seminar", label: "สัมมนา" },
];

const CATEGORY_THEME = {
  "Event Highlight": {
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    glow: "bg-emerald-400/20",
    badge: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
    ring: "group-hover:border-emerald-300/30",
    link: "text-emerald-200",
  },
  Conference: {
    gradient: "from-cyan-500/30 via-sky-500/10 to-transparent",
    glow: "bg-cyan-400/20",
    badge: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
    ring: "group-hover:border-cyan-300/30",
    link: "text-cyan-200",
  },
  Seminar: {
    gradient: "from-sky-500/30 via-blue-500/10 to-transparent",
    glow: "bg-sky-400/20",
    badge: "border-sky-300/25 bg-sky-400/10 text-sky-100",
    ring: "group-hover:border-sky-300/30",
    link: "text-sky-200",
  },
};

export function getCategoryTheme(category) {
  return (
    CATEGORY_THEME[category] ?? {
      gradient: "from-white/10 via-white/5 to-transparent",
      glow: "bg-white/10",
      badge: "border-white/15 bg-white/10 text-slate-100",
      ring: "group-hover:border-white/25",
      link: "text-cyan-200",
    }
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.75)]" />
          {eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{title}</h2>
      </div>
      {description ? (
        <p className="max-w-xl text-sm leading-7 text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-cyan-300/70" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-cyan-300/70" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 18s5-4.5 5-9a5 5 0 1 0-10 0c0 4.5 5 9 5 9Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="10" cy="9" r="1.8" fill="currentColor" />
    </svg>
  );
}

function MetaRow({ article }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
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

export function ArticleCover({ article, tall = false, className = "" }) {
  const theme = getCategoryTheme(article.category);
  const height = tall ? "min-h-[220px] md:min-h-[300px]" : "min-h-[180px]";

  if (article.media?.heroImage) {
    return (
      <div
        className={[
          "relative overflow-hidden rounded-[24px] border border-white/10",
          height,
          className,
        ].join(" ")}
      >
        <img
          src={article.media.heroImage}
          alt={article.media.heroAlt || article.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101d]/80 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a1628]",
        height,
        className,
      ].join(" ")}
    >
      <div className={`absolute -right-8 -top-8 h-40 w-40 rounded-full blur-3xl ${theme.glow}`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative flex h-full flex-col justify-end p-5 md:p-6">
        <span
          className={[
            "inline-flex w-fit rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
            theme.badge,
          ].join(" ")}
        >
          {article.category}
        </span>
        <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-white/90">{article.location}</p>
      </div>
    </div>
  );
}

export function ArticleCard({ article, featured = false }) {
  const theme = getCategoryTheme(article.category);

  return (
    <Link
      href={`/news/${article.slug}`}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]",
        theme.ring,
        featured ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      <ArticleCover article={article} tall={featured} className="rounded-none border-0 border-b border-white/10" />

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <span
            className={[
              "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
              theme.badge,
            ].join(" ")}
          >
            {article.category}
          </span>
          {featured ? (
            <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100">
              ข่าวเด่น
            </span>
          ) : null}
        </div>

        <MetaRow article={article} />

        <h3
          className={[
            "mt-4 font-semibold leading-snug text-white",
            featured ? "text-2xl md:text-3xl" : "text-xl",
          ].join(" ")}
        >
          {article.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-slate-300 line-clamp-3">{article.summary}</p>

        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${theme.link}`}>
          อ่านต่อ
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

export function FeaturedArticle({ article }) {
  const theme = getCategoryTheme(article.category);

  return (
    <article className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(3,7,18,0.35)] backdrop-blur">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <div className="relative min-h-[320px] overflow-hidden lg:min-h-[480px]">
          {article.media?.heroImage ? (
            <img
              src={article.media.heroImage}
              alt={article.media.heroAlt || article.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <div className={`absolute -left-10 top-10 h-56 w-56 rounded-full blur-3xl ${theme.glow}`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06101d] via-[#06101d]/40 to-transparent lg:bg-gradient-to-r lg:from-[#06101d] lg:via-[#06101d]/50 lg:to-transparent" />

          <div className="relative flex h-full flex-col justify-end p-6 md:p-8 lg:p-10">
            <span
              className={[
                "inline-flex w-fit rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
                theme.badge,
              ].join(" ")}
            >
              {article.category}
            </span>

            <MetaRow article={article} />

            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-4xl lg:text-5xl">
              {article.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">{article.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {article.highlights.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs text-slate-100"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                อ่านข่าวฉบับเต็ม
              </Link>
              <a
                href="#all-news"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
              >
                ดูข่าวทั้งหมด
              </a>
            </div>
          </div>
        </div>

        <div className="hidden border-l border-white/10 bg-black/10 p-6 lg:block lg:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">ไฮไลต์</p>
          <ul className="mt-5 space-y-4">
            {article.highlights.map((item, index) => (
              <li key={item} className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm leading-7 text-slate-200">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function GalleryTile({ title, ratio = "wide", category = "Conference" }) {
  const theme = getCategoryTheme(category);
  const height =
    ratio === "portrait" ? "min-h-[240px] md:min-h-[300px]" : "min-h-[220px] md:min-h-[280px]";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a1628]",
        height,
      ].join(" ")}
    >
      <div className={`absolute -right-6 top-6 h-32 w-32 rounded-full blur-3xl ${theme.glow}`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="relative flex h-full items-end p-5">
        <p className="text-sm font-medium leading-6 text-white/90">{title}</p>
      </div>
    </div>
  );
}

export function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORY_FILTERS.map((filter) => {
        const isActive = active === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium transition duration-300",
              isActive
                ? "border-cyan-300/40 bg-cyan-400/15 text-white shadow-[0_0_24px_rgba(34,211,238,0.12)]"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
            ].join(" ")}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}