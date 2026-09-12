import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CinematicHero } from "@/components/cinematic-hero";
import { DecreeRing, ReadinessBoard } from "@/components/decree-ring";
import { HashVerify } from "@/components/hash-verify";
import { TrackCover } from "@/components/track-cover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTrack } from "@/data/catalog";
import { WIRE } from "@/data/wire";
import {
  CASES,
  CRASH_CIRCUIT,
  HARDSHIP,
  HOUSE,
  LOCK_INPUTS,
  MATRIX,
  PROTOCOL,
  PROTOCOL_TOC,
  SEQUENCE,
  HASH_STEPS,
} from "@/data/decree-protocol";

export const Route = createFileRoute("/decree")({ component: DecreePage });

function jump(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", `#${id}`);
}

function DecreePage() {
  return (
    <main>
      <CinematicHero
        poster="/brand/hero-decree.jpg"
        video="/brand/hero-decree.mp4"
        kicker={PROTOCOL.kicker}
        title="Sealed Decree"
        size="feature"
        slate={`${PROTOCOL.hash} · ${PROTOCOL.issued}`}
      >
        <p className="font-display text-lg italic text-gold-bright md:text-xl">
          {PROTOCOL.charge}
        </p>
        <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
          {PROTOCOL.terminal}
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          {PROTOCOL.preface}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Badge tone="sealed">Unsealed for operators</Badge>
          <Badge tone="muted">{PROTOCOL.issued}</Badge>
          <Badge tone="muted">Hash {PROTOCOL.hash}</Badge>
        </div>
      </CinematicHero>

      <div className="border-b border-gold/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold md:px-6">
          <span>{PROTOCOL.status}</span>
          <span>{PROTOCOL.origin}</span>
        </div>
      </div>

      <nav
        aria-label="Protocol sections"
        className="sticky top-16 z-20 border-b border-line bg-bg/90 backdrop-blur-sm md:top-[4.5rem]"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 md:px-6">
          {PROTOCOL_TOC.map((item) => (
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
        id="hardship"
        className="scroll-mt-32 mx-auto max-w-6xl px-4 py-16 md:scroll-mt-36 md:px-6 md:py-24"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          {HARDSHIP.code}
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          {HARDSHIP.title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          {PROTOCOL.preface}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {PROTOCOL.response}
        </p>
        <blockquote className="mt-8 max-w-2xl border-l-2 border-gold pl-4 font-display text-xl italic leading-snug text-gold-bright md:text-2xl">
          {PROTOCOL.suffering}
        </blockquote>
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
          Registry · {HARDSHIP.registry}
        </p>
      </section>

      <section
        id="circuit"
        className="scroll-mt-32 border-y border-line bg-surface md:scroll-mt-36"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            C.R.A.S.H. transmission circuit
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide">
            Capture · Rupture · Anchor · Seal · Hold
          </h2>
          <div className="mt-10 grid gap-px bg-line md:grid-cols-5">
            {CRASH_CIRCUIT.map((s) => (
              <article key={s.n} className="bg-bg p-5">
                <p className="font-mono text-[0.6875rem] text-gold">{s.n}</p>
                <h3 className="mt-2 font-display text-xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 font-display text-lg italic text-gold-bright">
            {PROTOCOL.proof}
          </p>
          <Link
            to="/crash"
            className="mt-6 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
          >
            Open Doctrine 02
          </Link>
        </div>
      </section>

      <section
        id="matrix"
        className="scroll-mt-32 mx-auto max-w-6xl px-4 py-16 md:scroll-mt-36 md:px-6 md:py-24"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Threat matrix
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          Content vs. transmission
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          The modern release cycle turns a song into a replaceable object. A
          sealed decree is a refusal of that cycle.
        </p>
        <div className="mt-10 overflow-hidden rounded-xl shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
          <div className="grid grid-cols-3 border-b border-line bg-surface font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
            <span className="px-4 py-3">Axis</span>
            <span className="px-4 py-3">The harvest</span>
            <span className="px-4 py-3 text-gold">The decree</span>
          </div>
          {MATRIX.map((row) => (
            <div
              key={row.axis}
              className="grid grid-cols-3 border-b border-line last:border-0"
            >
              <p className="px-4 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-gold">
                {row.axis}
              </p>
              <p className="px-4 py-4 text-sm text-muted">{row.harvest}</p>
              <p className="px-4 py-4 text-sm text-fg">{row.decree}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="house"
        className="scroll-mt-32 border-y border-line bg-surface md:scroll-mt-36"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            Lyte Sketch 143 Strategy House
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide">
            Four operating codes
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {HOUSE.map((s) => (
              <article
                key={s.n}
                className="rounded-xl bg-bg p-6 shadow-[0_0_0_1px_rgb(196_165_116/0.22)]"
              >
                <p className="font-mono text-[0.6875rem] text-gold">
                  STRATEGY_{s.n} · {s.code}
                </p>
                <h3 className="mt-2 font-display text-xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stages"
        className="scroll-mt-32 mx-auto max-w-6xl px-4 py-16 md:scroll-mt-36 md:px-6 md:py-24"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          What it means to seal
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          Audio. Metadata. Intent.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {PROTOCOL.sealMeans}
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {LOCK_INPUTS.map((i) => (
            <article
              key={i.t}
              className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
            >
              <h3 className="font-display text-lg">{i.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{i.d}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 font-display text-xl italic text-gold-bright">
          {PROTOCOL.lock}
        </p>
        <div className="mt-12">
          <DecreeRing />
        </div>
      </section>

      <section
        id="verify"
        className="scroll-mt-32 border-y border-line bg-surface md:scroll-mt-36"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            Authentication
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide">
            SHA-256 verification
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            A platform can rename a file, swap a master, or let metadata
            drift. A hash cannot. You do not verify a song. You verify the
            exact bytes of the edition you were told you have.
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {HASH_STEPS.map((s) => (
              <li key={s.n}>
                <p className="font-mono text-[0.6875rem] text-gold">{s.n}</p>
                <h3 className="mt-2 font-display text-xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <HashVerify />
          </div>
        </div>
      </section>

      <section
        id="ready"
        className="scroll-mt-32 border-y border-line bg-surface md:scroll-mt-36"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            Before the stamp
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide">
            Readiness
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {PROTOCOL.coreRule}
          </p>
          <div className="mt-10">
            <ReadinessBoard />
          </div>
          <div className="mt-12">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
              Operational sequence
            </p>
            <h3 className="mt-2 font-display text-2xl tracking-wide">
              Binding language, not ornamental copy
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-px bg-line md:grid-cols-6">
              {SEQUENCE.map((v) => (
                <p
                  key={v}
                  className="bg-bg px-4 py-6 text-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
                >
                  {v}
                </p>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
              The track does not ask to be a lifestyle accessory. It requires
              the listener to observe the harvest and actively choose to
              rebuild.
            </p>
          </div>
        </div>
      </section>

      <section
        id="cases"
        className="scroll-mt-32 mx-auto max-w-6xl px-4 py-16 md:scroll-mt-36 md:px-6 md:py-24"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Sealed editions
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          Case studies
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {CASES.map((c) => {
            const track = getTrack(c.slug);
            if (!track) return null;
            return (
              <article key={c.slug}>
                <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
                  Decree {c.n}
                </p>
                <TrackCover track={track} />
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {c.context}
                </p>
              </article>
            );
          })}
        </div>
        <p className="mt-16 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Three-step path
        </p>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {WIRE.path.map((s) => (
            <li key={s.n}>
              <p className="font-mono text-[0.6875rem] text-gold">{s.n}</p>
              <h3 className="mt-2 font-display text-xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 font-display text-lg italic text-gold-bright">
          {WIRE.close}
        </p>
        <blockquote className="mt-16 max-w-2xl border-l-2 border-gold pl-4">
          <p className="font-display text-xl italic leading-snug text-gold-bright md:text-2xl">
            {PROTOCOL.close}
          </p>
          <p className="mt-6 font-display text-2xl tracking-wide text-fg">
            {PROTOCOL.motto}
          </p>
          <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
            {PROTOCOL.porch}
          </p>
        </blockquote>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/catalog" search={{ series: "sealed" }}>
              Sealed catalog
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/crash">C.R.A.S.H. Doctrine</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/harvest">Harvest mill</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
