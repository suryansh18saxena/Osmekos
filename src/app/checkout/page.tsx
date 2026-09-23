"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCart, cartTotals } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";

const PAY = ["UPI", "Card", "Cash on delivery"];

export default function CheckoutPage() {
  const { lines, clear, hydrated } = useCart();
  const { items, subtotal, shipping, total } = cartTotals(lines);
  const [pay, setPay] = useState(PAY[0]);
  const [done, setDone] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!done) return;
      gsap.from(".ok-circle", { scale: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" });
      gsap.from(".ok-check", { strokeDashoffset: 60, duration: 0.8, ease: "power2.out", delay: 0.3 });
      gsap.from(".ok-text", { y: 20, autoAlpha: 0, stagger: 0.1, duration: 1, ease: "expo.out", delay: 0.4 });
    },
    { scope: ref, dependencies: [done] },
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "OK" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setDone(id);
    clear();
    window.scrollTo(0, 0);
  };

  if (done) {
    return (
      <div ref={ref} className="container-x flex min-h-svh flex-col items-center justify-center py-32 text-center">
        <div className="ok-circle flex h-28 w-28 items-center justify-center rounded-full bg-gold">
          <svg viewBox="0 0 24 24" className="h-12 w-12 stroke-ink" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <path className="ok-check" d="m5 12.5 4.5 4.5L19 7.5" strokeDasharray={60} strokeDashoffset={0} />
          </svg>
        </div>
        <h1 className="ok-text display mt-10 text-5xl md:text-7xl">Order <em>confirmed.</em></h1>
        <p className="ok-text lead mt-6 max-w-md">Order {done} is on its way. A confirmation has been sent to your email. Softer skin arrives in 2 to 4 days.</p>
        <div className="ok-text mt-10"><Button href="/" arrow>Back home</Button></div>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-40">
      <div className="container-x pt-[130px] md:pt-[160px]">
        <Reveal><p className="eyebrow">Checkout</p></Reveal>
        <SplitReveal as="h1" className="display mt-5 text-5xl md:text-7xl">Where should we <em>send it?</em></SplitReveal>
      </div>

      <form onSubmit={submit} className="container-x mt-14 grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-12 lg:col-span-7">
          <Reveal>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.25em]">Contact</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input className="input" required type="email" placeholder="Email" />
              <input className="input" required type="tel" placeholder="Phone" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.25em]">Shipping address</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input className="input" required placeholder="First name" />
              <input className="input" required placeholder="Last name" />
              <input className="input md:col-span-2" required placeholder="Address" />
              <input className="input" required placeholder="City" />
              <input className="input" required placeholder="State" />
              <input className="input" required placeholder="PIN code" inputMode="numeric" pattern="[0-9]{6}" />
              <input className="input" value="India" readOnly />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.25em]">Payment</h2>
            <div className="mt-5 flex flex-col gap-3">
              {PAY.map((p) => (
                <label key={p} className={`flex cursor-pointer items-center justify-between rounded-xl border px-5 py-4 transition-colors ${pay === p ? "border-ink bg-white/70" : "border-ink/15"}`}>
                  <span className="text-[15px]">{p}</span>
                  <input type="radio" name="pay" checked={pay === p} onChange={() => setPay(p)} className="accent-ink" />
                </label>
              ))}
            </div>
          </Reveal>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="sticky top-28 rounded-[2rem] bg-sand p-8">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.25em]">Your order</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {hydrated && items.map(({ product, qty }) => (
                <li key={product.slug} className="flex items-center gap-4">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                    <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-cream">{qty}</span>
                  </div>
                  <span className="flex-1 text-sm">{product.name}</span>
                  <span className="text-sm tabular-nums">{formatPrice(product.price * qty)}</span>
                </li>
              ))}
              {hydrated && items.length === 0 && <li className="text-sm text-muted">Your bag is empty.</li>}
            </ul>
            <dl className="mt-6 flex flex-col gap-3 border-t border-ink/15 pt-6 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t border-ink/15 pt-4 text-base font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatPrice(total)}</dd></div>
            </dl>
            <Button type="submit" className="mt-8 w-full" arrow disabled={items.length === 0}>Place order</Button>
          </div>
        </aside>
      </form>
    </div>
  );
}
