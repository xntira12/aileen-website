"use client";

import { LocaleProvider } from "@/i18n/LocaleProvider";
import GavalonWelcomeModalHost from "./GavalonWelcomeModalHost";

export default function Providers({ children }) {
  return (
    <LocaleProvider>
      {children}
      <GavalonWelcomeModalHost />
    </LocaleProvider>
  );
}
