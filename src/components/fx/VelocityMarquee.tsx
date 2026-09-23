"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useUI } from "@/store/ui";

/**
 * Marquee that idles at `speed` px/s, accelerates with scroll velocity,
 * follows scroll direction and skews slightly while you scroll.
 */
export default function VelocityMarquee({
  children,
  className = "",
  speed = 60,
  reverse = false,
  skew = true,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
  skew?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let half = el.scrollWidth / 2;
    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2));
    ro.observe(el);
    const skewTo = gsap.quickTo(el, "skewX", { duration: 0.6, ease: "power3" });
    const base = reverse ? -1 : 1;
    let dir = base;
    let x = 0;

    const tick = (_t: number, dt: number) => {
      const lenis = useUI.getState().lenis;
      const v = lenis?.velocity ?? 0;
      if (lenis && lenis.direction) dir = base * (lenis.direction > 0 ? 1 : -1);
      const pxs = speed + Math.min(Math.abs(v) * 45, 1100);
      x -= (dir * pxs * dt) / 1000;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      gsap.set(el, { x });
      if (skew) skewTo(gsap.utils.clamp(-9, 9, -v * 0.5));
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
    };
  }, [speed, reverse, skew]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
