"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useCart, cartTotals } from "@/store/cart";
import { useUI } from "@/store/ui";
import { IconArrow, IconBag, IconClose } from "./ui/Icons";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#ingredients", label: "Ingredients" },
  { href: "/about", label: "Our Story" },
  { href: "/#reviews", label: "Reviews" },
];

function Logo({ light }: { light: boolean }) {
  return (
    <Link href="/" aria-label="OsmeKos home" className="nav-item flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border font-display text-[15px] leading-none tracking-[-0.06em] transition-colors duration-500 ${light ? "border-cream/40 text-cream" : "border-ink/20 bg-white/50 text-ink"}`}
      >
        OK
      </span>
      <span className="text-[22px] font-bold tracking-[-0.04em] md:text-[24px]">
        OsmeKos<sup className="ml-0.5 align-top text-[8px] font-semibold tracking-normal">TM</sup>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const lines = useCart((s) => s.lines);
  const hydrated = useCart((s) => s.hydrated);
  const openCart = useCart((s) => s.open);
  const loaded = useUI((s) => s.loaded);
  const menuOpen = useUI((s) => s.menuOpen);
  const setMenuOpen = useUI((s) => s.setMenuOpen);
  const lenis = useUI((s) => s.lenis);
  const pathname = usePathname();
  const count = hydrated ? cartTotals(lines).count : 0;

  // entrance + hide on scroll down / reveal on scroll up
  useGSAP(
    () => {
      if (!loaded) {
        gsap.set(".nav-shell", { autoAlpha: 0, y: -24 });
        return;
      }
      gsap.to(".nav-shell", { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", delay: 0.15 });
      gsap.from(".nav-item", { y: -10, autoAlpha: 0, duration: 1, stagger: 0.05, ease: "expo.out", delay: 0.35 });
      const nav = ref.current!;
      ScrollTrigger.create({
        start: "top -120",
        end: "max",
        onUpdate: (self) => {
          const hide = self.direction === 1 && !useUI.getState().menuOpen;
          gsap.to(nav, { yPercent: hide ? -140 : 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
        },
        onToggle: (self) => nav.classList.toggle("is-scrolled", self.isActive),
      });
    },
    { scope: ref, dependencies: [loaded] },
  );

  // liquid-glass pill that glides under hovered links
  useEffect(() => {
    const wrap = linksRef.current;
    const pill = pillRef.current;
    if (!wrap || !pill) return;
    const links = Array.from(wrap.querySelectorAll<HTMLElement>("a"));
    const moveTo = (el: HTMLElement) =>
      gsap.to(pill, { x: el.offsetLeft, width: el.offsetWidth, autoAlpha: 1, duration: 0.55, ease: "expo.out" });
    const enter = (e: Event) => moveTo(e.currentTarget as HTMLElement);
    const leave = () => gsap.to(pill, { autoAlpha: 0, duration: 0.35, ease: "power2.out" });
    links.forEach((l) => l.addEventListener("mouseenter", enter));
    wrap.addEventListener("mouseleave", leave);
    return () => {
      links.forEach((l) => l.removeEventListener("mouseenter", enter));
      wrap.removeEventListener("mouseleave", leave);
    };
  }, []);

  useGSAP(
    () => {
      const m = menuRef.current!;
      if (menuOpen) {
        gsap.set(m, { pointerEvents: "auto" });
        gsap
          .timeline()
          .to(m, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
          .from(".menu-link", { yPercent: 110, duration: 1, stagger: 0.07, ease: "expo.out" }, "-=0.4")
          .from(".menu-meta", { autoAlpha: 0, y: 10, duration: 0.6 }, "-=0.6");
        lenis?.stop();
      } else {
        gsap.to(m, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "expo.inOut", onComplete: () => gsap.set(m, { pointerEvents: "none" }) });
        if (useUI.getState().loaded) lenis?.start();
      }
    },
    { scope: menuRef, dependencies: [menuOpen] },
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <header ref={ref} className="group/nav fixed inset-x-0 top-0 z-[120] px-3 pt-3 md:px-6 md:pt-5">
        <div
          className={`nav-shell relative mx-auto flex h-[62px] max-w-[1360px] items-center justify-between rounded-full border pl-3 pr-2 transition-[background-color,border-color,box-shadow,height] duration-500 md:h-[68px] md:pl-4 ${
            menuOpen
              ? "border-white/15 bg-white/10 text-cream backdrop-blur-2xl"
              : "border-white/70 bg-white/35 text-ink shadow-[0_12px_40px_-20px_rgb(35_31_26_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.85),inset_0_-1px_0_rgb(255_255_255_/_0.25)] backdrop-blur-2xl backdrop-saturate-[1.8] group-[.is-scrolled]/nav:bg-white/60 group-[.is-scrolled]/nav:shadow-[0_18px_50px_-22px_rgb(35_31_26_/_0.45),inset_0_1px_0_rgb(255_255_255_/_0.9)]"
          }`}
        >
          {/* specular sheen */}
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute -top-1/2 left-[8%] h-full w-[45%] rounded-full bg-gradient-to-b from-white/70 to-transparent opacity-60 blur-md" />
          </span>

          <div className="relative flex items-center gap-2">
            <button
              className="nav-item flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${menuOpen ? "translate-y-[5.5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
              </span>
            </button>
            <Logo light={menuOpen} />
          </div>

          <nav ref={linksRef} className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center lg:flex">
            <span
              ref={pillRef}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-full w-0 rounded-full border border-white/80 bg-white/70 opacity-0 shadow-[0_6px_18px_-8px_rgb(35_31_26_/_0.35),inset_0_1px_0_rgb(255_255_255)]"
            />
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-item relative z-10 rounded-full px-4 py-2.5 text-[14px] font-medium tracking-[-0.01em] text-ink/80 transition-colors duration-300 hover:text-ink"
              >
                {l.label}
                {isActive(l.href) && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />}
              </Link>
            ))}
          </nav>

          <div className="relative flex items-center gap-1.5 md:gap-2">
            <button
              onClick={openCart}
              className={`nav-item relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ${
                menuOpen ? "border-cream/25 hover:bg-cream hover:text-ink" : "border-white/80 bg-white/50 hover:bg-white"
              }`}
              aria-label={`Open cart, ${count} items`}
            >
              <IconBag className="h-5 w-5" />
              <span
                className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink transition-transform duration-500 ${count ? "scale-100" : "scale-0"}`}
              >
                {count}
              </span>
            </button>
            <Link
              href="/product/body-lotion"
              className="nav-item group/btn relative hidden h-11 items-center gap-2 overflow-hidden rounded-full bg-ink pl-5 pr-4 text-[13px] font-semibold text-cream sm:flex"
            >
              <span aria-hidden className="absolute inset-0 translate-y-full rounded-full bg-gold transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover/btn:text-ink">Shop Now</span>
              <IconArrow className="relative h-4 w-4 transition-all duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:text-ink" />
            </Link>
          </div>
        </div>
      </header>

      <div ref={menuRef} className="pointer-events-none fixed inset-0 z-[110] bg-ink text-cream" style={{ clipPath: "inset(0% 0% 100% 0%)" }}>
        <div className="container-x flex h-full flex-col justify-between pb-10 pt-32">
          <nav className="flex flex-col gap-1">
            {[...LINKS, { href: "/cart", label: "Cart" }].map((l) => (
              <div key={l.href} className="overflow-hidden">
                <Link href={l.href} className="menu-link display block text-[14vw] leading-[1.08] text-cream" onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>
          <div className="menu-meta flex items-end justify-between text-[11px] uppercase tracking-[0.25em] text-cream/50">
            <span>Skincare that feels right</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <IconClose className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
