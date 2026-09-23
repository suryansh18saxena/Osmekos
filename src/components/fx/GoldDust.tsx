"use client";

import { useEffect, useRef } from "react";

/** Soft golden bokeh drifting upward. Pauses off-screen and respects reduced motion. */
export default function GoldDust({ count = 38, className = "" }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const dots = Array.from({ length: count }, () => ({
      x: rand(0, 1), y: rand(0, 1), r: rand(1, 4.5), s: rand(0.004, 0.018),
      a: rand(0.15, 0.6), p: rand(0, Math.PI * 2), d: rand(0.2, 0.8),
    }));
    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000; last = now;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s * dt * 2.2;
        d.p += dt * d.d;
        if (d.y < -0.05) { d.y = 1.05; d.x = rand(0, 1); }
        const x = (d.x + Math.sin(d.p) * 0.01) * w;
        const y = d.y * h;
        const tw = 0.6 + 0.4 * Math.sin(d.p * 2);
        const g = ctx.createRadialGradient(x, y, 0, x, y, d.r * 3);
        g.addColorStop(0, `rgba(236, 200, 120, ${d.a * tw})`);
        g.addColorStop(1, "rgba(236, 200, 120, 0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, d.r * 3, 0, Math.PI * 2); ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) { last = performance.now(); raf = requestAnimationFrame(draw); } else cancelAnimationFrame(raf);
    });
    io.observe(c);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, [count]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
