"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Counts from 0 to the numeric part of `value` when scrolled into view. Keeps prefix/suffix. */
export default function CountUp({ value, className, duration = 2 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !m) return;
      const [, pre, num, post] = m;
      const target = parseFloat(num.replace(/,/g, ""));
      const decimals = num.includes(".") ? num.split(".")[1].length : 0;
      const comma = num.includes(",");
      const fmt = (n: number) => {
        const s = n.toFixed(decimals);
        return pre + (comma ? Number(s).toLocaleString("en-IN", { minimumFractionDigits: decimals }) : s) + post;
      };
      const o = { n: 0 };
      el.textContent = fmt(0);
      gsap.to(o, {
        n: target,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => (el.textContent = fmt(o.n)),
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
