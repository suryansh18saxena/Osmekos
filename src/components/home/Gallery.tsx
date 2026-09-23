"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SHOTS = [
  { src: "/products/more-than-moisture.jpg", cap: "Daily care for softer skin" },
  { src: "/products/lightweight.jpg", cap: "Lightweight. Deeply nourishing." },
  { src: "/products/flatlay-towel.jpg", cap: "Nourish · Hydrate · Soften" },
  { src: "/products/formulated.jpg", cap: "Thoughtfully formulated" },
  { src: "/products/back-label-scene.jpg", cap: "The care within" },
  { src: "/products/brand-hero.jpg", cap: "Skincare that feels right" },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const track = ref.current!.querySelector<HTMLElement>(".gal-track")!;
      const dist = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".gal-item").forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotate: i % 2 ? 1.2 : -1.2 },
          {
            rotate: i % 2 ? -1.2 : 1.2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative h-svh overflow-hidden bg-cream">
      <div className="absolute left-5 top-8 z-10 md:left-16 md:top-12">
        <p className="eyebrow">A daily ritual</p>
        <h2 className="display mt-3 text-4xl md:text-6xl">
          For healthier-looking <em>skin.</em>
        </h2>
      </div>
      <div className="gal-track flex h-full items-end gap-5 pb-10 pl-5 pr-[10vw] will-change-transform md:gap-8 md:pb-14 md:pl-16">
        {SHOTS.map((s, i) => (
          <figure key={s.src} className="gal-item shrink-0">
            <div className="relative aspect-square h-[44vh] max-h-[560px] overflow-hidden rounded-[1.5rem] bg-sand shadow-[0_30px_60px_-40px_rgb(35_31_26_/_0.6)] transition-[translate,box-shadow] duration-700 ease-[var(--ease-expo)] hover:-translate-y-3 hover:shadow-[0_50px_80px_-40px_rgb(35_31_26_/_0.7)] md:h-[58vh] md:rounded-[2rem]">
              <Image src={s.src} alt={s.cap} fill quality={90} sizes="(max-width:768px) 80vw, 40vw" className="object-cover" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted">
              <span>{s.cap}</span>
              <span>0{i + 1}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
