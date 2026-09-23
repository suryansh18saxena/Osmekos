"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { INGREDIENTS, type Ingredient } from "@/lib/products";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import VelocityMarquee from "@/components/fx/VelocityMarquee";
import CountUp from "@/components/fx/CountUp";
import { useSpotlight } from "@/components/fx/useSpotlight";
import { IconDrop, IconHeart, IconLeaf, IconSparkle, IconShield, IconStar } from "@/components/ui/Icons";

const ICONS = [IconDrop, IconHeart, IconLeaf, IconSparkle, IconShield, IconStar];

function Card({ ing, i, side }: { ing: Ingredient; i: number; side: "l" | "r" }) {
  const Icon = ICONS[i];
  return (
    <article
      data-side={side}
      className="ing-card group relative overflow-hidden rounded-[1.6rem] border border-ink/10 bg-cream/75 p-6 backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-expo)] hover:border-gold/55 hover:bg-white hover:shadow-[0_28px_60px_-38px_rgb(35_31_26_/_0.55)]"
    >
      <span className="pointer-events-none absolute -bottom-8 -right-2 select-none font-display text-[7.5rem] leading-none text-ink/[0.045] transition-colors duration-700 group-hover:text-gold/20">
        {ing.name.charAt(0)}
      </span>
      <div className="relative flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/35 bg-white/70 text-gold-2 transition-colors duration-500 group-hover:bg-ink group-hover:text-gold">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-ink px-3 py-1.5 font-display text-sm leading-none text-cream">{ing.pct}</span>
      </div>
      <h3 className="relative mt-5 font-display text-[1.6rem] leading-tight text-ink">{ing.name}</h3>
      <p className="relative mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-2">{ing.short}</p>
      <p className="relative mt-3 text-[14px] leading-relaxed text-ink-2">{ing.long}</p>
    </article>
  );
}

export default function Ingredients() {
  const ref = useRef<HTMLElement>(null);
  useSpotlight(ref, ".ing-card");

  useGSAP(
    () => {
      gsap.from(".ing-frame", {
        clipPath: "inset(12% 10% 12% 10%)",
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ing-stage", start: "top 80%", once: true },
      });
      gsap.from(".ing-frame img", {
        scale: 1.15,
        duration: 2.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ing-stage", start: "top 80%", once: true },
      });
      gsap.from(".ing-card", {
        autoAlpha: 0,
        x: (_i, el: HTMLElement) => (el.dataset.side === "l" ? -40 : 40),
        y: 20,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "opacity,visibility",
        scrollTrigger: { trigger: ".ing-stage", start: "top 75%", once: true },
      });
      gsap.from(".ing-stat", {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ing-stats", start: "top 90%", once: true },
      });
      gsap.to(".ing-ring", { rotation: 360, svgOrigin: "100 100", duration: 40, ease: "none", repeat: -1 });
    },
    { scope: ref },
  );

  const left = INGREDIENTS.slice(0, 3);
  const right = INGREDIENTS.slice(3);

  return (
    <section ref={ref} id="ingredients" className="relative overflow-hidden bg-sand pb-20 pt-20 md:pb-28 md:pt-28">
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255_/_0.55),transparent)]" />

      <div className="container-x relative grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">Thoughtfully formulated</p>
          </Reveal>
          <SplitReveal className="display mt-4 text-[2.6rem] leading-[1] md:text-6xl lg:text-[4.4rem]">
            Powerful ingredients for <em>healthy,</em> nourished skin.
          </SplitReveal>
        </div>
        <div className="lg:col-span-5 lg:pb-2">
          <Reveal delay={0.1}>
            <p className="text-[16px] leading-[1.7] text-ink-2">
              Six actives, every percentage printed on the label. We disclose concentrations because you deserve to
              know what goes on your skin, and exactly how much of it.
            </p>
          </Reveal>
          <div className="ing-stats mt-6 grid grid-cols-3 gap-4 border-t border-ink/12 pt-5">
            {[
              ["6", "Actives"],
              ["0", "Parabens"],
              ["100%", "Disclosed"],
            ].map(([n, l]) => (
              <div key={l} className="ing-stat">
                <CountUp value={n} className="font-display text-4xl leading-none text-ink" />
                <span className="mt-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VelocityMarquee className="my-10 border-y border-ink/12 py-3.5 md:my-14" speed={45} reverse>
        {INGREDIENTS.map((ing) => (
          <span key={ing.name} className="flex items-center gap-6 pr-6 text-[12px] font-semibold uppercase tracking-[0.28em] text-ink/80">
            <span className="text-gold-2">{ing.pct}</span>
            {ing.name}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </VelocityMarquee>

      <div className="ing-stage container-x relative grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_minmax(0,400px)_1fr] lg:items-center lg:gap-6 xl:grid-cols-[1fr_minmax(0,440px)_1fr]">
        <div className="relative order-first mx-auto w-full max-w-[420px] md:col-span-2 lg:order-none lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:max-w-none lg:self-stretch">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            <svg viewBox="0 0 200 200" className="pointer-events-none absolute -right-1 -top-5 z-10 h-24 w-24 md:-right-6 md:-top-6 md:h-32 md:w-32">
              <defs>
                <path id="ingcirc" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <circle cx="100" cy="100" r="96" className="fill-ink" />
              <g className="ing-ring">
                <text className="fill-cream text-[15px] font-semibold uppercase tracking-[0.3em]">
                  <textPath href="#ingcirc">Six actives · every % disclosed ·</textPath>
                </text>
              </g>
              <text x="100" y="112" textAnchor="middle" className="fill-gold font-display text-[34px]">
                6
              </text>
            </svg>
            <div
              className="ing-frame absolute inset-0 overflow-hidden rounded-t-[220px] rounded-b-[2.5rem] max-lg:rounded-t-[50%_40%] bg-cream shadow-[0_40px_90px_-50px_rgb(35_31_26_/_0.6)]"
              style={{ clipPath: "inset(0 round 0)" }}
            >
              <Image
                src="/products/bottle-frame.jpg"
                alt="OsmeKos Body Lotion with its ingredient percentages on the label"
                fill
                quality={90}
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1 lg:gap-5">
          {left.map((ing, i) => (
            <Card key={ing.name} ing={ing} i={i} side="l" />
          ))}
        </div>
        <div className="flex flex-col gap-4 lg:col-start-3 lg:row-start-1 lg:gap-5">
          {right.map((ing, i) => (
            <Card key={ing.name} ing={ing} i={i + 3} side="r" />
          ))}
        </div>
      </div>
    </section>
  );
}
