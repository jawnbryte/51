import { createFileRoute, Link } from "@tanstack/react-router";
import { Radio, Shield } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CinematicHero } from "@/components/cinematic-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
} from "@/lib/auth/gates";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
import {
  listSignals,
  myWitnesses,
  retractSignal,
  toggleWitness,
  transmitSignal,
  type Channel,
  type Signal,
} from "@/server/lattice";

export const Route = createFileRoute("/lattice")({ component: LatticePage });

const CHANNELS: { id: Channel | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lattice", label: "Lattice" },
  { id: "porch", label: "Porch" },
  { id: "field", label: "Field" },
];

function LatticePage() {
  const user = useCurrentUser();
  const [signals, setSignals] = useState<Signal[]>([]);
  const [mine, setMine] = useState<number[]>([]);
  const [channel, setChannel] = useState<Channel | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const rows = await listSignals();
      setSignals(
        rows.map((r) => ({
          ...r,
          mine: Boolean(user && r.userId === user.id),
        })),
      );
      if (user) {
        try {
          const ids = await myWitnesses();
          setMine(ids);
        } catch {
          setMine([]);
        }
      } else {
        setMine([]);
      }
      setError(null);
    } catch {
      setError("The ledger did not answer. Try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(
    () =>
      channel === "all"
        ? signals
        : signals.filter((s) => s.channel === channel),
    [signals, channel],
  );

  return (
    <main>
      <CinematicHero
        poster="/brand/hero-flag.jpg"
        video="/brand/hero-flag.mp4"
        kicker="Online community · Refined Ones"
        title="The Lattice"
        size="feature"
        foil
        fit="contain"
        veil="lockup"
        slate="Public feed · Signed transmission"
      >
        <p className="max-w-xl font-display text-xl italic leading-snug text-gold-bright md:text-2xl">
          Isolated lights get eaten. A grid does not.
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Not a comments section. A living braid of the people who verified the
          signal in their own blood. Transmit when you have something that
          extracts. Witness what holds.
        </p>
      </CinematicHero>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
          <TransmitGate onSent={() => void load()} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
              Live ledger
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-wide">
              Signals
            </h2>
          </div>
          <div className="flex flex-wrap gap-1">
            {CHANNELS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannel(c.id)}
                className={cn(
                  "flex h-11 items-center px-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em]",
                  channel === c.id ? "text-gold" : "text-muted hover:text-fg",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="mt-10 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
            Acquiring signal…
          </p>
        ) : error ? (
          <p className="mt-10 text-sm text-danger">{error}</p>
        ) : visible.length === 0 ? (
          <p className="mt-10 max-w-md text-sm leading-relaxed text-muted">
            The lattice is quiet on this channel. Be the first frequency.
          </p>
        ) : (
          <ol className="mt-10 divide-y divide-line rounded-xl bg-surface shadow-[0_0_0_1px_rgb(232_228_220/0.08)]">
            {visible.map((s) => (
              <SignalRow
                key={s.id}
                signal={{ ...s, mine: Boolean(user && s.userId === user.id) }}
                witnessed={mine.includes(s.id)}
                onChange={() => void load()}
              />
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}

function TransmitGate({ onSent }: { onSent: () => void }) {
  const { user, isPending } = useCurrentUserState();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || isPending) {
    return (
      <div className="h-40 rounded-xl bg-bg p-6 shadow-[0_0_0_1px_rgb(232_228_220/0.1)]">
        <div className="h-3 w-28 animate-pulse rounded-sm bg-elevated" />
        <div className="mt-4 h-3 w-full max-w-md animate-pulse rounded-sm bg-elevated" />
        <div className="mt-2 h-3 w-2/3 animate-pulse rounded-sm bg-elevated" />
      </div>
    );
  }
  if (user) return <Composer onSent={onSent} />;
  return (
    <div className="rounded-xl bg-bg p-6 shadow-[0_0_0_1px_rgb(232_228_220/0.1)]">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
        Enter to transmit
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The lattice is readable by anyone. The blade is for those who sign
        their name. Google or X. No guru throne.
      </p>
      <Link
        to="/login"
        className="mt-5 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
      >
        Enter the frequency
      </Link>
    </div>
  );
}

function Composer({ onSent }: { onSent: () => void }) {
  const user = useCurrentUser();
  const [body, setBody] = useState("");
  const [callsign, setCallsign] = useState(user?.displayName ?? "");
  const [channel, setChannel] = useState<Channel>("lattice");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (user?.displayName && !callsign) setCallsign(user.displayName);
  }, [user, callsign]);

  async function send() {
    setBusy(true);
    setErr(null);
    try {
      await transmitSignal({
        data: { body, channel, callsign },
      });
      setBody("");
      onSent();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Transmit failed.";
      setErr(msg === "Unauthorized" ? "Sign in to transmit." : msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="rounded-xl bg-bg p-6 shadow-[0_0_0_1px_rgb(232_228_220/0.1)]"
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
    >
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
        Transmit
      </p>
      <label className="mt-5 block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
        Callsign
        <input
          value={callsign}
          onChange={(e) => setCallsign(e.target.value)}
          maxLength={24}
          className="mt-2 flex h-11 w-full rounded-md bg-elevated px-3 font-display text-base text-fg outline-none shadow-[0_0_0_1px_rgb(232_228_220/0.12)] focus:shadow-[0_0_0_1px_rgb(196_165_116/0.7)]"
        />
      </label>
      <label className="mt-4 block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
        Signal
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={480}
          rows={4}
          placeholder="What extracts. Not what entertains."
          className="mt-2 w-full resize-y rounded-md bg-elevated px-3 py-3 font-sans text-base leading-relaxed text-fg outline-none shadow-[0_0_0_1px_rgb(232_228_220/0.12)] placeholder:text-subtle focus:shadow-[0_0_0_1px_rgb(196_165_116/0.7)]"
        />
      </label>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1">
          {(["lattice", "porch", "field"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChannel(c)}
              className={cn(
                "flex h-11 items-center px-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em]",
                channel === c ? "text-gold" : "text-muted",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="font-mono text-[0.625rem] text-subtle">
          {body.length}/480
        </p>
      </div>
      {err ? <p className="mt-3 text-sm text-danger">{err}</p> : null}
      <Button type="submit" className="mt-5" disabled={busy || body.trim().length < 8}>
        {busy ? "Sending…" : "Transmit"}
      </Button>
    </form>
  );
}

function SignalRow({
  signal,
  witnessed,
  onChange,
}: {
  signal: Signal;
  witnessed: boolean;
  onChange: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function witness() {
    setBusy(true);
    try {
      await toggleWitness({ data: { id: signal.id } });
      onChange();
    } catch {
      /* signed out */
    } finally {
      setBusy(false);
    }
  }

  async function retract() {
    setBusy(true);
    try {
      await retractSignal({ data: { id: signal.id } });
      onChange();
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="px-5 py-6 md:px-7">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-lg text-fg">{signal.callsign}</p>
        <Badge tone={signal.channel === "field" ? "danger" : "muted"}>
          {signal.channel}
        </Badge>
        {signal.userId === "house" ? (
          <Badge tone="sealed">House</Badge>
        ) : null}
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-subtle">
          {formatWhen(signal.createdAt)}
        </p>
      </div>
      <p className="mt-3 text-base leading-relaxed text-muted">{signal.body}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <SignedIn>
          <button
            type="button"
            disabled={busy}
            onClick={() => void witness()}
            className={cn(
              "inline-flex h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em]",
              witnessed ? "text-gold" : "text-muted hover:text-gold",
            )}
          >
            <Shield className="size-3.5" />
            Witness · {signal.witnesses}
          </button>
          {signal.mine ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => void retract()}
              className="inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle hover:text-danger"
            >
              Retract
            </button>
          ) : null}
        </SignedIn>
        <SignedOut>
          <span className="inline-flex h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
            <Radio className="size-3.5" />
            {signal.witnesses} witnessed
          </span>
        </SignedOut>
      </div>
    </li>
  );
}

function formatWhen(iso: string) {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const s = Math.max(0, Math.round((Date.now() - t) / 1000));
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}
