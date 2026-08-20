"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GavalonWelcomeModal from "./GavalonWelcomeModal";

const MODAL_ENABLED = false;

export default function GavalonWelcomeModalHost() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setReady(false);
      return;
    }

    const timer = window.setTimeout(() => setReady(true), 800);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!MODAL_ENABLED || pathname !== "/" || !ready) return null;

  return <GavalonWelcomeModal />;
}
