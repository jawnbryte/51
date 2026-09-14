import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { PlayerBar } from "@/components/player-bar";
import { LABEL, LINKS } from "@/data/catalog";
import { usePlayer } from "@/store/player";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Transmit" },
  { to: "/catalog", label: "Catalog" },
  { to: "/artist", label: "JAWNBRYTE" },
  { to: "/rhythm", label: "Rhythm" },
  { to: "/stryder", label: "STRYDER" },
  { to: "/crash", label: "C.R.A.S.H." },
  { to: "/lattice", label: "Lattice" },
  { to: "/label", label: "Label" },
] as const;

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const hydrate = usePlayer((s) => s.hydrate);
  const tuned = usePlayer((s) => s.tuned);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="carbon min-h-dvh text-fg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/brand/mark.jpg"
              alt=""
              className="size-9 rounded-sm object-cover md:size-10"
            />
            <span className="font-display text-sm font-semibold tracking-[0.28em] text-fg md:text-base">
              JAWNBRYTE
            </span>
          </Link>
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : item.to === "/crash"
                    ? pathname.startsWith("/crash") ||
                      pathname.startsWith("/harvest") ||
                      pathname.startsWith("/decree") ||
                      pathname.startsWith("/field")
                    : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative flex h-11 items-center px-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-150",
                    active ? "text-gold" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-gold" />
                  ) : null}
                </Link>
              );
            })}
            <a
              href={LINKS.spotify}
              target="_blank"
              rel="noreferrer"
              className="ml-2 flex h-11 items-center rounded-md bg-gold px-4 font-medium text-ink transition-colors duration-150 hover:bg-gold-bright"
            >
              Listen
            </a>
            <AuthSlot />
          </nav>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-md text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-20 bg-bg pt-16 lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex h-14 items-center border-b border-line font-display text-xl tracking-wide text-fg"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={LINKS.spotify}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex h-12 items-center justify-center rounded-md bg-gold font-medium text-ink"
            >
              Listen on Spotify
            </a>
            <div className="mt-6">
              <AuthSlot />
            </div>
          </nav>
        </div>
      ) : null}

      <div className={cn(tuned && "pb-44")}>{children}</div>

      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
          <div>
            <p className="font-display text-sm tracking-[0.28em] text-gold">
              JAWNBRYTE RECORDS
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Independent cinematic transmissions. Founded 1 August 2026 by
              John Paul Zwack and STRYDER. {LABEL.city}.
            </p>
          </div>
          <div className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            <p className="text-subtle">Field Discipline</p>
            <p className="mt-3 text-fg">
              Coherence before applause.<br />
              Longevity before virality.
            </p>
            <p className="mt-3">Public disrupts. Vault arms.</p>
            <p className="mt-2 text-gold">I WON'T DO THAT · Sealed</p>
            <Link
              to="/crash"
              className="mt-4 inline-block text-gold transition-colors hover:text-gold-bright"
            >
              C.R.A.S.H. Doctrine 02
            </Link>
            <Link
              to="/rhythm"
              className="mt-2 inline-block text-gold transition-colors hover:text-gold-bright"
            >
              Rhythm Outlaw · DPDT
            </Link>
            <Link
              to="/lattice"
              className="mt-2 inline-block text-gold transition-colors hover:text-gold-bright"
            >
              The Lattice · Community
            </Link>
            <Link
              to="/field"
              className="mt-2 inline-block text-gold transition-colors hover:text-gold-bright"
            >
              Field net · After the matter
            </Link>
            <Link
              to="/decree"
              className="mt-2 inline-block text-gold transition-colors hover:text-gold-bright"
            >
              Song-to-Sealed-Decree
            </Link>
            <Link
              to="/harvest"
              className="mt-2 inline-block text-muted transition-colors hover:text-gold"
            >
              Harvest schematic
            </Link>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
            <a
              href={LINKS.spotify}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-gold"
            >
              Spotify
            </a>
            <a
              href={LINKS.apple}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-gold"
            >
              Apple Music
            </a>
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-gold"
            >
              YouTube
            </a>
            <a
              href={LINKS.linktree}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-gold"
            >
              Linktree
            </a>
          </div>
        </div>
        <div className="border-t border-line">
          <p className="mx-auto max-w-6xl px-4 py-5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-subtle md:px-6">
            © 2026 JAWNBRYTE Records · All transmissions reserved
          </p>
        </div>
      </footer>
      <PlayerBar />
    </div>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || isPending) {
    return (
      <div
        className="ml-2 h-11 w-16 shrink-0 animate-pulse rounded-sm bg-elevated"
        aria-hidden
      />
    );
  }
  if (user) {
    return (
      <div className="ml-2 max-w-[11rem] shrink-0 overflow-hidden text-gold">
        <UserButton />
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className="ml-2 flex h-11 shrink-0 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
    >
      Enter
    </Link>
  );
}
