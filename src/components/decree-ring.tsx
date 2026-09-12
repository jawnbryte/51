import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { READY_CHECKS, STAGES7 } from "@/data/decree-protocol";

const STAGE_KEY = "jawnbryte:decree:stage";
const READY_KEY = "jawnbryte:decree:ready";

export function DecreeRing() {
  const [active, setActive] = useState(0);
  const stage = STAGES7[active];

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STAGE_KEY);
      const n = raw ? Number(raw) : 0;
      if (n >= 0 && n < STAGES7.length) setActive(n);
    } catch {
      /* ignore */
    }
  }, []);

  function select(i: number) {
    setActive(i);
    try {
      window.localStorage.setItem(STAGE_KEY, String(i));
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_rgb(196_165_116/0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/35 px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold md:px-6">
        <span>7-stage protocol · lived spark to closed archive</span>
        <span>
          {stage.n} / 07 · {stage.t}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-7">
        {STAGES7.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.n}
              type="button"
              onClick={() => select(i)}
              aria-pressed={on}
              className={cn(
                "flex min-h-24 flex-col items-start justify-between p-4 text-left transition-colors duration-150",
                on ? "bg-gold/15 text-gold-bright" : "bg-bg text-muted hover:text-fg",
              )}
            >
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold">
                {s.n}
              </span>
              <span className="mt-3 font-display text-base tracking-wide text-fg">
                {s.t}
              </span>
            </button>
          );
        })}
      </div>
      <div className="border-t border-line p-6 md:p-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
          {stage.k}
        </p>
        <h3 className="mt-2 font-display text-2xl tracking-wide">
          {stage.n} · {stage.t}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {stage.d}
        </p>
      </div>
    </div>
  );
}

export function ReadinessBoard() {
  const [on, setOn] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(READY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        if (Array.isArray(parsed)) setOn(parsed);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  function toggle(id: string) {
    setOn((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        window.localStorage.setItem(READY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const sealed = on.length === READY_CHECKS.length;

  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_rgb(196_165_116/0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/35 px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold md:px-6">
        <span>Readiness dashboard</span>
        <span>
          {sealed ? "Clear to seal" : `${on.length} / ${READY_CHECKS.length} seated`}
        </span>
      </div>
      <ul className="divide-y divide-line">
        {READY_CHECKS.map((c) => {
          const seated = on.includes(c.id);
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => toggle(c.id)}
                aria-pressed={seated}
                className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6"
              >
                <span
                  className={cn(
                    "inline-flex h-8 min-w-16 items-center justify-center rounded-sm font-mono text-[0.625rem] uppercase tracking-[0.16em]",
                    seated
                      ? "bg-gold/15 text-gold shadow-[0_0_0_1px_rgb(196_165_116/0.5)]"
                      : "text-subtle shadow-[0_0_0_1px_rgb(232_228_220/0.16)]",
                  )}
                >
                  {ready ? (seated ? "On" : "Pending") : "—"}
                </span>
                <span className="text-sm text-fg">{c.t}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-line px-5 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted md:px-6">
        {sealed
          ? "Decree sealing / JAWNBRYTE / live master"
          : "A visible pending field tells the truth."}
      </p>
    </div>
  );
}
