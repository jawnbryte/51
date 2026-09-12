import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  FIELD_KEY,
  HARVEST,
  MILL_KEY,
  millYield,
  PAYLOADS,
  STAGES,
  type HarvestStageId,
} from "@/data/harvest";
import { DOCTRINE } from "@/data/doctrine";
import { cn } from "@/lib/utils";

function readIds(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

export function HarvestSchematic() {
  const [cut, setCut] = useState<HarvestStageId[]>([]);
  const [stageId, setStageId] = useState<HarvestStageId>("drain");
  const [fieldSeated, setFieldSeated] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readIds(MILL_KEY).filter((id): id is HarvestStageId =>
      STAGES.some((s) => s.id === id),
    );
    const wire = (() => {
      try {
        return window.localStorage.getItem("jawnbryte:wire");
      } catch {
        return null;
      }
    })();
    if (stored.length) setCut(stored);
    else if (wire === "dead") setCut(STAGES.map((s) => s.id));
    setFieldSeated(readIds(FIELD_KEY).length);
    setReady(true);
  }, []);

  function persist(next: HarvestStageId[]) {
    setCut(next);
    try {
      window.localStorage.setItem(MILL_KEY, JSON.stringify(next));
      window.localStorage.setItem(
        "jawnbryte:wire",
        next.length === STAGES.length ? "dead" : "live",
      );
    } catch {
      /* ignore */
    }
  }

  function setAll(dead: boolean) {
    persist(dead ? STAGES.map((s) => s.id) : []);
  }

  function toggleCut(id: HarvestStageId) {
    persist(cut.includes(id) ? cut.filter((x) => x !== id) : [...cut, id]);
  }

  const feeding = STAGES.length - cut.length;
  const dead = feeding === 0;
  const fullyLive = feeding === STAGES.length;
  const grid = millYield(feeding, fieldSeated);
  const self = 100 - grid;
  const stage = STAGES.find((s) => s.id === stageId) ?? STAGES[0]!;
  const stageCut = cut.includes(stage.id);
  const fieldStep = DOCTRINE.field.find((s) => s.n === stage.field);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div
          role="group"
          aria-label="Circuit polarity"
          className="inline-flex rounded-md p-1 shadow-[0_0_0_1px_rgb(232_228_220/0.12)]"
        >
          <PolarityButton
            active={fullyLive}
            label="Live circuit"
            onClick={() => setAll(false)}
          />
          <PolarityButton
            active={dead}
            label="Dead wire"
            onClick={() => setAll(true)}
            dead
          />
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2 md:max-w-md">
          <Meter
            label="Grid yield"
            value={grid}
            tone={dead ? "muted" : "danger"}
          />
          <Meter
            label="Self voltage"
            value={self}
            tone={dead ? "gold" : feeding < 3 ? "gold" : "muted"}
          />
        </div>
      </div>

      <p className="mt-5 max-w-2xl font-display text-lg italic leading-snug text-gold-bright">
        {dead ? HARVEST.dead : fullyLive ? HARVEST.charge : HARVEST.close}
      </p>
      <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
        {ready
          ? `${feeding} / ${STAGES.length} functions feeding`
          : "Mill"}
        {fieldSeated
          ? ` · field protocol ${fieldSeated} / ${DOCTRINE.field.length} seated`
          : ""}
      </p>

      <Siphon feeding={feeding} total={STAGES.length} />

      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {STAGES.map((s) => {
          const off = cut.includes(s.id);
          const selected = stageId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStageId(s.id)}
              className={cn(
                "flex min-h-11 flex-col items-start rounded-md px-3 py-3 text-left transition-[color,box-shadow,background-color,opacity] duration-150",
                selected &&
                  (off
                    ? "bg-elevated shadow-[0_0_0_1px_rgb(196_165_116/0.5)]"
                    : "bg-elevated shadow-[0_0_0_1px_rgb(180_84_74/0.55)]"),
                !selected &&
                  "shadow-[0_0_0_1px_rgb(232_228_220/0.1)] hover:bg-elevated",
                off && "opacity-70",
              )}
            >
              <span className="flex w-full items-center justify-between gap-2">
                <span className="font-mono text-[0.6875rem] text-gold">
                  {s.n}
                </span>
                <span
                  className={cn(
                    "font-mono text-[0.625rem] uppercase tracking-[0.14em]",
                    off ? "text-gold" : "text-danger",
                  )}
                >
                  {off ? "Cut" : "Feeding"}
                </span>
              </span>
              <span className="mt-1 font-display text-lg tracking-wide">
                {s.verb}
              </span>
              <span className="mt-1 text-[0.75rem] leading-snug text-muted">
                {s.role}
              </span>
            </button>
          );
        })}
      </div>
      <div
        className={cn(
          "mt-3 hidden h-0.5 w-full lg:block",
          dead ? "harvest-flow-dead" : "harvest-flow",
        )}
        aria-hidden="true"
      />
      <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
        Strike the class in front of you. Open a function, then cut it.
      </p>

      <article className="mt-8 rounded-xl bg-surface p-6 shadow-[0_0_0_1px_rgb(232_228_220/0.1)] md:p-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          {stage.n} · {stage.face}
          {stageCut ? " · cut" : " · feeding"}
        </p>
        <h3 className="mt-2 font-display text-2xl tracking-wide md:text-3xl">
          {stageCut ? `Break ${stage.verb.toLowerCase()}` : stage.role}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {stageCut ? stage.counter : stage.attack}
        </p>
        <p className="mt-4 max-w-2xl font-display text-sm italic leading-relaxed text-gold-bright">
          {stageCut ? stage.sig : stage.loop}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={() => toggleCut(stage.id)}
            className={cn(
              "inline-flex h-11 items-center rounded-md px-4 font-medium transition-[transform,background-color] duration-150 active:scale-[0.96]",
              stageCut
                ? "bg-elevated text-fg shadow-[0_0_0_1px_rgb(232_228_220/0.14)] hover:bg-surface"
                : "bg-gold text-ink hover:bg-gold-bright",
            )}
          >
            {stageCut ? "Restore feed" : "Cut this function"}
          </button>
          {stage.slug ? (
            <Link
              to="/track/$slug"
              params={{ slug: stage.slug }}
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
            >
              Open the track
            </Link>
          ) : null}
          {fieldStep ? (
            <Link
              to="/crash"
              hash="field"
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              Field {fieldStep.n} · {fieldStep.t}
            </Link>
          ) : null}
        </div>
      </article>

      <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
        Payload
      </h3>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Four oils. Each dies when its function is cut. Yield is the banquet.
      </p>
      <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2">
        {PAYLOADS.map((p) => {
          const off = cut.includes(p.stage);
          const yieldCut = cut.includes("yield");
          const value = off ? (yieldCut ? 6 : 14) : yieldCut ? 42 : 88;
          return (
            <li key={p.t} className="bg-bg p-6">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-lg">{p.t}</p>
                <p className="font-mono text-[0.6875rem] tabular-nums text-subtle">
                  {value}%
                </p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div
                  className={cn(
                    "h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    off ? "bg-subtle" : "bg-gold",
                  )}
                  style={{ width: `${value}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.d}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PolarityButton({
  active,
  label,
  onClick,
  dead,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  dead?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-11 rounded-sm px-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] duration-150",
        "transition-[background-color,color]",
        active && !dead && "bg-danger text-fg",
        active && dead && "bg-gold text-ink",
        !active && "text-muted hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}

function Meter({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "gold" | "danger" | "muted";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
          {label}
        </p>
        <p className="font-mono text-sm tabular-nums text-fg">{value}%</p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-elevated">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            tone === "gold" && "bg-gold",
            tone === "danger" && "bg-danger",
            tone === "muted" && "bg-subtle",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Siphon({ feeding, total }: { feeding: number; total: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const t = feeding / total;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const particles = Array.from({ length: 28 }, (_, i) => ({
      p: i / 28,
      speed: 0.003 + (i % 5) * 0.0007,
    }));

    let raf = 0;
    const gold = { r: 196, g: 165, b: 116 };
    const danger = { r: 180, g: 84, b: 74 };
    const reverse = t <= 0.02;
    const speed = 0.35 + t * 0.9;

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const pad = w * 0.12;
      const y = h * 0.52;
      const left = pad;
      const right = w - pad;

      ctx.strokeStyle = "rgba(232,228,220,0.12)";
      ctx.lineWidth = Math.max(1, w * 0.004);
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.bezierCurveTo(w * 0.35, h * 0.18, w * 0.65, h * 0.82, right, y);
      ctx.stroke();

      well(ctx, left, y, h * 0.22, 0.9 - t * 0.55, gold);
      well(
        ctx,
        right,
        y,
        h * 0.22,
        0.18 + t * 0.72,
        reverse ? gold : danger,
      );

      if (!reduce) {
        const count = reverse ? particles.length : Math.max(6, Math.round(8 + t * 20));
        for (let i = 0; i < count; i++) {
          const p = particles[i]!;
          p.p = (p.p + (reverse ? -p.speed * 0.85 : p.speed * speed) + 1) % 1;
          const pt = bezier(
            left,
            y,
            w * 0.35,
            h * 0.18,
            w * 0.65,
            h * 0.82,
            right,
            y,
            p.p,
          );
          const alpha = reverse
            ? 0.15 + (1 - p.p) * 0.5
            : 0.2 + t * 0.35 + p.p * 0.4;
          ctx.fillStyle = `rgba(${gold.r},${gold.g},${gold.b},${alpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(1.2, w * 0.0045), 0, Math.PI * 2);
          ctx.fill();
        }
      }

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
  }, [t]);

  return (
    <div className="mt-8 overflow-hidden rounded-xl bg-elevated shadow-[0_0_0_1px_rgb(232_228_220/0.08)]">
      <div className="flex justify-between px-4 pt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle md:px-6">
        <span>Self</span>
        <span>
          {reverseLabel(t)}
        </span>
        <span>Grid</span>
      </div>
      <canvas ref={ref} className="h-36 w-full md:h-44" aria-hidden="true" />
    </div>
  );
}

function reverseLabel(t: number) {
  if (t <= 0.02) return "Voltage returning";
  if (t < 0.5) return "Siphon weakening";
  return "Siphon → mill";
}

function well(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fill: number,
  rgb: { r: number; g: number; b: number },
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.45)`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, r * fill, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${0.18 + fill * 0.35})`;
  ctx.fill();
}

function bezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  t: number,
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * x1 + 3 * uu * t * x2 + 3 * u * tt * x3 + ttt * x4,
    y: uuu * y1 + 3 * uu * t * y2 + 3 * u * tt * y3 + ttt * y4,
  };
}
