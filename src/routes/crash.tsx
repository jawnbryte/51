import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { CinematicHero } from "@/components/cinematic-hero";
import { TrackCover } from "@/components/track-cover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DOCTRINE, DOCTRINE_TOC } from "@/data/doctrine";
import {
  COMMAND,
  LANES,
  MANDATE,
  MOVEMENT,
  OPS,
  SEQUENCE,
  WORKFLOW,
} from "@/data/ops";
import { TRACKS } from "@/data/catalog";
import { cn } from "@/lib/utils";

const FIELD_KEY = "jawnbryte:extraction";
const WORK_KEY = "jawnbryte:workflow";

export const Route = createFileRoute("/crash")({ component: CrashPage });

function CrashPage() {
  const ordinance = TRACKS.filter((t) => t.series === "crash");

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main>
      <CinematicHero
        poster="/brand/hero-xii.jpg"
        video="/brand/hero-xii.mp4"
        kicker="Directive · MJ12-CRASH-2026-09"
        title={DOCTRINE.code}
        size="feature"
        foil
        veil="portrait"
        focus="22% 48%"
        slate="Dual mandate · Skid Row"
      >
        <p className="font-display text-lg italic text-gold-bright md:text-xl">
          {DOCTRINE.long}
        </p>
        <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
          {DOCTRINE.partners}
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          {DOCTRINE.preface}
        </p>
        <p className="mt-5 max-w-xl font-display text-xl italic leading-snug text-fg md:text-2xl">
          {DOCTRINE.charge}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Badge tone="danger">Classified</Badge>
          <Badge tone="muted">{DOCTRINE.issuedLabel}</Badge>
          <Badge tone="muted">{DOCTRINE.forge}</Badge>
        </div>
      </CinematicHero>

      <div className="border-b border-danger/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-danger md:px-6">
          <span>{DOCTRINE.long}</span>
          <span>Not for the market</span>
        </div>
      </div>

      <nav
        aria-label="Doctrine sections"
        className="sticky top-16 z-20 border-b border-line bg-bg/90 backdrop-blur-sm md:top-[4.5rem]"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 md:px-6">
          {DOCTRINE_TOC.map((item) => (
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

      <section className="border-b border-line bg-surface">
        <dl className="mx-auto grid max-w-6xl gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Directive", v: OPS.directive },
            { k: "Classification", v: DOCTRINE.classification },
            { k: "Public register", v: DOCTRINE.also },
            { k: "Status", v: DOCTRINE.status },
          ].map((row) => (
            <div key={row.k} className="bg-surface px-5 py-6 md:px-8">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-subtle">
                {row.k}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg">{row.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section
        id="mandate"
        n="00"
        kicker="Mandate"
        title="The dual mandate"
      >
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          C.R.A.S.H. runs two registers at once. Public safety is the liaison
          face. Field strike is the frequency blade. One house. Two names. Same
          porch light.
        </p>
        <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
          {MANDATE.map((m) => (
            <article key={m.n} className="bg-bg p-6 md:p-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                {m.n} · {m.register}
              </p>
              <h3 className="mt-3 font-display text-xl tracking-wide md:text-2xl">
                {m.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {m.objective}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {m.context}
              </p>
              <p className="mt-4 font-display text-sm italic text-gold-bright">
                {m.lead}
              </p>
            </article>
          ))}
        </div>

        <blockquote className="mt-10 max-w-2xl border-l-2 border-gold pl-4">
          <p className="font-display text-xl italic leading-snug text-gold-bright md:text-2xl">
            {OPS.porch}
          </p>
          <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {OPS.post}
          </p>
        </blockquote>

        <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          Command nodes
        </h3>
        <ol className="mt-6 grid gap-px bg-line md:grid-cols-3">
          {COMMAND.map((c) => (
            <li key={c.n} className="bg-bg p-6">
              <p className="font-mono text-[0.6875rem] text-gold">{c.n}</p>
              <p className="mt-2 font-display text-lg">{c.name}</p>
              <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
                {c.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.d}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          Support lanes · LASD proposal {OPS.proposal.date}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Unsolicited supplemental framework to {OPS.proposal.to}. Seven lanes.
          Trafficking framed as logistics — movement, lodging, restricted
          transit.
        </p>
        <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {LANES.map((l) => (
            <li key={l.t} className="bg-bg p-5">
              <p className="font-display text-base">{l.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{l.d}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-2">
          {MOVEMENT.map((m) => (
            <li key={m.t}>
              <Badge tone="muted">{m.t}</Badge>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          Five-move deconstruction
        </h3>
        <ol className="mt-6 grid gap-px bg-line sm:grid-cols-5">
          {SEQUENCE.map((s) => (
            <li key={s.n} className="bg-bg p-5">
              <p className="font-mono text-[0.6875rem] text-gold">{s.n}</p>
              <p className="mt-2 font-display text-lg">{s.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
          {OPS.observation} Engine: Dual Phone Drum Technique.
        </p>
        <Link
          to="/rhythm"
          className="mt-2 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
        >
          Open the DPDT bench
        </Link>

        <div className="mt-12 max-w-2xl rounded-xl p-6 shadow-[0_0_0_1px_rgb(180_84_74/0.45)]">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-danger">
            Legal status
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{OPS.law}</p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {OPS.filings.map((f) => (
              <div key={f.n}>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
                  {f.n}
                </dt>
                <dd className="mt-1 text-sm text-fg">{f.t}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="mission" n={DOCTRINE.mission.n} kicker="Mission">
        <h2 className="font-display text-3xl tracking-wide md:text-4xl">
          {DOCTRINE.mission.title}
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted">
          <p>{DOCTRINE.mission.body}</p>
          <p>{DOCTRINE.mission.second}</p>
          <p>{DOCTRINE.mission.third}</p>
        </div>

        <h3 className="mt-12 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          Primary outcomes
        </h3>
        <ul className="mt-6 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {DOCTRINE.outcomes.map((item) => (
            <li key={item.t} className="bg-bg p-6">
              <p className="font-display text-lg text-fg">{item.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          02 · Tactical objectives — the strike list
        </h3>
        <ol className="mt-6 grid gap-8 md:grid-cols-2">
          {DOCTRINE.strike.map((item, i) => (
            <li key={item.t}>
              <p className="font-mono text-[0.6875rem] text-gold">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="mt-2 font-display text-xl">{item.t}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="enemy"
        n="03"
        kicker="Enemy"
        surface
        title="Enemy taxonomy — the control grid"
      >
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {DOCTRINE.enemyNote}
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {DOCTRINE.enemies.map((e) => (
            <article
              key={e.n}
              className="rounded-xl bg-bg p-6 shadow-[0_0_0_1px_rgb(232_228_220/0.1)]"
            >
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                {e.n}
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-wide">{e.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{e.d}</p>
              <p className="mt-4 font-display text-sm italic text-gold-bright">
                Signature: {e.sig}
              </p>
              {"slug" in e && e.slug ? (
                <Link
                  to="/track/$slug"
                  params={{ slug: e.slug }}
                  className="mt-5 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
                >
                  Open the track
                </Link>
              ) : null}
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl font-display text-base italic leading-relaxed text-gold-dim">
          {DOCTRINE.enemyClose}
        </p>
        <Link
          to="/harvest"
          className="mt-6 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
        >
          Open harvest mechanics
        </Link>
        <Link
          to="/field"
          className="ml-6 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
        >
          Field net
        </Link>
        <Link
          to="/decree"
          className="ml-6 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
        >
          Sealed-decree protocol
        </Link>
      </Section>

      <Section id="arsenal" n="04" kicker="Arsenal" title="Frequency warfare">
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {DOCTRINE.arsenalLead}
        </p>
        <div className="mt-10 grid gap-px bg-line md:grid-cols-2">
          {DOCTRINE.arsenal.map((item) => (
            <article key={item.t} className="bg-bg p-6 md:p-8">
              <h3 className="font-display text-xl tracking-wide">{item.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.d}</p>
            </article>
          ))}
        </div>
        <blockquote className="mt-10 max-w-2xl border-l-2 border-gold pl-4 font-display text-lg italic leading-snug text-gold-bright">
          {DOCTRINE.arsenalClose}
        </blockquote>

        <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          05 · Rules of engagement
        </h3>
        <ul className="mt-6 max-w-2xl space-y-4">
          {DOCTRINE.rules.map((rule) => (
            <li
              key={rule}
              className="border-l border-line pl-4 text-sm leading-relaxed text-muted"
            >
              {rule}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="field"
        n="06"
        kicker="Field"
        surface
        title="Field extraction protocol"
      >
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {DOCTRINE.fieldLead}
        </p>
        <ExtractionProtocol />

        <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          07 · Signal discipline — the Refined Ones
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {DOCTRINE.disciplineLead}
        </p>
        <ul className="mt-6 max-w-2xl space-y-4">
          {DOCTRINE.discipline.map((rule) => (
            <li
              key={rule}
              className="border-l border-line pl-4 text-sm leading-relaxed text-muted"
            >
              {rule}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="workflow"
        n="07"
        kicker="Workflow"
        surface
        title="Seven-step intelligence sequence"
      >
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          All data moves through the Standardized Information-Sharing Protocol.
          A visible pending field tells the truth. Action is the only truth the
          ledger will keep.
        </p>
        <WorkflowProtocol />
        <p className="mt-8 max-w-2xl font-display text-lg italic leading-snug text-gold-bright">
          {OPS.code}
        </p>
        <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {OPS.motto}
        </p>
      </Section>

      <Section id="vault" n="08" kicker="Vault" title="Chain of transmission">
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {DOCTRINE.vaultLead}
        </p>
        <ol className="mt-10 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {DOCTRINE.chain.map((node, i) => {
            const inner = (
              <>
                <p className="font-mono text-[0.6875rem] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl tracking-wide">
                  {node.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {node.d}
                </p>
              </>
            );
            return (
              <li key={node.t} className="bg-bg">
                {"to" in node && node.to ? (
                  <Link to={node.to} className="block p-6 transition-colors hover:bg-elevated">
                    {inner}
                  </Link>
                ) : (
                  <div className="p-6">{inner}</div>
                )}
              </li>
            );
          })}
        </ol>

        <h3 className="mt-14 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          09 · Closing charge
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {DOCTRINE.closing}
        </p>
        <p className="mt-6 font-display text-xl tracking-wide text-fg">
          {DOCTRINE.close}
        </p>
        <div className="mt-8 max-w-2xl rounded-xl p-6 shadow-[0_0_0_1px_rgb(180_84_74/0.55)]">
          <p className="font-display text-xl italic leading-snug text-fg md:text-2xl">
            {DOCTRINE.becoming}
          </p>
          <p className="mt-3 font-display text-xl italic leading-snug text-gold-bright md:text-2xl">
            {DOCTRINE.hunt}
          </p>
          <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-subtle">
            End transmission · Doctrine {DOCTRINE.update} · 10 Sep 2026
          </p>
        </div>
      </Section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
                Ordinance
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-wide">
                C.R.A.S.H. transmissions
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                {DOCTRINE.footer}
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/catalog" search={{ series: "crash" }}>
                Series in catalog
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {ordinance.map((t) => (
              <TrackCover key={t.slug} track={t} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({
  id,
  n,
  kicker,
  title,
  surface,
  children,
}: {
  id: string;
  n: string;
  kicker: string;
  title?: string;
  surface?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-40", surface && "border-y border-line bg-surface")}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          {n} / {kicker}
        </p>
        {title ? (
          <h2 className="mt-2 font-display text-3xl tracking-wide md:text-4xl">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function ExtractionProtocol() {
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FIELD_KEY);
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
        window.localStorage.setItem(FIELD_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const locked = ready && done.length === DOCTRINE.field.length;

  return (
    <div className="mt-8">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
        {ready ? `${done.length} / ${DOCTRINE.field.length} seated` : "Protocol"}
      </p>
      <ol className="mt-4 divide-y divide-line rounded-xl bg-bg shadow-[0_0_0_1px_rgb(232_228_220/0.1)]">
        {DOCTRINE.field.map((step) => {
          const on = done.includes(step.n);
          return (
            <li key={step.n}>
              <button
                type="button"
                onClick={() => toggle(step.n)}
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
                      {step.n}
                    </span>
                    <span
                      className={cn(
                        "font-display text-lg",
                        on ? "text-gold-bright" : "text-fg",
                      )}
                    >
                      {step.t}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">
                    {step.d}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {locked ? (
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
          Grid locked. Harvest starved.
        </p>
      ) : (
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
          Mark each strike as it lives in the day. Stored on this device.
        </p>
      )}
      {ready && done.length > 0 ? (
        <Link
          to="/harvest"
          className="mt-4 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
        >
          Yield drops on the mill
        </Link>
      ) : null}
    </div>
  );
}

function WorkflowProtocol() {
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORK_KEY);
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
        window.localStorage.setItem(WORK_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const locked = ready && done.length === WORKFLOW.length;

  return (
    <div className="mt-8">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
        {ready ? `${done.length} / ${WORKFLOW.length} seated` : "Protocol"}
      </p>
      <ol className="mt-4 divide-y divide-line rounded-xl bg-bg shadow-[0_0_0_1px_rgb(232_228_220/0.1)]">
        {WORKFLOW.map((step) => {
          const on = done.includes(step.n);
          return (
            <li key={step.n}>
              <button
                type="button"
                onClick={() => toggle(step.n)}
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
                      {step.n}
                    </span>
                    <span
                      className={cn(
                        "font-display text-lg",
                        on ? "text-gold-bright" : "text-fg",
                      )}
                    >
                      {step.t}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">
                    {step.d}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {locked ? (
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
          Sequence closed. Refer and follow.
        </p>
      ) : (
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
          Seat each step. Stored on this device.
        </p>
      )}
    </div>
  );
}
