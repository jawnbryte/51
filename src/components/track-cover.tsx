import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Track } from "@/data/catalog";
import { SERIES_META } from "@/data/catalog";
import { usePlayer } from "@/store/player";

export function TrackCover({
  track,
  size = "md",
  showMeta = true,
}: {
  track: Track;
  size?: "sm" | "md" | "lg";
  showMeta?: boolean;
}) {
  const tune = usePlayer((s) => s.tune);

  return (
    <article className="group flex flex-col gap-3">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-elevated shadow-[0_0_0_1px_rgb(255_255_255/0.08)]",
          size === "sm" && "aspect-square",
          size === "md" && "aspect-square",
          size === "lg" && "aspect-square",
        )}
      >
        <Link
          to="/track/$slug"
          params={{ slug: track.slug }}
          className="block h-full w-full"
        >
          <img
            src={track.cover}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </Link>
        <button
          type="button"
          aria-label={`Tune ${track.title}`}
          onClick={() => tune(track.slug)}
          className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-gold text-ink opacity-100 shadow-[0_8px_24px_rgb(0_0_0/0.45)] transition-[transform,background-color] duration-150 hover:bg-gold-bright md:opacity-0 md:group-hover:opacity-100"
        >
          <Play className="size-4 fill-current" style={{ marginLeft: 2 }} />
        </button>
        {track.sealed ? (
          <Badge tone="sealed" className="absolute left-3 top-3">
            Sealed
          </Badge>
        ) : null}
      </div>
      {showMeta ? (
        <div className="flex flex-col gap-1 px-0.5">
          <Link
            to="/track/$slug"
            params={{ slug: track.slug }}
            className="font-display text-base font-medium tracking-wide text-fg transition-colors duration-150 hover:text-gold"
          >
            {track.title}
          </Link>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            {SERIES_META[track.series].label}
            {track.duration ? ` · ${track.duration}` : ""}
            {track.views ? ` · ${track.views}` : ""}
          </p>
        </div>
      ) : null}
    </article>
  );
}
