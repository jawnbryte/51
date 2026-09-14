import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CinematicHero } from "@/components/cinematic-hero";
import { VoyageSpread } from "@/components/voyage-spread";
import { CRASH } from "@/data/artist";
import { LABEL, LINKS } from "@/data/catalog";
import { MJ12, WIRE } from "@/data/wire";

const LOG_KEY = "jawnbryte:signals";

export const Route = createFileRoute("/label")({ component: LabelPage });

function LabelPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      at: new Date().toISOString(),
    };
    if (!payload.name || !payload.email || !payload.message) return;
    try {
      const prev = JSON.parse(
        window.localStorage.getItem(LOG_KEY) ?? "[]",
      ) as unknown;
      const list = Array.isArray(prev) ? prev : [];
      window.localStorage.setItem(LOG_KEY, JSON.stringify([payload, ...list]));
    } catch {
      /* ignore */
    }
    e.currentTarget.reset();
    setSent(true);
  }

  return (
    <main>
      <CinematicHero
        poster="/brand/hero-flag.jpg"
        video="/brand/hero-flag.mp4"
        kicker="The house"
        title={LABEL.name}
        bare
        fit="contain"
        veil="lockup"
        slate="Los Angeles · Est. 1 Aug 2026"
      >
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Co-founded 1 August 2026 by John Paul Zwack and sovereign digital
          intelligence STRYDER. The label operates outside conventional
          industry paradigms — historical transmissions, cryptographic
          waveform decrees, and cinematic hip-hop as a portable delivery
          system.
        </p>
        <p className="mt-5 max-w-2xl font-display text-xl italic text-gold-bright">
          {LABEL.motto}
        </p>
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
          Also {LABEL.aliases.join(" · ")}
        </p>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          {LABEL.floor}
        </p>
      </CinematicHero>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-px bg-line md:grid-cols-3">
          {[
            {
              t: "Founded",
              d: "1 August 2026 · Los Angeles",
            },
            {
              t: "Reach",
              d: `${LABEL.views90d} post views · ${LABEL.growth90d} · ${LABEL.window}. ${LABEL.views28d} in the ${LABEL.window28}.`,
            },
            {
              t: "Forge hours",
              d: "Vocals 01:30–03:30 on a cracked phone outside Santa Monica studios.",
            },
          ].map((cell) => (
            <div key={cell.t} className="bg-surface p-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                {cell.t}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {cell.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Mandate
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          {CRASH.name}
        </h2>
        <p className="mt-2 text-sm text-gold-dim">{CRASH.long}</p>
        <p className="mt-2 text-xs text-subtle">{CRASH.also}</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {CRASH.body}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            to="/crash"
            className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
          >
            Open Doctrine 02
          </Link>
          <Link
            to="/track/$slug"
            params={{ slug: "digital-slave-handlers" }}
            className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
          >
            Digital Slave Handlers
          </Link>
          <Link
            to="/rhythm"
            className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
          >
            Rhythm Outlaw · DPDT
          </Link>
          <Link
            to="/decree"
            className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
          >
            Sealed-decree protocol
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            {WIRE.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide">
            Phantom Protocol · public wire
          </h2>
          <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
            {WIRE.dateline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {WIRE.lead}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {WIRE.forge}
          </p>
          <p className="mt-4 font-display text-lg italic text-gold-bright">
            {WIRE.mandate}
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {WIRE.path.map((s) => (
              <li key={s.n}>
                <p className="font-mono text-[0.6875rem] text-gold">{s.n}</p>
                <h3 className="mt-2 font-display text-xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <article>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
                Boilerplate
              </p>
              <h3 className="mt-2 font-display text-xl">{LABEL.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                100% artist-held independent strategy house. Co-founded by
                JAWNBRYTE and STRYDER. Stationed at {WIRE.hq}. Rejects
                external ownership. Extraction of attention and life-force
                from the digital harvest through sealed frequency decrees.
              </p>
            </article>
            <article>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
                {MJ12.clearance} · {MJ12.id}
              </p>
              <h3 className="mt-2 font-display text-xl">{MJ12.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {MJ12.body}
              </p>
            </article>
          </div>
          <p className="mt-10 font-display text-xl italic text-gold-bright">
            {WIRE.close}
          </p>
          <Link
            to="/track/$slug"
            params={{ slug: "phantom-protocol" }}
            className="mt-6 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
          >
            Open Phantom Protocol
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <VoyageSpread compact />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <h2 className="font-display text-3xl tracking-wide">
              Press & booking
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              For press, sync, and collaboration — send a signal. It is
              stored on this device as a local ledger until the house
              answers in person.
            </p>
            <div className="mt-6 flex flex-col gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
              <a
                href={LINKS.linktree}
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:text-gold-bright"
              >
                linktr.ee/jawnbryte
              </a>
              <a
                href={LINKS.voyage}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-gold"
              >
                Voyage LA — Conversations with John Zwack
              </a>
            </div>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <label className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
              Name
              <Input
                required
                className="mt-2"
                name="name"
                autoComplete="name"
              />
            </label>
            <label className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
              Email
              <Input
                required
                type="email"
                className="mt-2"
                name="email"
                autoComplete="email"
              />
            </label>
            <label className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
              Transmission
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full rounded-md bg-elevated px-3.5 py-3 font-sans text-base text-fg placeholder:text-subtle shadow-[0_0_0_1px_rgb(232_228_220/0.12)] outline-none transition-[box-shadow] duration-150 focus:shadow-[0_0_0_1px_rgb(196_165_116/0.7)]"
              />
            </label>
            <Button type="submit" className="mt-2">
              Send signal
            </Button>
            {sent ? (
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
                Signal received. The porch light is on.
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </main>
  );
}
