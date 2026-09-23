"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { IconDrop, IconSparkle, IconWaves } from "@/components/ui/Icons";

const BENEFITS = [
  { Icon: IconDrop, title: "Deep hydration", text: "6% Glycerin draws moisture in and keeps it there for hours, not minutes." },
  { Icon: IconSparkle, title: "Nourishment", text: "Shea Butter, Coconut Oil and Vitamin E feed dry skin without the heavy residue." },
  { Icon: IconWaves, title: "Soft, smooth skin", text: "Ceramides and Niacinamide rebuild the barrier so smoothness lasts beyond the first hour." },
];

export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".benefit", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".benefits", start: "top 80%", once: true },
      });
      gsap.from(".benefit-line", {
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.15,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".benefits", start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative py-24 md:py-40">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Daily care</p>
            </Reveal>
            <SplitReveal className="display mt-5 text-5xl md:text-6xl lg:text-7xl">
              Built to work <em>with</em> your skin.
            </SplitReveal>
            <Reveal delay={0.2}>
              <p className="lead mt-8 max-w-md">
                Most lotions sit on the surface. Ours is built to work with your skin: hydrate the upper layers,
                replenish lost lipids, and support the barrier that keeps everything in balance.
              </p>
            </Reveal>
          </div>

          <div className="benefits lg:col-span-6 lg:col-start-7">
            {BENEFITS.map(({ Icon, title, text }) => (
              <div key={title} className="relative py-8 md:py-10">
                <span className="benefit-line absolute inset-x-0 top-0 h-px bg-line" />
                <div className="benefit flex gap-6 md:gap-10">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-2">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl">{title}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-2">{text}</p>
                  </div>
                </div>
              </div>
            ))}
            <span className="benefit-line block h-px bg-line" />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:mt-32 md:grid-cols-3 md:gap-8">
          <ParallaxImage mode="card" src="/products/brand-hero.jpg" alt="OsmeKos bottle on stone" speed={0.4} sizes="(max-width: 768px) 50vw, 33vw" className="aspect-square rounded-[1.5rem] md:rounded-[2rem]" />
          <ParallaxImage mode="card" src="/products/lightweight.jpg" alt="Lotion being applied to skin" speed={1} sizes="(max-width: 768px) 50vw, 33vw" className="aspect-square rounded-[1.5rem] md:mt-20 md:rounded-[2rem]" />
          <ParallaxImage mode="card" src="/products/flatlay-towel.jpg" alt="OsmeKos on soft towels" speed={0.6} sizes="(max-width: 768px) 100vw, 33vw" className="col-span-2 mx-auto aspect-square w-full max-w-[420px] rounded-[1.5rem] md:col-span-1 md:max-w-none md:rounded-[2rem]" />
        </div>
      </div>
    </section>
  );
}
