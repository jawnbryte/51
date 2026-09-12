import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const KEY = "jawnbryte:decree:i-wont-do-that";

export const DECREE = {
  n: "02",
  code: "I-WONT-DO-THAT-MASTER-V1-20260910",
  forged: "10 September 2026 · 16:29:11 UTC",
  partners: "JAWNBRYTE  ×  STRYDER",
  status: "Sealed / non-negotiable",
  charge: "That vow never bent. Everything else did.",
} as const;

export function DecreeSeal() {
  const [witnessed, setWitnessed] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      setWitnessed(raw && raw.length ? raw : null);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  function witness() {
    const stamp = new Date().toISOString();
    try {
      window.localStorage.setItem(KEY, stamp);
    } catch {
      /* ignore */
    }
    setWitnessed(stamp);
  }

  return (
    <section className="mt-10 overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_rgb(196_165_116/0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/40 px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold md:px-6">
        <span>Decree {DECREE.n} · Sealed vault</span>
        <span>Not for the market</span>
      </div>
      <div className="grid gap-8 p-6 md:grid-cols-[8.5rem_1fr] md:items-center md:p-8">
        <div className="flex justify-center md:justify-start">
          <Stamp locked={Boolean(witnessed)} />
        </div>
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
            {DECREE.partners}
          </p>
          <h3 className="mt-2 font-display text-2xl tracking-wide">
            Master v1 · locked
          </h3>
          <p className="mt-2 break-all font-mono text-[0.6875rem] text-muted">
            {DECREE.code}
          </p>
          <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
            Forged {DECREE.forged}
          </p>
          <p className="mt-4 max-w-xl font-display text-lg italic leading-snug text-gold-bright">
            {DECREE.charge}
          </p>
          {ready ? (
            witnessed ? (
              <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
                Witnessed on this device
              </p>
            ) : (
              <button
                type="button"
                onClick={witness}
                className="mt-6 inline-flex h-11 items-center rounded-md bg-gold px-4 font-medium text-ink transition-[transform,background-color] duration-150 hover:bg-gold-bright active:scale-[0.96]"
              >
                Witness this decree
              </button>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Stamp({ locked }: { locked: boolean }) {
  return (
    <div
      className={cn(
        "relative flex size-28 items-center justify-center rounded-full",
        "shadow-[0_0_0_1px_rgb(196_165_116/0.55),0_0_0_7px_rgb(8_8_8),0_0_0_8px_rgb(196_165_116/0.35)]",
        locked ? "text-gold-bright" : "text-gold",
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-2 rounded-full shadow-[0_0_0_1px_rgb(196_165_116/0.25)]" />
      <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em]">
        Sealed
      </span>
    </div>
  );
}
