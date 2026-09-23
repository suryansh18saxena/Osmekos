"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PANELS = [
  { n: "01", title: "The formula", text: "Six actives, one honest label. Glycerin, Shea, Coconut, Niacinamide, Ceramides and Vitamin E in the amounts that matter." },
  { n: "02", title: "The pump", text: "A weighted metal collar and a precise dose. No mess, no waste, and a bottle you'll want to keep on the counter." },
  { n: "03", title: "The care within", text: "Full INCI on the back, batch and best-before on every bottle. Marketed from New Delhi, made in India." },
];

const IMAGES = ["/products/front.jpg", "/products/pump.jpg", "/products/back.jpg"];

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top top", end: "+=250%", pin: true, scrub: 0.6 },
        });
        for (let i = 1; i < PANELS.length; i++) {
          tl.to(`.sc-panel-${i - 1}`, { yPercent: -30, autoAlpha: 0, duration: 0.4 }, i)
            .fromTo(`.sc-img-${i}`, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, i)
            .fromTo(`.sc-img-${i} img`, { scale: 1.25 }, { scale: 1, duration: 1 }, i)
            .to(`.sc-img-${i - 1} img`, { scale: 0.92, duration: 1 }, i)
            .fromTo(`.sc-panel-${i}`, { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5 }, i + 0.5)
            .to(".sc-progress", { scaleY: (i + 1) / PANELS.length, duration: 1 }, i);
        }
        tl.to({}, { duration: 0.6 });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".sc-mobile-item").forEach((el) => {
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream-2">
      {/* desktop pinned */}
      <div className="container-x hidden h-svh grid-cols-12 items-center gap-10 lg:grid">
        <div className="relative col-span-5 h-[60vh]">
          {PANELS.map((p, i) => (
            <div key={p.n} className={`sc-panel-${i} absolute inset-0 flex flex-col justify-center ${i > 0 ? "opacity-0" : ""}`}>
              <p className="eyebrow">{p.n} / 03</p>
              <h3 className="display mt-5 text-6xl xl:text-7xl">{p.title}</h3>
              <p className="lead mt-6 max-w-md">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="col-span-6 col-start-7 flex items-center gap-8">
          <div className="relative aspect-[3/4] w-full max-w-[520px] overflow-hidden rounded-[2rem] bg-sand">
            {IMAGES.map((src, i) => (
              <div key={src} className={`sc-img-${i} absolute inset-0 overflow-hidden`}>
                <Image src={src} alt={PANELS[i].title} fill quality={90} sizes="45vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="relative h-56 w-px bg-ink/15">
            <span className="sc-progress absolute inset-0 origin-top scale-y-[0.333] bg-ink" />
          </div>
        </div>
      </div>

      {/* mobile stacked */}
      <div className="container-x flex flex-col gap-16 py-24 lg:hidden">
        {PANELS.map((p, i) => (
          <div key={p.n} className="sc-mobile-item">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand">
              <Image src={IMAGES[i]} alt={p.title} fill quality={90} sizes="90vw" className="object-cover" />
            </div>
            <p className="eyebrow mt-8">{p.n} / 03</p>
            <h3 className="display mt-3 text-5xl">{p.title}</h3>
            <p className="lead mt-4">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
