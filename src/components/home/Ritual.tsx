"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HOW_TO_USE } from "@/lib/products";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function Ritual() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".step").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true } });
        tl.from(el.querySelector(".step-line"), { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "expo.out" })
          .from(el.querySelectorAll(".step-in"), { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1.1, ease: "expo.out" }, 0.15);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative bg-ink py-24 text-cream md:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow text-gold">How to use</p>
            </Reveal>
            <SplitReveal className="display mt-5 text-5xl md:text-6xl lg:text-7xl [&_em]:text-gold">
              Three steps. <em>Twice</em> a day.
            </SplitReveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-cream/65">
                For external use only. Do a patch test before first use and avoid contact with eyes. Store in a cool,
                dry place away from direct sunlight.
              </p>
            </Reveal>
            <ParallaxImage src="/products/lightweight.jpg" alt="Applying lotion" speed={0.8} className="mt-12 hidden aspect-[4/3] rounded-[2rem] lg:block" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {HOW_TO_USE.map((s, i) => (
            <div key={s.title} className="step relative py-12 md:py-16">
              <span className="step-line absolute inset-x-0 top-0 h-px bg-cream/15" />
              <div className="grid grid-cols-[auto_1fr] gap-8 md:gap-14">
                <span className="step-in display text-6xl text-gold md:text-8xl">0{i + 1}</span>
                <div>
                  <h3 className="step-in font-display text-3xl md:text-4xl">{s.title}</h3>
                  <p className="step-in mt-4 max-w-md text-[16px] leading-relaxed text-cream/65">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
          <span className="block h-px bg-cream/15" />
        </div>
      </div>
    </section>
  );
}
