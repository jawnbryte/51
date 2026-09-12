import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TrackCover } from "@/components/track-cover";
import { Input } from "@/components/ui/input";
import { CinematicHero } from "@/components/cinematic-hero";
import { SERIES_META, TRACKS, type Series } from "@/data/catalog";
import { DOCTRINE } from "@/data/doctrine";
import { usePlayer } from "@/store/player";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalog")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = typeof search.series === "string" ? search.series : undefined;
    const allowed = [
      "vault",
      "core",
      "crash",
      "frequency",
      "sealed",
      "origin",
      "street",
      "ai",
    ] as const;
    if (raw && (allowed as readonly string[]).includes(raw)) {
      return { series: raw as (typeof allowed)[number] };
    }
    return {} as { series?: (typeof allowed)[number] };
  },
  component: Catalog,
});

const FILTERS: Array<{ id: "all" | "vault" | Series; label: string }> = [
  { id: "all", label: "All" },
  { id: "vault", label: "Vault" },
  { id: "core", label: "Core" },
  { id: "crash", label: "C.R.A.S.H." },
  { id: "frequency", label: "Frequency" },
  { id: "sealed", label: "Sealed" },
  { id: "origin", label: "Origin" },
  { id: "street", label: "Street" },
  { id: "ai", label: "A.I." },
];

function Catalog() {
  const { series } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>(
    series ?? "all",
  );
  const favorites = usePlayer((s) => s.favorites);

  useEffect(() => {
    setFilter(series ?? "all");
  }, [series]);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return TRACKS.filter((t) => {
      if (filter === "vault") {
        if (!favorites.includes(t.slug)) return false;
      } else if (filter !== "all" && t.series !== filter) {
        return false;
      }
      if (!query) return true;
      return (
        t.title.toLowerCase().includes(query) ||
        t.blurb.toLowerCase().includes(query) ||
        SERIES_META[t.series].label.toLowerCase().includes(query)
      );
    }).sort((a, b) => b.released.localeCompare(a.released));
  }, [q, filter, favorites]);

  return (
    <main>
      <CinematicHero
        poster="/brand/lockup.jpg"
        video="/brand/hero-logo.mp4"
        kicker="Discography"
        title="The catalog"
        size="strip"
        slate="JAWNBRYTE × STRYDER"
      >
        <p className="max-w-xl text-base leading-relaxed text-muted">
          JAWNBRYTE × STRYDER. Every listed transmission is a chapter — core
          anthems, C.R.A.S.H. briefs, frequency protocols, origin records.
        </p>
      </CinematicHero>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search transmissions"
          aria-label="Search transmissions"
          className="pl-10"
        />
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFilter(f.id);
                void navigate({
                  search: f.id === "all" ? {} : { series: f.id },
                });
              }}
              className={cn(
                "flex h-10 shrink-0 items-center gap-1.5 rounded-md px-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-150",
                active
                  ? "bg-gold text-ink"
                  : "text-muted shadow-[0_0_0_1px_rgb(232_228_220/0.12)] hover:text-fg",
              )}
            >
              {f.id === "vault" ? <Heart className="size-3" /> : null}
              {f.label}
            </button>
          );
        })}
      </div>

      {filter === "crash" ? (
        <div className="mt-8 rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(180_84_74/0.4)] md:p-6">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-danger">
            Internal vault
          </p>
          <p className="mt-2 font-display text-xl tracking-wide">
            {DOCTRINE.code} · Doctrine {DOCTRINE.update}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            {DOCTRINE.charge} The song is ordinance. Open the living brief,
            then run the tracks.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6">
            <Link
              to="/crash"
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
            >
              Open Doctrine 02
            </Link>
            <Link
              to="/harvest"
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              Harvest mechanics
            </Link>
            <Link
              to="/decree"
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted hover:text-gold"
            >
              Sealed-decree protocol
            </Link>
          </div>
        </div>
      ) : null}

      {filter === "sealed" ? (
        <div className="mt-8 rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(196_165_116/0.4)] md:p-6">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
            Field guide · Terminal 09X
          </p>
          <p className="mt-2 font-display text-xl tracking-wide">
            Song-to-Sealed-Decree Protocol
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            The file is the evidence. The hash is the lock. Architecting
            transmissions. Refusing the harvest.
          </p>
          <Link
            to="/decree"
            className="mt-4 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
          >
            Open the protocol
          </Link>
        </div>
      ) : null}

      {list.length === 0 ? (
        <p className="mt-16 text-muted">
          No transmissions in this filter. Clear search or switch series.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {list.map((t) => (
            <TrackCover key={t.slug} track={t} />
          ))}
        </div>
      )}
      </div>
    </main>
  );
}
