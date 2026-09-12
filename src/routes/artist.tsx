import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CinematicHero } from "@/components/cinematic-hero";
import { ARTIST, CHAPTERS, OPERATING_CODE } from "@/data/artist";
import { LINKS, getTrack } from "@/data/catalog";

export const Route = createFileRoute("/artist")({ component: ArtistPage });

function ArtistPage() {
  return (
    <main>
      <CinematicHero
        poster="/brand/hero-marshal.jpg"
        video="/brand/hero-marshal.mp4"
        kicker="Principal artist"
        title={ARTIST.stage}
        size="feature"
        foil
        veil="portrait"
        focus="center 42%"
        slate="Chief Prince · The cut"
      >
        <p className="font-display text-lg text-gold-bright">
          {ARTIST.legal} · {ARTIST.also}
        </p>
        <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
          Pronounced {ARTIST.pronounced}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {ARTIST.spotifyBio}
        </p>
        <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
          Born {ARTIST.born} · {ARTIST.origin} · Based {ARTIST.based}
        </p>
      </CinematicHero>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        {CHAPTERS.map((ch, i) => (
          <article
            key={ch.title}
            className={`grid gap-6 ${i !== 0 ? "mt-16 border-t border-line pt-16" : ""}`}
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
              {ch.year}
            </p>
            <h2 className="font-display text-3xl tracking-wide">{ch.title}</h2>
            {ch.image ? (
              <img
                src={ch.image}
                alt=""
                className="h-56 w-full rounded-xl object-cover md:h-72"
              />
            ) : null}
            <p className="text-base leading-relaxed text-muted">{ch.body}</p>
          </article>
        ))}
      </section>

      {(() => {
        const queens = getTrack("warrior-queens-of-the-cosmic-isles");
        if (!queens) return null;
        return (
          <section className="border-t border-line">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,280px)_1fr] md:px-6 md:py-20">
              <img
                src={queens.cover}
                alt=""
                className="aspect-square w-full rounded-xl object-cover shadow-[0_0_0_1px_rgb(196_165_116/0.28)]"
              />
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
                  Origin film · 22 June 2026
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-wide">
                  {queens.title}
                </h2>
                <p className="mt-4 max-w-xl font-display text-lg italic text-gold-bright">
                  {queens.inscription}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  {queens.blurb}
                </p>
                <Link
                  to="/track/$slug"
                  params={{ slug: queens.slug }}
                  className="mt-6 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
                >
                  Open the transmission
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h2 className="font-display text-3xl tracking-wide">
            Operating code
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2">
            {OPERATING_CODE.map((item) => (
              <li key={item.n}>
                <p className="font-mono text-[0.6875rem] text-gold">{item.n}</p>
                <h3 className="mt-2 font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-6">
        <p className="max-w-lg text-muted">
          The full catalog is the public record. The Voyage LA conversation
          is the spoken one.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/catalog">
              Catalog
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/rhythm">Rhythm Outlaw</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/crash">C.R.A.S.H. Doctrine</Link>
          </Button>
          <Button asChild variant="ghost">
            <a href={LINKS.voyage} target="_blank" rel="noreferrer">
              Voyage LA interview
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
