"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import ParallaxImage from "@/components/ui/ParallaxImage";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import AddToCart from "@/components/shop/AddToCart";
import { IconTruck, IconShield, IconLeaf } from "@/components/ui/Icons";

export default function ShopCta() {
  const ref = useRef<HTMLElement>(null);
  const product = PRODUCTS[0];

  useGSAP(
    () => {
      gsap.from(".cta-card", {
        scale: 0.94,
        borderRadius: "4rem",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cta-card", start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative py-10 md:py-20">
      <div className="container-x">
        <div className="cta-card grid overflow-hidden rounded-[2rem] bg-sand md:rounded-[2.5rem] lg:grid-cols-12">
          <ParallaxImage src="/products/rock.jpg" alt="OsmeKos Body Lotion" speed={0.8} reveal={false} className="aspect-[4/3] lg:col-span-6 lg:aspect-auto lg:min-h-[640px]" />
          <div className="flex flex-col justify-center p-8 md:p-14 lg:col-span-6 lg:p-20">
            <Reveal>
              <p className="eyebrow">Shop</p>
            </Reveal>
            <SplitReveal className="display mt-5 text-5xl md:text-6xl">
              Your skin&apos;s new <em>daily ritual.</em>
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="lead mt-6 max-w-md">{product.subtitle}. {product.size}. Made in India.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="font-display text-5xl">{formatPrice(product.price)}</span>
                <span className="text-sm text-muted">incl. of all taxes</span>
              </div>
              <div className="mt-8">
                <AddToCart slug={product.slug} />
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-muted">
                <li className="flex items-center gap-2"><IconTruck className="h-4 w-4" /> Free shipping over ₹999</li>
                <li className="flex items-center gap-2"><IconShield className="h-4 w-4" /> 24-month shelf life</li>
                <li className="flex items-center gap-2"><IconLeaf className="h-4 w-4" /> All skin types</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
