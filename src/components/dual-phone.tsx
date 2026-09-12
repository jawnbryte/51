import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Kind = "kick" | "snare" | "ghost" | "hat" | "ohat" | "tom" | "accent";
type Hand = "L" | "R";

type Pad = {
  id: string;
  label: string;
  kind: Kind;
  key: string;
};

type Hit = {
  id: number;
  hand: Hand;
  kind: Kind;
  at: number;
};

const LEFT: Pad[] = [
  { id: "ch", label: "Closed hat", kind: "hat", key: "A" },
  { id: "oh", label: "Open hat", kind: "ohat", key: "S" },
  { id: "tom", label: "Tom", kind: "tom", key: "D" },
  { id: "acc", label: "Accent", kind: "accent", key: "F" },
];

const RIGHT: Pad[] = [
  { id: "kick", label: "Kick", kind: "kick", key: "J" },
  { id: "snr", label: "Snare", kind: "snare", key: "K" },
  { id: "gst", label: "Ghost", kind: "ghost", key: "L" },
  { id: "time", label: "Time", kind: "kick", key: ";" },
];

const KEY_MAP: Record<string, { pad: Pad; hand: Hand }> = {};
for (const p of LEFT) KEY_MAP[p.key] = { pad: p, hand: "L" };
for (const p of RIGHT) KEY_MAP[p.key] = { pad: p, hand: "R" };

const DRILLS = [
  {
    id: "free",
    t: "Free hands",
    d: "No grid. Two clocks. Play both phones.",
    latency: 28,
    swing: 18,
    pulse: null as null | "poly",
  },
  {
    id: "latency",
    t: "Cross-latency",
    d: "Right device sits 56 ms behind. That delay is the swing.",
    latency: 56,
    swing: 8,
    pulse: null,
  },
  {
    id: "swing",
    t: "Dual swing",
    d: "Left stays straight. Right drifts. Drunken producer feel.",
    latency: 18,
    swing: 36,
    pulse: null,
  },
  {
    id: "flam",
    t: "Flam window",
    d: "Strike both hands close. The offset becomes a flam, not a mistake.",
    latency: 22,
    swing: 12,
    pulse: null,
  },
  {
    id: "poly",
    t: "4 against 3",
    d: "Soft pulse: four on the left, three on the right. Play through it.",
    latency: 24,
    swing: 14,
    pulse: "poly",
  },
] as const;

class DualEngine {
  ctx: AudioContext | null = null;
  latency = 28;
  swing = 18;

  arm() {
    if (!this.ctx) this.ctx = new AudioContext();
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  hit(kind: Kind, hand: Hand) {
    const ctx = this.arm();
    const extra =
      hand === "R" ? this.latency / 1000 + (this.swing / 1000) * 0.6 : 0;
    const t = ctx.currentTime + extra;
    switch (kind) {
      case "kick":
        this.kick(ctx, t, hand === "R" ? 0.35 : -0.15);
        break;
      case "snare":
        this.noise(ctx, t, 0.55, 1800, 0.09, 0.45);
        this.tone(ctx, t, 190, 0.08, 0.22, 0.45);
        break;
      case "ghost":
        this.noise(ctx, t, 0.18, 2200, 0.05, 0.4);
        break;
      case "hat":
        this.noise(ctx, t, 0.22, 7000, 0.035, -0.55);
        break;
      case "ohat":
        this.noise(ctx, t, 0.28, 6500, 0.18, -0.5);
        break;
      case "tom":
        this.tone(ctx, t, 112, 0.16, 0.28, -0.4);
        break;
      case "accent":
        this.noise(ctx, t, 0.2, 4200, 0.06, -0.35);
        this.tone(ctx, t, 320, 0.05, 0.12, -0.3);
        break;
    }
  }

  click(hand: Hand) {
    const ctx = this.arm();
    const t = ctx.currentTime;
    this.tone(ctx, t, hand === "L" ? 880 : 660, 0.04, 0.07, hand === "L" ? -0.6 : 0.6);
  }

  kick(ctx: AudioContext, t: number, pan: number) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const p = ctx.createStereoPanner();
    o.type = "sine";
    o.frequency.setValueAtTime(148, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    p.pan.value = pan;
    o.connect(g).connect(p).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.3);
  }

  tone(
    ctx: AudioContext,
    t: number,
    freq: number,
    dur: number,
    gain: number,
    pan: number,
  ) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const p = ctx.createStereoPanner();
    o.type = "triangle";
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(freq * 0.7, 40), t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    p.pan.value = pan;
    o.connect(g).connect(p).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  noise(
    ctx: AudioContext,
    t: number,
    gain: number,
    hp: number,
    dur: number,
    pan: number,
  ) {
    const n = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = hp;
    const g = ctx.createGain();
    const p = ctx.createStereoPanner();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    p.pan.value = pan;
    src.connect(filter).connect(g).connect(p).connect(ctx.destination);
    src.start(t);
  }
}

export function DualPhone() {
  const engine = useRef(new DualEngine());
  const lastL = useRef(0);
  const lastR = useRef(0);
  const seq = useRef(0);
  const [armed, setArmed] = useState(false);
  const [latency, setLatency] = useState(28);
  const [swing, setSwing] = useState(18);
  const [flash, setFlash] = useState<string | null>(null);
  const [drill, setDrill] = useState<(typeof DRILLS)[number]>(DRILLS[0]);
  const [hits, setHits] = useState<Hit[]>([]);
  const [flam, setFlam] = useState<number | null>(null);

  useEffect(() => {
    engine.current.latency = latency;
    engine.current.swing = swing;
  }, [latency, swing]);

  useEffect(() => {
    if (drill.pulse !== "poly" || !armed) return;
    let live = true;
    let n = 0;
    const step = 160;
    const id = window.setInterval(() => {
      if (!live) return;
      if (n % 3 === 0) engine.current.click("L");
      if (n % 4 === 0) engine.current.click("R");
      n += 1;
    }, step);
    return () => {
      live = false;
      window.clearInterval(id);
    };
  }, [drill, armed]);

  const strikeRef = useRef<(pad: Pad, hand: Hand) => void>(() => {});

  function strike(pad: Pad, hand: Hand) {
    const now = performance.now();
    engine.current.hit(pad.kind, hand);
    setArmed(true);
    setFlash(pad.id);
    window.setTimeout(() => setFlash((id) => (id === pad.id ? null : id)), 110);
    if (hand === "L") lastL.current = now;
    else lastR.current = now;
    const gap = Math.abs(lastL.current - lastR.current);
    if (gap > 0 && gap < 90 && lastL.current && lastR.current) {
      setFlam(Math.round(gap));
      window.setTimeout(() => setFlam(null), 700);
    }
    seq.current += 1;
    const hit: Hit = { id: seq.current, hand, kind: pad.kind, at: now };
    setHits((prev) => [...prev.slice(-17), hit]);
  }

  strikeRef.current = strike;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const code = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      const mapped = KEY_MAP[code];
      if (!mapped) return;
      e.preventDefault();
      strikeRef.current(mapped.pad, mapped.hand);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function applyDrill(next: (typeof DRILLS)[number]) {
    setDrill(next);
    setLatency(next.latency);
    setSwing(next.swing);
  }

  const active = DRILLS.find((d) => d.id === drill.id) ?? DRILLS[0];

  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_rgb(196_165_116/0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/35 px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold md:px-6">
        <span>Two-phone drum engine · live bench</span>
        <span>
          {flam != null
            ? `Flam · ${flam} ms`
            : armed
              ? "Armed · two clocks"
              : "Tap a pad or key to arm"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-line px-5 py-3 md:px-6">
        {DRILLS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => applyDrill(d)}
            className={cn(
              "h-9 px-3 font-mono text-[0.625rem] uppercase tracking-[0.14em]",
              d.id === active.id
                ? "bg-gold/15 text-gold shadow-[0_0_0_1px_rgb(196_165_116/0.5)]"
                : "text-muted shadow-[0_0_0_1px_rgb(232_228_220/0.16)] hover:text-gold",
            )}
          >
            {d.t}
          </button>
        ))}
      </div>

      <p className="border-b border-line px-5 py-3 text-sm leading-relaxed text-muted md:px-6">
        {active.d} Keyboard split: A S D F left · J K L ; right. Two devices.
        No shared clock.
      </p>

      <div className="grid gap-8 p-5 md:grid-cols-2 md:p-8">
        <Phone
          hand="L"
          kicker="Left · hats · toms · accents"
          pads={LEFT}
          flash={flash}
          onHit={(p) => strike(p, "L")}
        />
        <Phone
          hand="R"
          kicker="Right · kicks · snares · time"
          pads={RIGHT}
          flash={flash}
          onHit={(p) => strike(p, "R")}
        />
      </div>

      <StereoLane hits={hits} />

      <div className="grid gap-6 border-t border-line px-5 py-5 md:grid-cols-2 md:px-8">
        <Slider
          label="Cross-latency"
          value={latency}
          min={0}
          max={80}
          unit="ms"
          hint="Right device delay. The offset is the engine."
          onChange={setLatency}
        />
        <Slider
          label="Dual swing"
          value={swing}
          min={0}
          max={48}
          unit="ms"
          hint="Right hand drifts. Left stays straight."
          onChange={setSwing}
        />
      </div>
    </div>
  );
}

function StereoLane({ hits }: { hits: Hit[] }) {
  return (
    <div className="border-t border-line px-5 py-4 md:px-8">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
        Stereo drift · last strikes
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {(["L", "R"] as const).map((hand) => (
          <div key={hand} className="flex h-10 items-end gap-1 bg-ink px-2 py-1">
            {hits
              .filter((h) => h.hand === hand)
              .slice(-12)
              .map((h) => (
                <span
                  key={h.id}
                  className="w-1.5 bg-gold"
                  style={{
                    height: h.kind === "kick" || h.kind === "snare" ? "100%" : "55%",
                    opacity: h.kind === "ghost" || h.kind === "hat" ? 0.45 : 0.95,
                  }}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Phone({
  hand,
  kicker,
  pads,
  flash,
  onHit,
}: {
  hand: Hand;
  kicker: string;
  pads: Pad[];
  flash: string | null;
  onHit: (pad: Pad) => void;
}) {
  return (
    <div>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
        {kicker}
      </p>
      <div className="carbon mt-3 rounded-[1.75rem] p-3 shadow-[0_0_0_1px_rgb(196_165_116/0.4),inset_0_0_0_8px_rgb(8_8_8)]">
        <div className="grid grid-cols-2 gap-2 rounded-[1.15rem] bg-ink p-3">
          {pads.map((pad) => {
            const hot = flash === pad.id;
            return (
              <button
                key={pad.id}
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  onHit(pad);
                }}
                className={cn(
                  "flex aspect-square touch-none flex-col items-center justify-center rounded-xl font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-[transform,background-color,box-shadow] duration-75",
                  hot
                    ? "scale-[0.97] bg-gold text-ink shadow-[0_0_24px_rgb(196_165_116/0.45)]"
                    : "bg-elevated text-muted shadow-[0_0_0_1px_rgb(196_165_116/0.28)] hover:text-gold-bright",
                )}
              >
                <span className="text-[0.5625rem] text-gold">
                  {hand} · {pad.key}
                </span>
                <span className="mt-1">{pad.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  unit,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  hint: string;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
        <span className="text-subtle">{label}</span>
        <span className="text-gold">
          {value} {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-gold"
      />
      <span className="mt-2 block text-sm leading-relaxed text-muted">
        {hint}
      </span>
    </label>
  );
}
