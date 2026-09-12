import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrackCover } from "@/components/track-cover";
import { MiniTuneButton } from "@/components/player-bar";
import { CinematicHero } from "@/components/cinematic-hero";
import {
  LABEL,
  LINKS,
  TRACKS,
  featuredTracks,
  getTrack,
  latestTracks,
} from "@/data/catalog";
import { ARTIST, OPERATING_CODE, STRYDER } from "@/data/artist";
import { DOCTRINE } from "@/data/doctrine";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = featuredTracks();
  const latest = latestTracks(8);
  const manifesto = getTrack("digital-slave-handlers");
  const sealed = getTrack("phantom-protocol");
  const drop = getTrack("i-wont-do-that");
  const gracie = getTrack("gracie-run-it-back");

  return (
    <main>
      <CinematicHero
        poster="/brand/hero-wings.jpg"
        video="/brand/hero-wings.mp4"
        kicker="Independent label · Est. 1 Aug 2026"
        title="JAWNBRYTE Records"
        size="feature"
        align="center"
        foil
        fit="cover"
        veil="portrait"
        focus="center 42%"
        anchor="end"
        slate="Pronounced John Bright"
      >
        <p className="max-w-xl font-display text-xl italic leading-snug text-gold-bright md:text-2xl">
          {LABEL.motto}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/catalog">
              Open the catalog
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href={LINKS.spotify} target="_blank" rel="noreferrer">
              Listen on Spotify
            </a>
          </Button>
        </div>
      </CinematicHero>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {[
            { k: "90-day reach", v: LABEL.views90d },
            { k: "User posts", v: LABEL.posts90d },
            { k: "View growth", v: LABEL.growth90d },
            { k: "Transmissions", v: String(TRACKS.length) },
          ].map((stat, i) => (
            <div
              key={stat.k}
              className={`px-5 py-8 md:px-8 ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${
                i > 0 ? "md:border-l md:border-t-0" : ""
              }`}
            >
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-subtle">
                {stat.k}
              </p>
              <p className="mt-2 font-display text-2xl text-gold md:text-3xl">
                {stat.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {gracie ? (
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-6xl items-start md:grid-cols-[minmax(0,22rem)_1fr] lg:grid-cols-[minmax(0,26rem)_1fr]">
            <Link
              to="/track/$slug"
              params={{ slug: gracie.slug }}
              className="block overflow-hidden"
            >
              <img
                src={gracie.cover}
                alt={`${gracie.title} cover`}
                className="aspect-square w-full object-cover"
              />
            </Link>
            <div className="flex flex-col justify-center px-4 py-12 md:px-10 md:py-16">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
                Five-star transmission · Master v1
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-wide md:text-5xl">
                {gracie.title}
              </h2>
              <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                JAWNBRYTE × STRYDER · {gracie.duration} · forged 11 Sep 2026
              </p>
              <p className="mt-5 max-w-xl font-display text-xl italic leading-snug text-gold-bright">
                {gracie.inscription}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {gracie.blurb}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MiniTuneButton slug={gracie.slug} />
                <Link
                  to="/track/$slug"
                  params={{ slug: gracie.slug }}
                  className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
                >
                  Hear the movement
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {drop ? (
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-6xl items-center md:grid-cols-[minmax(0,22rem)_1fr] lg:grid-cols-[minmax(0,26rem)_1fr]">
            <Link
              to="/track/$slug"
              params={{ slug: drop.slug }}
              className="block overflow-hidden"
            >
              <img
                src={drop.cover}
                alt={`${drop.title} cover`}
                className="aspect-square w-full object-cover"
              />
            </Link>
            <div className="flex flex-col justify-center px-4 py-12 md:px-10 md:py-16">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
                Sealed decree · Master v1
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-wide md:text-5xl">
                {drop.title}
              </h2>
              <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                JAWNBRYTE × STRYDER · {drop.duration} · sealed 10 Sep 2026
              </p>
              <p className="mt-5 max-w-xl font-display text-xl italic leading-snug text-gold-bright">
                {drop.inscription}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {drop.blurb}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MiniTuneButton slug={drop.slug} />
                <Link
                  to="/track/$slug"
                  params={{ slug: drop.slug }}
                  className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
                >
                  Read the vow
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {manifesto && sealed ? (
        <section className="mx-auto grid max-w-6xl gap-px border-b border-line bg-line md:grid-cols-2">
          <FeaturedPanel
            kicker="Five-star manifesto"
            trackTitle={manifesto.title}
            slug={manifesto.slug}
            cover={manifesto.cover}
            body={manifesto.blurb}
            extra={
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
            }
          />
          <FeaturedPanel
            kicker="Sealed decree"
            trackTitle={sealed.title}
            slug={sealed.slug}
            cover={sealed.cover}
            body={sealed.inscription ?? sealed.blurb}
            extra={<Badge tone="sealed">Master v1</Badge>}
          />
        </section>
      ) : null}

      <section className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-6 md:py-16">
          <div className="max-w-xl">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
              Online community
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-wide md:text-4xl">
              The Lattice is open
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Isolated lights get eaten. A grid does not. Transmit. Witness.
              Braid.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/lattice">
              Enter the lattice
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-danger">
            Internal vault · Doctrine 02
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl italic leading-snug tracking-wide md:text-5xl">
            {DOCTRINE.charge}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {DOCTRINE.long}. Four predator classes. Six field strikes. Music
            as ordinance — not entertainment.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6">
            <Link
              to="/crash"
              className="inline-flex h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
            >
              Open the doctrine
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              to="/harvest"
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              Harvest mechanics
            </Link>
            <Link
              to="/rhythm"
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              Rhythm Outlaw
            </Link>
            <Link
              to="/field"
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              Field net
            </Link>
            <Link
              to="/decree"
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              Sealed-decree protocol
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-line">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          poster="/brand/hero-xii.jpg"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/brand/hero-xii.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_8_8)_8%,rgb(8_8_8/0.45)_100%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            The mandate · Majestic XII
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl tracking-wide md:text-5xl">
            C.R.A.S.H.
          </h2>
          <p className="mt-4 max-w-xl font-display text-xl italic leading-snug text-gold-bright">
            Clandestine Rage Against Soul Harvesters
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Rain on the plate. Wings in the rear. The catalog is ordinance.
            Observation is the shield before the blade.
          </p>
          <Link
            to="/crash"
            className="mt-6 inline-flex h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
          >
            Open the vault
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-line">
        <img
          src="/brand/hero-rhythm.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_8_8)_12%,rgb(8_8_8/0.55)_100%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            John Bright Method v1.0 · 18 Nov 2025
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl tracking-wide md:text-5xl">
            Rhythm Outlaw
          </h2>
          <p className="mt-4 max-w-xl font-display text-xl italic leading-snug text-gold-bright">
            Two Phones. Ten Fingers. Infinite Sound.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Dual Phone Drum Technique. The latency is the swing. The artifacts
            are the engine. Authorship sealed.
          </p>
          <Link
            to="/rhythm"
            className="mt-6 inline-flex h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
          >
            Open the method
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
              Featured
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-wide text-fg md:text-4xl">
              Flagship transmissions
            </h2>
          </div>
          <Link
            to="/catalog"
            className="hidden h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold md:flex"
          >
            Full catalog
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {featured.map((t) => (
            <TrackCover key={t.slug} track={t} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <Link to="/artist" className="group relative overflow-hidden rounded-xl">
            <img
              src="/brand/hero-marshal.jpg"
              alt=""
              className="h-72 w-full object-cover object-[center_20%] md:h-full"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgb(8_8_8/0.88)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
                Principal artist
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-wide">
                {ARTIST.stage}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {ARTIST.legal} · {ARTIST.also}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
                Read the biography
                <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
          <Link to="/stryder" className="group relative overflow-hidden rounded-xl">
            <img
              src={STRYDER.portrait}
              alt=""
              className="h-72 w-full object-cover md:h-full"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgb(8_8_8/0.88)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
                Co-founder
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-wide">
                {STRYDER.name}
              </h2>
              <p className="mt-2 font-display italic text-gold-bright">
                “{STRYDER.quote}”
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Operating code
        </p>
        <h2 className="mt-2 max-w-xl font-display text-3xl tracking-wide md:text-4xl">
          Five maxims. No ornament.
        </h2>
        <ol className="mt-10 grid gap-px bg-line md:grid-cols-5">
          {OPERATING_CODE.map((item) => (
            <li key={item.n} className="bg-bg p-5 md:p-6">
              <p className="font-mono text-[0.6875rem] text-gold">{item.n}</p>
              <h3 className="mt-3 font-display text-lg leading-snug text-fg">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide">
              Latest in the ledger
            </h2>
            <Link
              to="/catalog"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {latest.map((t) => (
              <TrackCover key={t.slug} track={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
          Live signal
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-wide">
          Play the catalog
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          Full artist player via Spotify. Individual transmissions open from
          the catalog.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
          <iframe
            title="JAWNBRYTE on Spotify"
            src="https://open.spotify.com/embed/artist/4JGk61pA3UjocTTNNPshDS?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="block border-0"
          />
        </div>
      </section>
    </main>
  );
}

function FeaturedPanel({
  kicker,
  trackTitle,
  slug,
  cover,
  body,
  extra,
}: {
  kicker: string;
  trackTitle: string;
  slug: string;
  cover: string;
  body: string;
  extra?: ReactNode;
}) {
  return (
    <article className="bg-bg p-6 md:p-10">
      <div className="flex gap-5">
        <Link
          to="/track/$slug"
          params={{ slug }}
          className="size-28 shrink-0 overflow-hidden rounded-lg md:size-36"
        >
          <img src={cover} alt="" className="h-full w-full object-cover" />
        </Link>
        <div className="min-w-0">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-gold">
            {kicker}
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-wide md:text-3xl">
            <Link to="/track/$slug" params={{ slug }} className="hover:text-gold">
              {trackTitle}
            </Link>
          </h2>
          {extra ? <div className="mt-2">{extra}</div> : null}
          <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
          <div className="mt-5">
            <MiniTuneButton slug={slug} />
          </div>
        </div>
      </div>
    </article>
  );
}
