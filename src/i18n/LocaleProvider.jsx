"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createTranslator, getMessage } from "./getMessage";
import { getMessages } from "./messages";

const LocaleContext = createContext({
  locale: "th",
  setLocale: () => {},
  toggleLocale: () => {},
  t: (key) => key,
  messages: {},
});

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState("th");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "th") setLocaleState(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    localStorage.setItem("lang", locale);
  }, [locale, ready]);

  const setLocale = useCallback((next) => {
    setLocaleState((prev) => {
      const value = typeof next === "function" ? next(prev) : next;
      return value === "en" ? "en" : "th";
    });
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "th" ? "en" : "th"));
  }, [setLocale]);

  const messages = useMemo(() => getMessages(locale), [locale]);
  const t = useMemo(() => createTranslator(messages), [messages]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      messages,
      msg: (key, fallback) => getMessage(messages, key, fallback ?? key),
    }),
    [locale, setLocale, toggleLocale, t, messages],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT() {
  const { t, locale, messages } = useLocale();
  return { t, locale, messages };
}
