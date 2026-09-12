import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Heart, Pause, Play, X } from "lucide-react";
import { SignalCanvas } from "@/components/signal-canvas";
import { LINKS, getTrack } from "@/data/catalog";
import { usePlayer } from "@/store/player";
import { cn } from "@/lib/utils";

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function PlayerBar() {
  const currentSlug = usePlayer((s) => s.currentSlug);
  const tuned = usePlayer((s) => s.tuned);
  const playing = usePlayer((s) => s.playing);
  const favorites = usePlayer((s) => s.favorites);
  const detune = usePlayer((s) => s.detune);
  const togglePlay = usePlayer((s) => s.togglePlay);
  const toggleFavorite = usePlayer((s) => s.toggleFavorite);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = currentSlug ? getTrack(currentSlug) : undefined;

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (!track?.src || !tuned) {
      el.pause();
      return;
    }
    if (!el.src.includes(track.src)) {
      el.src = track.src;
    }
    if (playing) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [tuned, playing, track?.src, track?.slug]);

  useEffect(() => {
    setTime(0);
    setDuration(0);
  }, [currentSlug]);

  if (!track || !tuned) return null;

  const loved = favorites.includes(track.slug);
  const listenUrl = track.youtube ?? track.spotifyTrack ?? LINKS.spotify;
  const hasMaster = Boolean(track.src);
  const pct = duration > 0 ? Math.min(100, (time / duration) * 100) : 0;

  function seek(e: React.MouseEvent<HTMLButtonElement>) {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    el.currentTime = p * el.duration;
    setTime(el.currentTime);
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6">
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          usePlayer.setState({ playing: false });
          const el = audioRef.current;
          if (el) {
            el.currentTime = 0;
            setTime(0);
          }
        }}
      />
      <div className="pointer-events-auto mx-auto max-w-5xl rounded-xl bg-surface/95 p-2 shadow-[0_0_0_1px_rgb(196_165_116/0.35),0_16px_40px_rgb(0_0_0/0.55)] backdrop-blur-sm md:p-2.5">
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/track/$slug"
            params={{ slug: track.slug }}
            className="size-14 shrink-0 overflow-hidden rounded-md"
          >
            <img
              src={track.cover}
              alt=""
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm tracking-wide text-fg">
              {track.title}
            </p>
            <p className="truncate font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              JAWNBRYTE
              {track.features ? ` × ${track.features}` : ""}
              {" · "}
              {track.duration ?? "single"}
              {hasMaster ? " · sealed" : " · signal live"}
            </p>
            <div className="mt-1 hidden sm:block">
              <SignalCanvas active={playing} />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={loved ? "Remove from vault" : "Save to vault"}
              onClick={() => toggleFavorite(track.slug)}
              className="flex size-11 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:text-gold"
            >
              <Heart
                className={cn("size-4", loved && "fill-gold text-gold")}
              />
            </button>
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => togglePlay()}
              className="flex size-11 items-center justify-center rounded-full bg-gold text-ink transition-colors duration-150 hover:bg-gold-bright"
            >
              {playing ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="size-4 fill-current" style={{ marginLeft: 1 }} />
              )}
            </button>
            {track.youtube || track.spotifyTrack ? (
              <a
                href={listenUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open on streaming"
                className="hidden size-11 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:text-fg sm:flex"
              >
                <ExternalLink className="size-4" />
              </a>
            ) : null}
            <button
              type="button"
              aria-label="Close player"
              onClick={() => detune()}
              className="flex size-11 items-center justify-center rounded-md text-subtle transition-colors duration-150 hover:text-fg"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
        {hasMaster ? (
          <div className="mt-2 flex items-center gap-3 px-1 pb-1">
            <span className="w-8 shrink-0 font-mono text-[0.625rem] tabular-nums text-subtle">
              {fmt(time)}
            </span>
            <button
              type="button"
              aria-label="Seek"
              onClick={seek}
              className="relative h-11 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-elevated">
                <span
                  className="block h-full rounded-full bg-gold"
                  style={{ width: `${pct}%` }}
                />
              </span>
            </button>
            <span className="w-8 shrink-0 text-right font-mono text-[0.625rem] tabular-nums text-subtle">
              {fmt(duration || 280)}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function MiniTuneButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const currentSlug = usePlayer((s) => s.currentSlug);
  const tuned = usePlayer((s) => s.tuned);
  const playing = usePlayer((s) => s.playing);
  const tune = usePlayer((s) => s.tune);
  const togglePlay = usePlayer((s) => s.togglePlay);
  const track = getTrack(slug);
  const active = tuned && currentSlug === slug;
  const live = active && playing;
  const hasMaster = Boolean(track?.src);

  return (
    <button
      type="button"
      onClick={() => (active ? togglePlay() : tune(slug))}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-md bg-gold px-4 font-medium text-ink transition-[transform,background-color] duration-150 hover:bg-gold-bright active:scale-[0.96]",
        className,
      )}
    >
      {live ? (
        <Pause className="size-4 fill-current" />
      ) : (
        <Play className="size-4 fill-current" style={{ marginLeft: 1 }} />
      )}
      {live ? (hasMaster ? "Playing" : "Signal live") : hasMaster ? "Play" : "Tune in"}
    </button>
  );
}
