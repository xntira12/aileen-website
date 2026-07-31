"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ContactButton from "./ContactButton";
import { LangToggle } from "./LangToggle";
import { useLocale } from "@/i18n/LocaleProvider";
import gvlLogo from "@/assets/img/gavalon/GVL-logo.png";

const logo = "/img/logo/aileen-logo.png";
const PMT = "/img/home/productsSolutions/PMT.svg";
const RPA = "/img/home/productsSolutions/RPA.svg";
const AI = "/img/home/productsSolutions/AI.svg";
const LPM = "/img/home/productsSolutions/LPM.svg";
const QMS = "/img/home/productsSolutions/QMS.svg";
const GVL = gvlLogo.src;

const SERVICE_ICONS = { pmp: PMT, rpa: RPA, dsai: AI, lcbo: LPM, qmp: QMS, gvl: GVL };

function ThemeToggle({ dark, onToggle, scrolled }) {
  let trackBg;
  if (dark) trackBg = "bg-slate-600";
  else if (scrolled) trackBg = "bg-slate-300";
  else trackBg = "bg-white/30";

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className={`relative h-7 w-[52px] shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${trackBg}`}
    >
      <span
        className={`absolute left-[3px] top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-md transition-transform duration-300 ${
          dark ? "translate-x-[24px]" : "translate-x-0"
        }`}
      />
      <span
        className={`absolute top-1/2 -translate-y-1/2 text-xs leading-none transition-all duration-300 ${
          dark ? "left-[9px]" : "right-[9px]"
        }`}
      >
        {dark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

function Chevron({ open, className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceMenuItem({ item, onClick, mobile = false, open = true, delayMs = 0 }) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      className={[
        "group relative flex items-start gap-3 rounded-2xl border border-transparent transition-all duration-300",
        mobile
          ? "px-3 py-3 hover:border-slate-200 hover:bg-slate-100"
          : "w-full px-3 py-3 hover:-translate-y-0.5 hover:border-sky-100 hover:bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(240,249,255,0.95))] hover:shadow-[0_10px_24px_rgba(14,165,233,0.08)]",
        open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <span className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-gradient-to-b from-sky-400 to-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:scale-[1.05] group-hover:border-sky-200 group-hover:shadow-[0_8px_20px_rgba(56,189,248,0.18)]">
        <img src={item.icon} alt="" className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-sky-700">
          {item.title}
        </h3>
        <p className="mt-1 text-sm leading-5 text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
          {item.summary}
        </p>
      </div>
    </a>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { messages, t } = useLocale();
  const navRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setDesktopServicesOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setDesktopServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) setMobileServicesOpen(false);
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDesktopServices = () => {
    clearCloseTimer();
    setDesktopServicesOpen(true);
  };

  const closeDesktopServicesSoon = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setDesktopServicesOpen(false);
    }, 180);
  };

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const menu = [
    { label: t("common.nav.home"), href: "/" },
    { label: t("common.nav.about"), href: "/about" },
    { label: t("common.nav.services"), href: "/service" },
    { label: t("common.nav.customers"), href: "/customers" },
    { label: t("common.nav.news"), href: "/news" },
  ];

  const serviceItems = (messages.common?.serviceItems ?? []).map((item) => ({
    ...item,
    icon: SERVICE_ICONS[item.id] ?? PMT,
  }));
  const splitIndex = Math.ceil(serviceItems.length / 2);
  const desktopServiceColumns = [
    serviceItems.slice(0, splitIndex),
    serviceItems.slice(splitIndex),
  ];

  const forceSolidNav = pathname?.startsWith("/news");
  const useSolidNav = scrolled || forceSolidNav;
  const menuText = useSolidNav ? "text-slate-700" : "text-slate-200";
  const menuHover = "hover:text-[#27b7a6]";
  const textColor = useSolidNav ? "text-slate-900" : "text-white";
  const navBg = useSolidNav ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent";

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50">
      <nav className={`${navBg} transition-all duration-300`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="AILEEN logo" className="h-11 w-auto" />
            <span className={`engFonts text-medium font-medium ${textColor}`}>AILEEN</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm font-medium tracking-wide transition-colors md:flex">
            {menu.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  if (item.href === "/service") openDesktopServices();
                }}
                onMouseLeave={() => {
                  if (item.href === "/service") closeDesktopServicesSoon();
                }}
              >
                {item.href === "/service" ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={desktopServicesOpen}
                      aria-haspopup="true"
                      onClick={() => setDesktopServicesOpen((prev) => !prev)}
                      onFocus={openDesktopServices}
                      className={[
                        "inline-flex items-center gap-1.5 font-medium transition-colors",
                        menuHover,
                        desktopServicesOpen ? "text-[#27b7a6]" : menuText,
                      ].join(" ")}
                    >
                      <span>{item.label}</span>
                      <Chevron open={desktopServicesOpen} />
                    </button>

                    <div
                      className={[
                        "absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3 transition-all duration-300",
                        desktopServicesOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0 pointer-events-none",
                      ].join(" ")}
                      style={{ width: "min(92vw, 680px)" }}
                      onMouseEnter={openDesktopServices}
                      onMouseLeave={closeDesktopServicesSoon}
                    >
                      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
                        <div className="mb-3 px-2">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{t("common.nav.servicesDropdown")}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {desktopServiceColumns.map((column, columnIndex) => (
                            <div
                              key={`col-${columnIndex}`}
                              className="flex flex-col gap-1 rounded-2xl bg-slate-50/70 p-2"
                            >
                              {column.map((service, itemIndex) => (
                                <ServiceMenuItem
                                  key={service.id}
                                  item={service}
                                  open={desktopServicesOpen}
                                  delayMs={80 + (columnIndex * 4 + itemIndex) * 35}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <a className={`${menuText} ${menuHover} transition-colors`} href={item.href}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <LangToggle scrolled={useSolidNav} />
            <ContactButton href="/contact" />
          </div>

          <button
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden ${
              useSolidNav ? "border-slate-200" : "border-white/30"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`${textColor} text-xl leading-none`}>☰</span>
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
              {menu.map((item) =>
                item.href === "/service" ? (
                  <div key={item.href} className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50/90">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left font-semibold text-slate-900"
                    >
                      <span>{item.label}</span>
                      <Chevron open={mobileServicesOpen} className="text-slate-500" />
                    </button>

                    {mobileServicesOpen && (
                      <div className="space-y-1 border-t border-slate-200 px-3 py-3">
                        {serviceItems.map((service) => (
                          <ServiceMenuItem
                            key={service.id}
                            item={service}
                            mobile
                            onClick={() => setOpen(false)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.href}
                    className="block font-semibold text-slate-900"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ),
              )}

              <div className="flex items-center gap-3 pt-1">
                <LangToggle scrolled />
                <ContactButton href="/contact" className="flex-1 justify-center" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
