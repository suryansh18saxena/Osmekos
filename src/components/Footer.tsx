"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IconArrow } from "./ui/Icons";

const COLS = [
  { title: "Shop", links: [["Body Lotion", "/product/body-lotion"], ["The Duo", "/product/the-duo"], ["Daily Ritual Set", "/product/daily-ritual-set"], ["All products", "/shop"]] },
  { title: "Company", links: [["Our story", "/about"], ["Ingredients", "/#ingredients"], ["Reviews", "/#reviews"]] },
  { title: "Help", links: [["Shipping & returns", "/about#help"], ["Contact", "mailto:support@osmekos.com"], ["Customer care: 95365 45783", "tel:+919536545783"]] },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ft-letter",
        { yPercent: 105, rotate: 6 },
        {
          yPercent: 0,
          rotate: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ".ft-word", start: "top 100%", end: "bottom 85%", scrub: 0.8 },
        },
      );
      gsap.from(".ft-credit", {
        autoAlpha: 0,
        y: 20,
        filter: "blur(6px)",
        clearProps: "filter",
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ft-credit", start: "top 98%", once: true },
      });
      gsap.from(".ft-col", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-cream">
      <div className="container-x pt-14 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="ft-col lg:col-span-5">
            <p className="eyebrow text-gold">Newsletter</p>
            <h3 className="display mt-3 text-3xl md:text-4xl">
              Skin notes, <em>occasionally.</em>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
              Launches, restocks and honest skincare reading. No noise, unsubscribe anytime.
            </p>
            <form
              className="mt-6 flex max-w-md items-center border-b border-cream/25 pb-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-base outline-none placeholder:text-cream/40"
              />
              <button type="submit" aria-label="Subscribe" className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-500 hover:scale-110">
                <IconArrow className="h-4 w-4" />
              </button>
            </form>
            {sent && <p className="mt-3 text-xs text-gold">Thank you. You&apos;re on the list.</p>}
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7 lg:pl-10">
            {COLS.map((c) => (
              <div key={c.title} className="ft-col">
                <p className="eyebrow text-gold">{c.title}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="link-line text-sm text-cream/75 transition-colors hover:text-cream">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-hidden border-t border-cream/10 pt-5 md:mt-16">
          <div className="ft-word display flex select-none overflow-hidden text-[21vw] leading-[0.9] text-cream md:text-[18vw]">
            {"OsmeKos".split("").map((c, i) => (
              <span
                key={i}
                className={`ft-letter inline-block ${i === 4 ? "text-shimmer" : ""}`}
                style={{ marginRight: "-0.045em" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream/10 py-4 text-[11px] uppercase tracking-[0.2em] text-cream/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Osmekos Essentials Pvt. Ltd. New Delhi</p>
          <p>Made in India · For all skin types</p>
        </div>

        <div className="ft-credit flex justify-center border-t border-cream/10 py-4">
          <p className="group flex items-center gap-2 text-[12px] tracking-[0.04em] text-cream/70">
            Made with
            <span className="flame inline-block text-base" role="img" aria-label="fire">
              🔥
            </span>
            by
            <span className="font-display text-[16px] italic text-cream transition-colors duration-500 group-hover:text-gold">
              The Angaar Labs
            </span>
          </p>
        </div>
      </div>
      <style>{`
        .flame{transform-origin:50% 90%;animation:flame 1.6s ease-in-out infinite}
        @keyframes flame{0%,100%{transform:scale(1) rotate(-3deg);filter:drop-shadow(0 0 6px rgb(255 140 40 / .55))}
          50%{transform:scale(1.14) rotate(3deg);filter:drop-shadow(0 0 14px rgb(255 120 30 / .85))}}
        @media (prefers-reduced-motion: reduce){.flame{animation:none}}
      `}</style>
    </footer>
  );
}
