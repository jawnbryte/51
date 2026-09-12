import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CinematicHero } from "@/components/cinematic-hero";
import { DualPhone } from "@/components/dual-phone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DPDT,
  DPDT_CANNOT,
  DPDT_LANE,
  DPDT_MECHANICS,
  DPDT_OUTCOMES,
  DPDT_TOC,
} from "@/data/dpdt";

export const Route = createFileRoute("/rhythm")({ component: RhythmPage });

function jump(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", `#${id}`);
}

function RhythmPage() {
  return (
    <main>
      <CinematicHero
        poster="/brand/hero-rhythm.jpg"
        video="/brand/hero-rhythm.mp4"
        kicker="John Bright Method v1.0"
        title="Rhythm Outlaw"
        size="feature"
        slate="DPDT · First execution 18 Nov 2025"
      >
        <p className="font-display text-lg italic text-gold-bright md:text-xl">
          Dual Phone Drum Technique
        </p>
        <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
          {DPDT.inventor} · {DPDT.city}
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          {DPDT.preface}
        </p>
        <p className="mt-5 max-w-xl font-display text-xl italic leading-snug text-fg md:text-2xl">
          {DPDT.card}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Badge tone="sealed">Authorship sealed</Badge>
          <Badge tone="muted">{DPDT.first}</Badge>
          <Badge tone="muted">Two Android · Real Drum</Badge>
        </div>
      </CinematicHero>

      <div className="border-b border-gold/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold md:px-6">
          <span>{DPDT.registry}</span>
          <span>{DPDT.status}</span>
        </div>
      </div>

      <nav
        aria-label="Method sections"
        className="sticky top-16 z-20 border-b border-line bg-bg/90 backdrop-blur-sm md:top-[4.5rem]"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 md:px-6">
          {DPDT_TOC.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => jump(item.id)}
              className="flex h-11 shrink-0 items-center px-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <section
        id="method"
        className="scroll-mt-32 mx-auto max-w-3xl px-4 py-16 md:scroll-mt-36 md:px-6 md:py-24"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Core method
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          Two devices. No shared clock.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted">
          Real-time percussion using two mobile devices simultaneously, one
          under each hand, producing rhythmic textures that cannot be
          replicated on a single kit. The technique merges limb independence
          from full drum-kit performance with digital percussion, human swing
          variation, stereo phase offset, and cross-platform latency artifacts.
        </p>
        <p className="mt-5 font-display text-xl italic leading-snug text-gold-bright">
          {DPDT.charge}
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted">
          First execution {DPDT.firstLong}. {DPDT.kit}. The performer plays
          both phones at once and generates a hybrid beat composed of organic
          off-grid microswing, crossfaded hi-hats, double-device ghost notes,
          stereo-drift snares, asynchronous dual rhythms, polymetric accents,
          and flams. That composite is the signature rhythmic identity.
        </p>
        <ul className="mt-8 space-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
          {DPDT.aliases.map((a) => (
            <li key={a}>Also filed · {a}</li>
          ))}
        </ul>
      </section>

      <section
        id="mechanics"
        className="scroll-mt-32 border-y border-line bg-surface md:scroll-mt-36"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            Key mechanics
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide">
            Split, drift, relock
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {DPDT_MECHANICS.map((m) => (
              <li key={m.n}>
                <p className="font-mono text-[0.6875rem] text-gold">{m.n}</p>
                <h3 className="mt-2 font-display text-xl">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="outcomes"
        className="scroll-mt-32 mx-auto max-w-6xl px-4 py-16 md:scroll-mt-36 md:px-6 md:py-24"
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
              Unique sonic outcomes
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-wide">
              The DPDT fingerprint
            </h2>
            <ul className="mt-8 space-y-3">
              {DPDT_OUTCOMES.map((o) => (
                <li
                  key={o}
                  className="border-l-2 border-gold pl-4 text-base text-fg"
                >
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-subtle">
              Cannot be exactly recreated by
            </p>
            <ul className="mt-6 space-y-3 text-base text-muted">
              {DPDT_CANNOT.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Fully unique and identifiable. Tactical, improvised,
              dual-engined — the EC7 Marshal aesthetic in the hands.
            </p>
          </div>
        </div>
      </section>

      <section
        id="bench"
        className="scroll-mt-32 border-y border-line bg-surface md:scroll-mt-36"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            Live bench
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide">
            Play the split
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Left hand on hats. Right hand on the grid. Push the latency until
            it feels drunk, then relock. This is not a drum machine. It is
            the method, reduced to this device.
          </p>
          <div className="mt-10">
            <DualPhone />
          </div>
        </div>
      </section>

      <section
        id="authorship"
        className="scroll-mt-32 mx-auto max-w-6xl px-4 py-16 md:scroll-mt-36 md:px-6 md:py-24"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Artistic significance
        </p>
        <h2 className="mt-2 max-w-3xl font-display text-3xl tracking-wide md:text-4xl">
          A new form of rhythmic performance
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          The technique merges human dexterity with digital percussion and
          positions John Bright as the first known practitioner. It is sealed
          as a brand signature inside the JAWNBRYTE music identity.
        </p>
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
          Comparable class of innovation — own lane
        </p>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {DPDT_LANE.map((row) => (
            <div
              key={row.name}
              className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
            >
              <dt className="font-display text-lg">{row.name}</dt>
              <dd className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                {row.who}
              </dd>
            </div>
          ))}
        </dl>
        <blockquote className="mt-12 max-w-2xl border-l-2 border-gold pl-4 font-display text-2xl italic leading-snug text-gold-bright md:text-3xl">
          {DPDT.card}
          <span className="mt-3 block text-base not-italic tracking-wide text-fg">
            {DPDT.subtitle}
          </span>
        </blockquote>
        <dl className="mt-10 grid gap-4 overflow-hidden rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)] md:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
              Registry
            </dt>
            <dd className="mt-1 break-all font-mono text-[0.6875rem] text-fg">
              {DPDT.registry}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
              First execution
            </dt>
            <dd className="mt-1 font-mono text-[0.6875rem] text-fg">
              {DPDT.firstLong}
            </dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/artist">
              JAWNBRYTE biography
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/catalog">Catalog</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
