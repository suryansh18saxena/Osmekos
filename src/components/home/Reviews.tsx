"use client";

import { useRef } from "react";
import { useSpotlight } from "@/components/fx/useSpotlight";
import { REVIEWS } from "@/lib/products";
import Marquee from "@/components/ui/Marquee";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import { IconStar } from "@/components/ui/Icons";
import CountUp from "@/components/fx/CountUp";

function Card({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <div className="rv-card relative mx-3 flex w-[320px] shrink-0 flex-col justify-between rounded-[1.5rem] border border-line bg-white/70 p-7 transition-colors duration-500 hover:border-gold/50 hover:bg-white md:w-[380px]">
      <div>
        <div className="flex gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} />
          ))}
        </div>
        <p className="relative mt-5 font-display text-2xl leading-snug md:text-[1.7rem]">&ldquo;{r.text}&rdquo;</p>
      </div>
      <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted">
        {r.name} · {r.city}
      </p>
    </div>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);
  useSpotlight(ref, ".rv-card", { tilt: 5, lift: 4 });
  return (
    <section ref={ref} id="reviews" className="relative overflow-hidden py-24 md:py-40">
      <div className="container-x text-center">
        <Reveal>
          <p className="eyebrow">Reviews</p>
        </Reveal>
        <SplitReveal className="display mx-auto mt-5 max-w-3xl text-5xl md:text-6xl lg:text-7xl">
          Loved by skin <em>everywhere.</em>
        </SplitReveal>
        <Reveal delay={0.15}>
          <p className="lead mx-auto mt-6 max-w-md"><CountUp value="4.9" className="font-display text-3xl text-ink" /> average from <CountUp value="1,200" />+ verified reviews across India.</p>
        </Reveal>
      </div>
      <div className="mt-16 flex flex-col gap-6">
        <Marquee duration={55}>
          {REVIEWS.slice(0, 4).map((r) => (
            <Card key={r.name} r={r} />
          ))}
        </Marquee>
        <Marquee duration={62} reverse>
          {REVIEWS.slice(4).map((r) => (
            <Card key={r.name} r={r} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
