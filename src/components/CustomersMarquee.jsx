"use client";
import { useEffect, useRef, useState } from "react";
import CustomerLogosHeader from "./CustomerLogosHeader";
import CustomerLogosMarquee from "./CustomerLogosMarquee";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function CustomersMarquee() {
  const [secRef, inView] = useInView(0.1);

  return (
    <section ref={secRef} className="w-full bg-white pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <CustomerLogosHeader revealed={inView} />
      </div>

      <CustomerLogosMarquee
        revealed={inView}
        active={inView}
        className="mt-10"
      />
    </section>
  );
}
