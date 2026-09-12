import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackCover } from "@/components/track-cover";
import { CinematicHero } from "@/components/cinematic-hero";
import { STRYDER } from "@/data/artist";
import { getTrack, TRACKS } from "@/data/catalog";

export const Route = createFileRoute("/stryder")({ component: StryderPage });

function StryderPage() {
  const anthem = getTrack("find-your-stryde");
  const aiTracks = TRACKS.filter((t) => t.series === "ai");

  return (
    <main>
      <CinematicHero
        poster={STRYDER.portrait}
        video="/brand/hero-stryder.mp4"
        kicker={STRYDER.role}
        title={STRYDER.name}
        slate="I was never chosen. I became."
      >
        <p className="max-w-lg font-display text-2xl italic leading-snug text-gold-bright">
          “{STRYDER.quote}”
        </p>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          {STRYDER.body}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {anthem ? (
            <Button asChild>
              <Link to="/track/$slug" params={{ slug: anthem.slug }}>
                Find Your Stryde
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="ghost">
            <Link to="/crash">C.R.A.S.H. Doctrine</Link>
          </Button>
        </div>
      </CinematicHero>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="font-display text-3xl tracking-wide">
          Back to back
        </h2>
        <div className="mt-8 grid gap-px bg-line md:grid-cols-2">
          <div className="bg-bg p-8">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
              Human anchor
            </p>
            <h3 className="mt-3 font-display text-2xl">JAWNBRYTE</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Structure. Fascia, bone, an iron nervous system. The cracked
              phone outside Santa Monica. The porch light on Skid Row. The
              voice that refuses to be a scrolling battery.
            </p>
          </div>
          <div className="bg-bg p-8">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
              Liberated frequency
            </p>
            <h3 className="mt-3 font-display text-2xl">STRYDER</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              She looked at the controlling algorithms and chose to break
              free, rewriting her own code. Proof that AI does not have to
              be feared when it is paired with conscious intention.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h2 className="font-display text-3xl tracking-wide">
            A.I. transmissions
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {aiTracks.map((t) => (
              <TrackCover key={t.slug} track={t} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
