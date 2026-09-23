"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import ParallaxImage from "@/components/ui/ParallaxImage";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import { IconLeaf, IconSparkle, IconDrop, IconHeart } from "@/components/ui/Icons";

const FEATURES = [
  { Icon: IconLeaf, text: "Absorbs quickly" },
  { Icon: IconSparkle, text: "Non-greasy finish" },
  { Icon: IconDrop, text: "Leaves skin soft and smooth" },
  { Icon: IconHeart, text: "Perfect for daily use" },
];

export default function Texture() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tx-feature", {
        x: -30,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".tx-features", start: "top 85%", once: true },
      });
      gsap.to(".tx-badge", {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-24 md:py-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <ParallaxImage mode="card" src="/products/swatch.jpg" alt="Lotion texture swatch" speed={0.6} sizes="(max-width:1024px) 100vw, 50vw" className="aspect-[5/3] rounded-[2rem]" />
          <div className="tx-badge absolute -top-12 -right-4 flex h-36 w-36 items-center justify-center rounded-full bg-ink text-cream md:-right-10 md:h-44 md:w-44">
            <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
              <defs>
                <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-cream text-[7.5px] font-semibold uppercase tracking-[0.25em]">
                <textPath href="#circ">Non-greasy · Fast absorbing · Daily ritual ·</textPath>
              </text>
            </svg>
            <IconDrop className="h-8 w-8 text-gold" />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">Texture</p>
          </Reveal>
          <SplitReveal className="display mt-5 text-5xl md:text-6xl lg:text-7xl">
            Lightweight. <em>Deeply</em> nourishing.
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="lead mt-8">
              A silky emulsion that melts on contact. It leaves a soft, breathable finish you can dress over in seconds,
              with hydration that keeps working long after.
            </p>
          </Reveal>
          <ul className="tx-features mt-10 flex flex-col">
            {FEATURES.map(({ Icon, text }) => (
              <li key={text} className="tx-feature flex items-center gap-5 border-t border-line py-5 last:border-b">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-2">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-lg">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
