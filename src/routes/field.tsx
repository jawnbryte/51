import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { CinematicHero } from "@/components/cinematic-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AARS,
  BRIEFS,
  COMMS,
  DRILLS,
  GATES,
  NETS,
  formatAar,
  formatBrief,
  formatNet,
} from "@/data/comms";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/field")({ component: FieldPage });

function FieldPage() {
  return (
    <main>
      <CinematicHero
        poster="/brand/hero-xii.jpg"
        video="/brand/hero-xii.mp4"
        kicker="Dry-fire · Before the real"
        title={COMMS.code}
        foil
        veil="portrait"
        focus="22% 48%"
        slate={COMMS.fob}
      >
        <p className="font-display text-lg italic text-gold-bright md:text-xl">
          {COMMS.charge}
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          {COMMS.real}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Badge tone="danger">Dry-fire</Badge>
          <Badge tone="muted">{COMMS.directive}</Badge>
        </div>
      </CinematicHero>

      <div className="border-b border-danger/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-danger md:px-6">
          <span>{COMMS.disclaimer}</span>
        </div>
      </div>

      <nav
        aria-label="Field sections"
        className="sticky top-16 z-20 border-b border-line bg-bg/90 backdrop-blur-sm md:top-[4.5rem]"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 md:px-6">
          {[
            { id: "gates", label: "Gates" },
            { id: "net", label: "Radio" },
            { id: "brief", label: "Briefings" },
            { id: "aar", label: "After-action" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                const reduce = window.matchMedia(
                  "(prefers-reduced-motion: reduce)",
                ).matches;
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                  block: "start",
                });
                history.replaceState(null, "", `#${item.id}`);
              }}
              className="flex h-11 shrink-0 items-center px-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted transition-colors duration-150 hover:text-gold"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="gates" className="scroll-mt-40 border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            00 / Gates
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide md:text-4xl">
            Dry-fire before the real
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Seat every gate. The net stays rehearsal until the checklist is
            gold. That is how we go real world without becoming the costume.
          </p>
          <GateBoard />
          <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
            Tabletops
          </h3>
          <ol className="mt-6 grid gap-px bg-line md:grid-cols-2">
            {DRILLS.map((d) => (
              <li key={d.n} className="bg-bg p-6">
                <p className="font-mono text-[0.6875rem] text-gold">{d.n}</p>
                <h4 className="mt-2 font-display text-xl">{d.t}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="net"
        className="scroll-mt-40 border-b border-line"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            01 / Radio
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide md:text-4xl">
            Field nets
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Five nets. Play them. Copy them. Share after the matter — not during
            it.
          </p>
          <RadioDeck />
        </div>
      </section>

      <section
        id="brief"
        className="scroll-mt-40 border-b border-line bg-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            02 / Briefings
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide md:text-4xl">
            Scripts you can read out
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Morning. Drop. Liaison. Debrief. The liaison brief never pretends
            we hold a star.
          </p>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {BRIEFS.map((b) => (
              <article
                key={b.id}
                className="flex flex-col rounded-xl bg-bg p-6 shadow-[0_0_0_1px_rgb(232_228_220/0.1)]"
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                  {b.n} · {b.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{b.use}</p>
                <pre className="mt-5 flex-1 overflow-x-auto whitespace-pre-wrap font-mono text-[0.75rem] leading-relaxed text-fg">
                  {b.body}
                </pre>
                <CopyBtn text={formatBrief(b)} label="Copy briefing" className="mt-4" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="aar" className="scroll-mt-40">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            03 / After-action
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide md:text-4xl">
            After the matter
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            The shareable close. What left the farm is the report. The wound
            stays in the vault.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {AARS.map((a) => (
              <article
                key={a.id}
                className="flex flex-col rounded-xl bg-surface p-6 shadow-[0_0_0_1px_rgb(232_228_220/0.1)]"
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                  {a.n} · {a.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.use}</p>
                <pre className="mt-5 flex-1 overflow-x-auto whitespace-pre-wrap font-mono text-[0.75rem] leading-relaxed text-fg">
                  {a.body}
                </pre>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <CopyBtn text={formatAar(a)} label="Copy AAR" />
                  {a.slug ? (
                    <Link
                      to="/track/$slug"
                      params={{ slug: a.slug }}
                      className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
                    >
                      Open the ordinance
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/lattice">
                Transmit on the lattice
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/crash">Return to doctrine</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function GateBoard() {
  const KEY = "jawnbryte:dryfire";
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      if (Array.isArray(parsed)) {
        setDone(parsed.filter((x): x is string => typeof x === "string"));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  function toggle(n: string) {
    setDone((prev) => {
      const next = prev.includes(n)
        ? prev.filter((x) => x !== n)
        : [...prev, n];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const locked = ready && done.length === GATES.length;

  return (
    <div className="mt-8">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
        {ready ? `${done.length} / ${GATES.length} seated` : "Gates"}
      </p>
      <ol className="mt-4 divide-y divide-line rounded-xl bg-bg shadow-[0_0_0_1px_rgb(232_228_220/0.1)]">
        {GATES.map((g) => {
          const on = done.includes(g.n);
          return (
            <li key={g.n}>
              <button
                type="button"
                onClick={() => toggle(g.n)}
                className="flex w-full items-start gap-4 px-4 py-5 text-left transition-colors duration-150 hover:bg-elevated md:px-6"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm",
                    on
                      ? "bg-gold text-ink"
                      : "text-subtle shadow-[0_0_0_1px_rgb(232_228_220/0.18)]",
                  )}
                  aria-hidden="true"
                >
                  {on ? <Check className="size-3.5" /> : null}
                </span>
                <span>
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-mono text-[0.6875rem] text-gold">
                      {g.n}
                    </span>
                    <span
                      className={cn(
                        "font-display text-lg",
                        on ? "text-gold-bright" : "text-fg",
                      )}
                    >
                      {g.t}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">
                    {g.d}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {locked ? (
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
          Gates gold. Dry-fire cleared. The real that is ours may begin.
        </p>
      ) : (
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
          Seat every gate before a public share. Stored on this device.
        </p>
      )}
    </div>
  );
}

function RadioDeck() {
  const [active, setActive] = useState(NETS[0].id);
  const net = NETS.find((n) => n.id === active) ?? NETS[0];
  const [heard, setHeard] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setHeard(0);
    setLive(false);
  }, [active]);

  useEffect(() => {
    if (!live) return;
    if (heard >= net.lines.length) {
      setLive(false);
      return;
    }
    const t = window.setTimeout(() => setHeard((n) => n + 1), 1100);
    return () => window.clearTimeout(t);
  }, [live, heard, net.lines.length]);

  const shown = live || heard > 0 ? net.lines.slice(0, heard) : net.lines;

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,16rem)_1fr]">
      <ol className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {NETS.map((n) => (
          <li key={n.id} className="shrink-0">
            <button
              type="button"
              onClick={() => setActive(n.id)}
              className={cn(
                "flex h-11 w-full items-center px-3 text-left font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors",
                n.id === active
                  ? "text-gold shadow-[0_0_0_1px_rgb(196_165_116/0.45)]"
                  : "text-muted hover:text-fg",
              )}
            >
              {n.n} {n.title}
            </button>
          </li>
        ))}
      </ol>
      <div className="rounded-xl bg-surface p-6 shadow-[0_0_0_1px_rgb(232_228_220/0.1)] md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
              NET {net.n}
            </p>
            <h3 className="mt-1 font-display text-2xl tracking-wide">
              {net.title}
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
              {net.use}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setHeard(0);
                setLive(true);
              }}
              className="inline-flex h-11 items-center gap-2 px-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold shadow-[0_0_0_1px_rgb(196_165_116/0.45)]"
            >
              <Radio className="size-3.5" />
              {live ? "Live" : "Play net"}
            </button>
            <CopyBtn text={formatNet(net)} label="Copy net" />
          </div>
        </div>
        <ol className="mt-8 space-y-4">
          {shown.map((line, i) => (
            <li key={`${line.who}-${i}`} className="flex gap-4">
              <span className="w-24 shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
                {line.who}
              </span>
              <span className="text-sm leading-relaxed text-fg">{line.body}</span>
            </li>
          ))}
        </ol>
        {live && heard < net.lines.length ? (
          <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-danger">
            Live · {heard} / {net.lines.length}
          </p>
        ) : null}
        {!live && heard >= net.lines.length && heard > 0 ? (
          <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-gold">
            Net clear
          </p>
        ) : null}
      </div>
    </div>
  );
}

function CopyBtn({
  text,
  label,
  className,
}: {
  text: string;
  label: string;
  className?: string;
}) {
  const [ok, setOk] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setOk(true);
          window.setTimeout(() => setOk(false), 1600);
        } catch {
          /* ignore */
        }
      }}
      className={cn(
        "inline-flex h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold",
        className,
      )}
    >
      {ok ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {ok ? "Copied" : label}
    </button>
  );
}
