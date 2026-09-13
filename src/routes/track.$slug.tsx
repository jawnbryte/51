import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Heart, Star } from "lucide-react";
import { MiniTuneButton } from "@/components/player-bar";
import { TrackCover } from "@/components/track-cover";
import { DecreeSeal } from "@/components/decree-seal";
import { HashVerify } from "@/components/hash-verify";
import { PressReview } from "@/components/press-review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LINKS,
  SERIES_META,
  formatDate,
  getTrack,
  relatedTracks,
  youtubeId,
} from "@/data/catalog";
import { getPress } from "@/data/press";
import { LYRICS } from "@/data/lyrics";
import { WIRE } from "@/data/wire";
import { usePlayer } from "@/store/player";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track/$slug")({
  component: TrackPage,
});

function TrackPage() {
  const { slug } = Route.useParams();
  const track = getTrack(slug);
  if (!track) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <h1 className="font-display text-3xl tracking-wide">
          Transmission not found
        </h1>
        <Link
          to="/catalog"
          className="mt-6 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
        >
          Return to catalog
        </Link>
      </main>
    );
  }

  const favorites = usePlayer((s) => s.favorites);
  const toggleFavorite = usePlayer((s) => s.toggleFavorite);
  const loved = favorites.includes(track.slug);
  const related = relatedTracks(track.slug, 4);
  const listen = track.youtube ?? track.spotifyTrack ?? LINKS.spotify;
  const yt = youtubeId(track.youtube);
  const lyrics = LYRICS[track.slug];
  const streamed = Boolean(track.youtube || track.spotifyTrack);
  const press = getPress(track.slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <Link
        to="/catalog"
        className="inline-flex h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
      >
        <ArrowLeft className="size-3.5" />
        Catalog
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] lg:grid-cols-[minmax(0,22rem)_1fr]">
        <div>
          <div className="overflow-hidden rounded-xl shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
            <img
              src={track.cover}
              alt={`${track.title} cover`}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{SERIES_META[track.series].label}</Badge>
            {track.sealed ? <Badge tone="sealed">Sealed</Badge> : null}
            {track.explicit ? <Badge tone="muted">Explicit</Badge> : null}
            {press ? <Badge tone="sealed">{press.outlet}</Badge> : null}
            {track.sealed ? <Badge tone="sealed">Master v1</Badge> : null}
            {track.views ? (
              <Badge tone="muted">{track.views} views</Badge>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-4xl tracking-wide md:text-5xl">
            {track.title}
          </h1>
          <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-muted">
            JAWNBRYTE
            {track.features ? ` · ${track.features}` : ""}
            {" · "}
            {formatDate(track.released)}
            {track.duration ? ` · ${track.duration}` : ""}
          </p>
          {track.rating ? (
            <div className="mt-4 flex items-center gap-1 text-gold">
              {Array.from({ length: track.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
              <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                {track.rating} / 5
                {press ? ` · ${press.outlet}` : ""}
              </span>
            </div>
          ) : null}

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {track.blurb}
          </p>
          {track.sealed ? (
            <div className="mt-6 flex flex-wrap gap-x-6">
              <Link
                to="/decree"
                className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
              >
                Song-to-Sealed-Decree Protocol
              </Link>
            </div>
          ) : null}
          {track.series === "crash" ? (
            <div className="mt-6 flex flex-wrap gap-x-6">
              <Link
                to="/crash"
                className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-danger"
              >
                C.R.A.S.H. Doctrine 02
              </Link>
              <Link
                to="/harvest"
                className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
              >
                Harvest mechanics
              </Link>
            </div>
          ) : null}
          {track.inscription ? (
            <blockquote className="mt-6 max-w-xl border-l-2 border-gold pl-4 font-display text-lg italic leading-snug text-gold-bright">
              {track.inscription}
            </blockquote>
          ) : null}
          {track.notes ? (
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
              {track.notes}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <MiniTuneButton slug={track.slug} />
            {streamed ? (
              <Button asChild variant="ghost">
                <a href={listen} target="_blank" rel="noreferrer">
                  Open stream
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>
            ) : null}
            <button
              type="button"
              onClick={() => toggleFavorite(track.slug)}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-md px-4 font-medium transition-colors duration-150",
                loved
                  ? "text-gold shadow-[0_0_0_1px_rgb(196_165_116/0.45)]"
                  : "text-muted shadow-[0_0_0_1px_rgb(232_228_220/0.12)] hover:text-fg",
              )}
            >
              <Heart className={cn("size-4", loved && "fill-current")} />
              {loved ? "In the vault" : "Save to vault"}
            </button>
          </div>

          {yt ? (
            <div className="mt-10 aspect-video overflow-hidden rounded-xl bg-elevated shadow-[0_0_0_1px_rgb(232_228_220/0.1)]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${yt}`}
                title={track.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          ) : null}

          {track.audio ? (
            <dl className="mt-10 grid gap-4 overflow-hidden rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
              {track.audio.registry ? (
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
                    Registry
                  </dt>
                  <dd className="mt-1 break-all font-mono text-[0.6875rem] text-fg">
                    {track.audio.registry}
                  </dd>
                </div>
              ) : null}
              {track.audio.format ? (
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
                    Master
                  </dt>
                  <dd className="mt-1 font-mono text-[0.6875rem] text-fg">
                    {track.audio.format}
                  </dd>
                </div>
              ) : null}
              {track.audio.lufs ? (
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
                    Loudness
                  </dt>
                  <dd className="mt-1 font-mono text-[0.6875rem] text-fg">
                    {track.audio.lufs}
                  </dd>
                </div>
              ) : null}
              {track.audio.forged ? (
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
                    Forged
                  </dt>
                  <dd className="mt-1 font-mono text-[0.6875rem] text-fg">
                    {track.audio.forged}
                  </dd>
                </div>
              ) : null}
              {track.audio.bytes ? (
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
                    Master size
                  </dt>
                  <dd className="mt-1 font-mono text-[0.6875rem] text-fg">
                    {track.audio.bytes} bytes
                  </dd>
                </div>
              ) : null}
              {track.audio.sha256 ? (
                <div className="min-w-0">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
                    SHA-256
                  </dt>
                  <dd className="mt-1 break-all font-mono text-[0.625rem] leading-relaxed text-gold">
                    {track.audio.sha256}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          {track.audio?.sha256 ? (
            <div className="mt-10">
              <HashVerify
                expect={{
                  title: track.title,
                  sha256: track.audio.sha256,
                  registry: track.audio.registry,
                }}
              />
            </div>
          ) : null}

          {track.slug === "phantom-protocol" ? (
            <aside className="mt-10 overflow-hidden rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(196_165_116/0.28)] md:p-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                {WIRE.kicker} · {WIRE.dateline}
              </p>
              <p className="mt-3 font-display text-lg leading-snug">
                {WIRE.headline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {WIRE.lead}
              </p>
              <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
                {WIRE.partners} · {WIRE.sequence}
              </p>
              <Link
                to="/decree"
                className="mt-5 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
              >
                Open the protocol
              </Link>
            </aside>
          ) : null}
        </div>
      </div>

      {track.slug === "i-wont-do-that" ? <DecreeSeal /> : null}

      {lyrics ? (
        <section className="mt-20 border-t border-line pt-16">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
            The vow
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide">Lyrics</h2>
          <div className="mt-10 space-y-12">
            {lyrics.map((block, i) => (
              <article key={`${block.voice}-${i}`} className="max-w-2xl">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                  {block.voice}
                </p>
                <p className="mt-3 whitespace-pre-line font-display text-base italic leading-relaxed text-fg md:text-lg">
                  {block.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {press ? <PressReview clip={press} /> : null}

      <section className="mt-20">
        <h2 className="font-display text-2xl tracking-wide">
          Adjacent transmissions
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {related.map((t) => (
            <TrackCover key={t.slug} track={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
