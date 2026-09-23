"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useUI } from "@/store/ui";

export default function SmoothScroll() {
  const setLenis = useUI((s) => s.setLenis);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: { offset: -80 } });
    setLenis(lenis);
    if (!useUI.getState().loaded) lenis.stop();
    const unsub = useUI.subscribe((s, prev) => {
      if (s.loaded && !prev.loaded) {
        lenis.start();
        ScrollTrigger.refresh();
      }
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      unsub();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [setLenis]);

  useEffect(() => {
    const lenis = useUI.getState().lenis;
    lenis?.scrollTo(0, { immediate: true });
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
