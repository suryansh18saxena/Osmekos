"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useUI } from "@/store/ui";

const WORD = "OsmeKos".split("");

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const setLoaded = useUI((s) => s.setLoaded);

  useGSAP(
    () => {
      const el = ref.current!;
      const num = el.querySelector<HTMLElement>(".pl-num")!;
      const counter = { v: 0 };

      let seen = false;
      try {
        seen = sessionStorage.getItem("osmekos-seen") === "1";
        sessionStorage.setItem("osmekos-seen", "1");
      } catch {}

      if (seen) {
        gsap.to(el, {
          yPercent: -100,
          duration: 0.9,
          ease: "expo.inOut",
          delay: 0.1,
          onComplete: () => {
            setLoaded(true);
            el.style.display = "none";
          },
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          setLoaded(true);
          el.style.display = "none";
        },
      });

      tl.from(".pl-letter", { yPercent: 120, duration: 1.2, stagger: 0.06 }, 0.1)
        .from(".pl-meta", { autoAlpha: 0, y: 12, duration: 0.8, stagger: 0.1 }, 0.4)
        .to(
          counter,
          {
            v: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              num.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.3,
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.3)
        .to(".pl-letter", { yPercent: -120, duration: 0.8, ease: "expo.in", stagger: 0.04 }, "+=0.1")
        .to(".pl-meta", { autoAlpha: 0, y: -10, duration: 0.5 }, "<")
        .to(el, { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, "-=0.35")
        .to(".pl-inner", { yPercent: 40, duration: 1.15, ease: "expo.inOut" }, "<");
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="fixed inset-0 z-[400] bg-ink text-cream" aria-hidden>
      <div className="pl-inner flex h-full flex-col justify-between p-6 md:p-10">
        <div className="pl-meta eyebrow text-cream/60">Skincare Essentials</div>
        <div className="display flex overflow-hidden text-[18vw] leading-[1] tracking-[-0.03em] md:text-[12vw]">
          {WORD.map((c, i) => (
            <span key={i} className="pl-letter inline-block">
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between">
          <div className="pl-meta eyebrow text-cream/60">Nourish · Hydrate · Soften</div>
          <div className="pl-meta pl-num font-display text-4xl tabular-nums text-gold md:text-6xl">000</div>
        </div>
      </div>
      <div className="pl-bar absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold" />
    </div>
  );
}
