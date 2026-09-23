"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useUI } from "@/store/ui";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import GoldDust from "@/components/fx/GoldDust";
import { IconDrop, IconSparkle, IconWaves, IconLeaf, IconArrow } from "@/components/ui/Icons";

const PILLARS = [
  { Icon: IconDrop, label: "Deep Hydration", sub: "6% Glycerin" },
  { Icon: IconSparkle, label: "Nourishment", sub: "Shea + Vitamin E" },
  { Icon: IconWaves, label: "Soft, Smooth Skin", sub: "Triple Ceramides" },
  { Icon: IconLeaf, label: "For All Skin Types", sub: "Gentle daily care" },
];


const GLOW = { textShadow: "0 1px 30px rgb(246 241 233 / 0.9), 0 1px 4px rgb(246 241 233 / 0.6)" };

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const loaded = useUI((s) => s.loaded);

  useGSAP(
    () => {
      const el = ref.current!;

      if (!loaded) {
        gsap.set([".hero-fade", ".hero-pillar", ".hero-title"], { autoAlpha: 0 });
        gsap.set(".hero-img", { autoAlpha: 0 });
        return;
      }

      gsap.set(".hero-title", { autoAlpha: 1 });
      const split = SplitText.create([".hero-line-1", ".hero-line-3"], { type: "chars", mask: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(".hero-img", { autoAlpha: 1, duration: 1.8, ease: "power2.out" }, 0)
        .fromTo(".hero-fade", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.1 }, 0.25)
        .from(split.chars, { yPercent: 115, filter: "blur(10px)", duration: 1.4, stagger: 0.03 }, 0.35)
        .from(".hero-line-2", { yPercent: 110, rotate: 4, filter: "blur(14px)", duration: 1.6 }, 0.55)
        .fromTo(".hero-pillar", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 1.0);

      // scroll: gentle parallax only (no scaling)
      gsap.to(".hero-img", { yPercent: 10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-layer", {
        yPercent: -12,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "35% top", end: "bottom top", scrub: true },
      });

      // pointer depth: layers drift at different rates
      if (!window.matchMedia("(pointer: coarse)").matches) {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((node) => ({
          d: parseFloat(node.dataset.depth || "0"),
          x: gsap.quickTo(node, "x", { duration: 1.4, ease: "power3" }),
          y: gsap.quickTo(node, "y", { duration: 1.4, ease: "power3" }),
        }));
        const move = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.d);
            l.y(ny * l.d);
          });
        };
        window.addEventListener("mousemove", move, { passive: true });
        return () => {
          window.removeEventListener("mousemove", move);
          split.revert();
        };
      }
      return () => split.revert();
    },
    { scope: ref, dependencies: [loaded] },
  );

  return (
    <section ref={ref} className="relative h-[100svh] max-h-[940px] min-h-[660px] w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden bg-cream">
        <div className="hero-img absolute inset-0 will-change-transform">
          <Image src="/products/hero-bg-mobile.jpg" alt="OsmeKos Body Lotion" fill priority quality={90} sizes="100vw" className="object-cover object-center md:hidden" />
          <Image src="/products/hero-bg.jpg" alt="" fill priority quality={90} sizes="100vw" className="hidden object-cover object-center md:block" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cream/75 via-cream/15 to-transparent md:from-cream/55 md:via-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-cream via-cream/60 to-transparent md:h-2/5 md:from-cream/90 md:via-cream/25" />
        {/* slow light sweep across the scene */}
        <div className="hero-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent mix-blend-soft-light" />
        <GoldDust />
      </div>

      <div className="hero-layer container-x relative z-20 flex h-full flex-col justify-between pb-7 pt-[104px] md:pb-10 md:pt-[138px]">
        <div className="flex items-start justify-between gap-8">
          <div data-depth="-8" className="max-w-[46rem]" style={GLOW}>
            <p className="hero-fade flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.34em] text-ink/75 md:text-[12px]">
              <span className="h-px w-8 bg-gold" />
              More than moisture<span className="hidden sm:inline"> · Skincare that feels right</span>
            </p>

            <h1 className="hero-title display mt-5 text-[19vw] font-medium leading-[0.92] tracking-[-0.035em] sm:text-[13vw] lg:text-[7.4rem] xl:text-[8.2rem]">
              <span className="hero-line-1 block">Skin,</span>
              <span className="-mb-[0.24em] block overflow-hidden pl-[0.02em]">
                <em className="hero-line-2 text-shimmer inline-block pb-[0.24em] pr-[0.12em] font-normal">deeply</em>
              </span>
              <span className="hero-line-3 block">nourished.</span>
            </h1>

            <p className="hero-fade mt-6 max-w-[27rem] font-display text-[18px] leading-[1.55] text-ink-2 md:text-[21px]">
              Daily care for softer, smoother, healthier-looking skin.
            </p>

            <div className="hero-fade mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              <Magnetic>
                <Button href="/product/body-lotion" arrow>
                  Shop Body Lotion
                </Button>
              </Magnetic>
              <Link
                href="/#ingredients"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/40 py-2 pl-5 pr-2 text-[13px] font-semibold text-ink shadow-[inset_0_1px_0_white] backdrop-blur-xl transition-colors duration-500 hover:bg-white/80"
                style={{ textShadow: "none" }}
              >
                See what&apos;s inside
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <IconArrow className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>

          </div>

          <div data-depth="14" className="hero-fade hidden shrink-0 text-right lg:block" style={GLOW}>
            <span className="ml-auto block h-px w-14 bg-gold" />
            <p className="mt-5 font-display text-[30px] leading-[1.15] text-ink">
              Healthy Skin.
              <br />
              <em className="text-gold-2">Happier You.</em>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {PILLARS.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="hero-pillar group flex flex-col items-center gap-2 rounded-2xl p-2 text-center transition-colors duration-500 md:flex-row md:gap-3.5 md:border md:border-white/60 md:bg-white/30 md:p-3.5 md:text-left md:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.8)] md:backdrop-blur-xl md:hover:bg-white/60"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-cream/50 text-ink transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-gold md:h-12 md:w-12">
                <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-medium text-ink md:text-[15px] md:font-semibold">{label}</span>
                <span className="mt-0.5 hidden text-[12px] text-muted md:block">{sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hero-sweep{animation:heroSweep 9s ease-in-out 2.5s infinite}
        @keyframes heroSweep{0%{transform:translateX(0) skewX(-18deg)}55%,100%{transform:translateX(420%) skewX(-18deg)}}
        @media (prefers-reduced-motion: reduce){.hero-sweep{animation:none}}
      `}</style>
    </section>
  );
}
