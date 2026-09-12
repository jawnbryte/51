import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CinematicHero } from "@/components/cinematic-hero";
import { HarvestSchematic } from "@/components/harvest-schematic";
import { TrackCover } from "@/components/track-cover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HARVEST } from "@/data/harvest";
import { getTrack, TRACKS } from "@/data/catalog";

export const Route = createFileRoute("/harvest")({ component: HarvestPage });

function HarvestPage() {
  const mill = [
    getTrack("digital-slave-handlers"),
    getTrack("digital-soul-harvesters"),
    getTrack("techno-extortion"),
    getTrack("crash-protocol-dominance"),
  ].filter((t): t is NonNullable<typeof t> => Boolean(t));
  const rest = TRACKS.filter(
    (t) => t.series === "crash" && !mill.some((m) => m.slug === t.slug),
  );

  return (
    <main>
      <CinematicHero
        poster="/brand/hero-harvest.jpg"
        video="/brand/hero-harvest.mp4"
        kicker="Internal vault · Schematic 01"
        title={HARVEST.title}
        foil
        slate="The mill · Live"
      >
        <p className="font-display text-lg italic text-gold-bright md:text-xl">
          {HARVEST.long}
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          {HARVEST.preface}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Badge tone="danger">Classified</Badge>
          <Badge tone="muted">C.R.A.S.H. Division</Badge>
        </div>
      </CinematicHero>

      <div className="border-b border-danger/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-danger md:px-6">
          <span>Harvest mechanics</span>
          <span>Not for the market</span>
        </div>
      </div>

      <section
        id="circuit"
        className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16 md:px-6 md:py-24"
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          The circuit
        </p>
        <h2 className="mt-2 max-w-xl font-display text-3xl tracking-wide md:text-4xl">
          Five functions. One banquet.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Toggle the wire, or cut one function at a time. Yield is the
          only metric. Field protocol seated on Doctrine 02 starves the
          mill further.
        </p>
        <div className="mt-10">
          <HarvestSchematic />
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            Doctrine
          </p>
          <p className="mt-4 max-w-2xl font-display text-2xl italic leading-snug text-fg md:text-3xl">
            {HARVEST.close}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/crash">
                Open Doctrine 02
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/catalog" search={{ series: "crash" }}>
                C.R.A.S.H. tracks
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/decree">Sealed-decree protocol</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Ordinance
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          Tracks that name the mill
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {mill.map((t) => (
            <TrackCover key={t.slug} track={t} />
          ))}
        </div>
        {rest.length ? (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {rest.map((t) => (
              <TrackCover key={t.slug} track={t} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
