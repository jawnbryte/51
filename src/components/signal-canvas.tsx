import { useEffect, useRef } from "react";

export function SignalCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let raf = 0;
    const bars = 48;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const gap = 2;
      const w = (width - gap * (bars - 1)) / bars;
      for (let i = 0; i < bars; i++) {
        const t = frame * 0.045 + i * 0.37;
        const n =
          0.35 +
          0.25 * Math.sin(t) +
          0.2 * Math.sin(t * 1.7) +
          0.15 * Math.sin(t * 0.4 + i);
        const amp = active && !reduce ? Math.max(0.08, n) : 0.12;
        const h = amp * height;
        const x = i * (w + gap);
        const y = (height - h) / 2;
        ctx.fillStyle = i % 7 === 0 ? "#e2c99a" : "#c4a574";
        ctx.globalAlpha = 0.55 + amp * 0.45;
        ctx.fillRect(x, y, w, h);
      }
      ctx.globalAlpha = 1;
      frame += 1;
      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={ref}
      className="h-10 w-full"
      aria-hidden="true"
    />
  );
}
