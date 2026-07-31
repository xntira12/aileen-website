"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import AnimatedBg from "../components/AnimatedBg";
import CustomerLogosHeader from "../components/CustomerLogosHeader";
import CustomerLogosMarquee from "../components/CustomerLogosMarquee";
import SectionDataOrbit from "../components/SectionDataOrbit";
import { useLocale } from "../i18n/LocaleProvider";
import { getNewsArticles } from "../i18n/messages";
import { ArticleCard, SectionHeading } from "../components/news/NewsComponents";
import HomeGavalonHighlight from "../components/HomeGavalonHighlight";
import SectionServiceAndSolutions from "../components/SectionServices";
import SectionStrengths from "../components/SectionStrengths";
import SectionLeaderVision from "../components/Sectionleadervision";
import SectionTeam from "../components/SectionTeam";
import SectionContactFooter from "../components/SectionContactFooter";

const logo = "/img/logo/aileen-logo.png";
const sloganImg = "/img/home/slogan.png";
const stBg = "/img/home/st-bg.jpg";

const LINE_STYLES = {
  muted: "text-white/50 text-xs lg:text-xl font-normal tracking-wide",
  bold: "text-white font-bold text-2xl lg:text-[50px]",
  boldLarge: "text-white font-bold text-4xl lg:text-7xl",
  boldMedium: "text-white text-xl lg:text-5xl mt-1 font-bold",
};

function HeroSlide({ slide }) {
  return (
    <p className="absolute inset-0 flex items-center lg:items-start flex-col justify-center w-full max-w-[38rem] pr-2 text-center lg:text-left leading-[1.15] tracking-[-0.01em]">
      {slide.lines.map((line, i) => (
        <span key={i} className={LINE_STYLES[line.className] ?? LINE_STYLES.muted}>
          {line.text}
          {line.highlight ? <em className="not-italic text-white">{line.highlight}</em> : null}
          {line.strong ? <strong className="text-white font-semibold">{line.strong}</strong> : null}
          {line.suffix ?? ""}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  const { locale, messages } = useLocale();
  const hero = messages.home?.hero ?? {};
  const newsSection = messages.home?.news ?? {};
  const homeNewsArticles = getNewsArticles(locale)
    .filter((article) => article.slug !== "npc-aileen-solutions-gavalon-partnership")
    .slice(0, 3);
  const slides = (hero.slides ?? []).map((slide, i) => <HeroSlide key={i} slide={slide} />);
  const slideCount = slides.length || 1;

  const [isLoaded, setIsLoaded]         = useState(false);
  const [isFading, setIsFading]         = useState(false);
  const [introPhase, setIntroPhase]     = useState("center");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating]   = useState(false);
  const [slideDir, setSlideDir]         = useState("up");
  const [carouselHovered, setCarouselHovered] = useState(false);
  const [navVisible, setNavVisible]     = useState(false);
  const autoRef    = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isLoaded) return;
    const t = setTimeout(() => setIntroPhase("split"), 400);
    return () => clearTimeout(t);
  }, [isLoaded]);

  useEffect(() => {
    if (introPhase !== "split") return;
    startAuto();
    return () => clearInterval(autoRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introPhase, currentSlide]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 60) setNavVisible(true);
      else if (y < lastScrollY.current) setNavVisible(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const f = setTimeout(() => setIsFading(true), 300);
    const l = setTimeout(() => setIsLoaded(true), 550);
    return () => { clearTimeout(f); clearTimeout(l); };
  }, []);

  function startAuto() {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => triggerSlide("next"), 7500);
  }

  function triggerSlide(dir) {
    if (isAnimating) return;
    clearInterval(autoRef.current);
    setSlideDir(dir === "next" ? "up" : "down");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(prev =>
        dir === "next" ? (prev + 1) % slideCount : (prev - 1 + slideCount) % slideCount
      );
      setIsAnimating(false);
      startAuto();
    }, 380);
  }

  const isSplit = introPhase === "split";

  return (
    <div id="home">
      {/* PRELOADER */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050d1a]"
          style={{ opacity: isFading ? 0 : 1, transition: "opacity 0.6s ease", pointerEvents: isFading ? "none" : "auto" }}>
          <img src={logo} alt="Aileen Solutions" className="mb-6 h-12 w-auto opacity-90"
            style={{ animation: "pulse 2s ease-in-out infinite" }} />
          <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 rounded-full bg-emerald-400"
              style={{ animation: "loadBar 1.8s ease-in-out infinite" }} />
          </div>
          <p className="mt-5 text-xs tracking-[0.25em] text-white/40 uppercase">{hero.loading}</p>
          <style>{`
            @keyframes pulse   { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
            @keyframes loadBar { 0%{left:-100%;width:60%} 50%{left:40%;width:60%} 100%{left:100%;width:60%} }
          `}</style>
        </div>
      )}

      {/* Navbar */}
      <div
        className="navbar-wrapper fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
        style={{ transform: navVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <style>{`@media (min-width: 1024px) { .navbar-wrapper { transform: translateY(0) !important; } }`}</style>
        <Navbar />
      </div>

      {/* HERO + customers */}
      <section className="hero-home relative w-full bg-white">

        <div className="hero-dark relative min-h-[110vh]">
          {/* ── Full background: canvas + gradient curtain reveal ── */}
          <div className={`hero-bg-stack absolute inset-0 z-0 overflow-hidden ${isLoaded ? "is-open" : ""}`}>
            <AnimatedBg />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/25" />
          </div>

          <div
            className="relative z-10 flex min-h-[110vh] flex-col items-center justify-center px-6 pb-36 pt-20 lg:pb-40 lg:pt-24"
            style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.7s ease 0.35s" }}
          >
          <div className="flex w-full max-w-6xl flex-col items-center gap-6 lg:gap-8">

              {/* Logo + brand – desktop only */}
              <div className="hidden lg:flex items-center justify-center gap-3">
                <img src={logo} alt="Aileen Solutions" className="h-10 w-auto" />
                <span className="text-sm font-semibold tracking-widest text-white/90">{hero.brandName}</span>
              </div>

              {/* Center group: slogan + carousel */}
              <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-center lg:gap-0">

                {/* Slogan */}
                <div
                  className="flex w-full justify-center lg:w-[65%] lg:pr-10"
                  style={{
                    transform: isSplit ? "translateX(0)" : "translateX(27%)",
                    transition: isSplit ? "transform 0.75s cubic-bezier(0.4,0,0.2,1)" : "none",
                  }}
                >
                  <img src={sloganImg} alt={hero.sloganAlt} className="w-full" />
                </div>

                {/* Divider – desktop only */}
                <div
                  className="hidden lg:block lg:h-64 lg:w-px lg:flex-shrink-0"
                  style={{
                    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.28) 20%, rgba(255,255,255,0.28) 80%, transparent)",
                    opacity: isSplit ? 1 : 0,
                    transform: isSplit ? "scaleY(1)" : "scaleY(0.1)",
                    transformOrigin: "center",
                    transition: "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s",
                  }}
                />

                {/* Carousel – desktop only */}
                <div
                  className="hidden lg:flex w-full flex-col items-center lg:w-[35%] lg:items-start lg:pl-10"
                  style={{
                    opacity: isSplit ? 1 : 0,
                    transform: isSplit ? "translateX(0)" : "translateX(-36px)",
                    transition: "opacity 0.45s ease 0.1s, transform 0.45s cubic-bezier(0.2,0,0.2,1) 0.1s",
                    pointerEvents: isSplit ? "auto" : "none",
                  }}
                  onMouseEnter={() => setCarouselHovered(true)}
                  onMouseLeave={() => setCarouselHovered(false)}>
                  <div className="relative h-[180px] w-full overflow-hidden"
                    style={{ transform: carouselHovered ? "translateY(0)" : "translateY(14px)", transition: "transform 0.3s ease-out" }}>
                    <div key={currentSlide}
                      style={{ animation: isAnimating ? `slideOut${slideDir === "up" ? "Up" : "Down"} 0.38s ease forwards` : `slideIn${slideDir === "up" ? "Up" : "Down"} 0.38s ease forwards`, position: "absolute", inset: 0 }}>
                      {slides[currentSlide]}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 self-center lg:self-start"
                    style={{ opacity: carouselHovered ? 1 : 0, transform: carouselHovered ? "translateY(0)" : "translateY(4px)", transition: "opacity 0.3s ease, transform 0.3s ease", pointerEvents: carouselHovered ? "auto" : "none" }}>
                    <button onClick={() => triggerSlide("prev")} aria-label="Previous"
                      className="flex items-center gap-1 py-0.5 px-1.5 text-white/30 transition-colors hover:text-white/70">
                      <svg viewBox="0 0 8 12" fill="none" className="h-2 w-1.5 flex-shrink-0">
                        <path d="M6.5 1L1.5 6L6.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-widest">{hero.prev}</span>
                    </button>
                    <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
                    <button onClick={() => triggerSlide("next")} aria-label="Next"
                      className="flex items-center gap-1 py-0.5 px-1.5 text-white/30 transition-colors hover:text-white/70">
                      <span className="text-[10px] uppercase tracking-widest">{hero.next}</span>
                      <svg viewBox="0 0 8 12" fill="none" className="h-2 w-1.5 flex-shrink-0">
                        <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Carousel + divider + description – mobile only */}
                <div
                  className="flex lg:hidden flex-col w-full gap-4"
                  style={{ opacity: isSplit ? 1 : 0, transition: "opacity 0.45s ease 0.2s" }}
                >
                  <div className="relative h-[120px] w-full overflow-hidden">
                    <div key={currentSlide}
                      style={{ animation: isAnimating ? `slideOut${slideDir === "up" ? "Up" : "Down"} 0.38s ease forwards` : `slideIn${slideDir === "up" ? "Up" : "Down"} 0.38s ease forwards`, position: "absolute", inset: 0 }}>
                      {slides[currentSlide]}
                    </div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <p className="text-xs leading-relaxed text-white/70 text-center">
                    {hero.description}
                  </p>
                </div>

              </div>

              {/* Description + Buttons */}
              <div className="flex flex-col items-center text-center w-full gap-3 lg:gap-4">
                {/* Description – desktop only */}
                <p className="hidden lg:block mx-auto max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
                  {hero.description}
                </p>
                {/* Desktop buttons */}
                <div className="hidden lg:flex justify-center gap-4">
                  <a href="/about" className="btn-fancy group relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-white/5 px-8 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15">
                    <span className="relative z-10">{hero.getToKnowUs}</span>
                    <svg className="w-3.5 shrink-0 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                  <a href="/contact" className="btn-fancy group relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-white/5 px-8 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15">
                    <span className="relative z-10">{hero.contactUs}</span>
                    <svg className="w-3.5 shrink-0 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                </div>
                {/* Mobile buttons – stacked, full width */}
                <div className="flex lg:hidden flex-col w-full gap-3 pb-2">
                  <a href="/about" className="btn-fancy group relative inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-white/5 px-4 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15">
                    <span className="relative z-10">{hero.getToKnowUs}</span>
                    <svg className="w-3.5 text-white shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                  <a href="/contact" className="btn-fancy group relative inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-white/5 px-4 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15">
                    <span className="relative z-10">{hero.contactUs}</span>
                    <svg className="w-3.5 text-white shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                </div>
              </div>

          </div>
          </div>

          {/* curved bottom — overlays dark bg, no gap */}
          <div className="hero-curve-edge pointer-events-none absolute bottom-0 left-0 right-0 z-[15] leading-[0]">
            <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="hero-curve-svg block w-full" aria-hidden="true">
              <path d="M0,0 Q720,150 1440,0 L1440,160 L0,160 Z" fill="white" />
            </svg>
          </div>
        </div>

      </section>

      <div className="section-surface-gradient relative">
        {isLoaded ? (
          <div className="hero-customers-wrap relative z-20 pb-14 pt-6 sm:pb-16 sm:pt-8">
            <div className="mx-auto max-w-7xl px-6">
              <CustomerLogosHeader revealed />
            </div>
            <div className="hero-logos-band mt-0">
              <CustomerLogosMarquee revealed active variant="hero" />
            </div>
          </div>
        ) : null}

        <style>{`
        .hero-bg-stack {
          transform-origin: top center;
          transform: scaleY(0);
          will-change: transform;
        }
        .hero-bg-stack.is-open {
          animation: heroCurtainDown 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes heroCurtainDown {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        @keyframes slideInUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideOutUp   { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-28px)} }
        @keyframes slideInDown  { from{opacity:0;transform:translateY(-28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideOutDown { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(28px)} }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg-stack {
            transform: scaleY(1);
            animation: none !important;
          }
        }
      `}</style>
        <section className="py-0 bg-transparent">
        <SectionDataOrbit />
        </section>
      </div>
      <section id="service" className="relative isolate overflow-hidden strength-dark py-0">
        <img src={stBg} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover opacity-60" />
        <div className="strength-dark__bg pointer-events-none absolute inset-0 -z-20" />
        <SectionServiceAndSolutions />
        <div className="relative z-10 flex w-full justify-center px-6 py-10 md:py-14">
          <div className="svs-sec-div w-full max-w-6xl !m-0" aria-hidden="true">
            <div className="svs-sec-div-line" />
            <div className="svs-sec-div-icon" />
            <div className="svs-sec-div-line" />
          </div>
        </div>
        <SectionStrengths />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[60] leading-[0]" style={{ transform: "translateY(1px)" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full" style={{ height: "80px" }} aria-hidden="true">
            <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>
      <section id="leaderVision" className="-mt-px py-0 bg-white"><SectionLeaderVision /></section>
      <section id="team" className="py-0 bg-slate-50"><SectionTeam /></section>
      <section id="news" className="bg-white py-0">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
          <SectionHeading
            eyebrow={newsSection.eyebrow}
            title={newsSection.title}
            description={newsSection.description}
          />
          <HomeGavalonHighlight />
          {homeNewsArticles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {homeNewsArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : null}
          <div className="mt-8 flex justify-center">
            <a
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
            >
              {newsSection.viewAll}
              <span className="text-base leading-none">›</span>
            </a>
          </div>
        </div>
      </section>
      <section id="contact" className=""><SectionContactFooter /></section>
    </div>
  );
} 
