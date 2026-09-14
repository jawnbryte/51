import { useMemo, useState } from "react";
import { TRACKS } from "@/data/catalog";
import { sameHash, sha256Hex } from "@/lib/sha256";
import { cn } from "@/lib/utils";

type Verdict =
  | { kind: "master"; title: string; registry?: string }
  | { kind: "web"; title: string }
  | { kind: "unknown" };

function matchHash(hex: string): Verdict {
  for (const t of TRACKS) {
    if (t.audio?.sha256 && sameHash(hex, t.audio.sha256)) {
      return { kind: "master", title: t.title, registry: t.audio.registry };
    }
    if (t.audio?.webSha256 && sameHash(hex, t.audio.webSha256)) {
      return { kind: "web", title: t.title };
    }
  }
  return { kind: "unknown" };
}

export function HashVerify({
  expect,
}: {
  expect?: { title: string; sha256: string; registry?: string };
}) {
  const [name, setName] = useState<string | null>(null);
  const [bytes, setBytes] = useState<number | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const verdict = useMemo(() => {
    if (!hash) return null;
    if (expect && sameHash(hash, expect.sha256)) {
      return {
        kind: "master" as const,
        title: expect.title,
        registry: expect.registry,
      };
    }
    return matchHash(hash);
  }, [hash, expect]);

  async function ingest(file: File) {
    setErr(null);
    setBusy(true);
    setName(file.name);
    setBytes(file.size);
    setHash(null);
    try {
      const hex = await sha256Hex(await file.arrayBuffer());
      setHash(hex);
    } catch {
      setErr("This browser could not complete SHA-256.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_rgb(196_165_116/0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/35 px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold md:px-6">
        <span>SHA-256 verifier · client-side · file never leaves this device</span>
        <span>{busy ? "Hashing…" : hash ? "Settled" : "Awaiting file"}</span>
      </div>
      <label
        className="flex min-h-32 cursor-pointer flex-col items-start justify-center px-5 py-6 md:px-6"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) void ingest(file);
        }}
      >
        <input
          type="file"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void ingest(file);
          }}
        />
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
          Drop the master · or click to choose
        </span>
        <span className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Hash the file you hold. Compare it to the published fingerprint. A
          match is the sealed edition. Any other hash is a different edition —
          or it is noise.
        </span>
      </label>
      {name ? (
        <dl className="border-t border-line px-5 py-5 md:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-subtle">
                File
              </dt>
              <dd className="mt-1 break-all font-mono text-[0.6875rem] text-fg">
                {name}
                {bytes != null ? ` · ${bytes.toLocaleString()} bytes` : ""}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-subtle">
                SHA-256
              </dt>
              <dd className="mt-1 break-all font-mono text-[0.625rem] leading-relaxed text-gold">
                {busy ? "computing…" : (hash ?? "—")}
              </dd>
            </div>
          </div>
          {verdict ? (
            <p
              className={cn(
                "mt-5 font-display text-lg",
                verdict.kind === "master"
                  ? "text-gold-bright"
                  : verdict.kind === "web"
                    ? "text-fg"
                    : "text-danger",
              )}
            >
              {verdict.kind === "master"
                ? `Sealed master · ${verdict.title}${verdict.registry ? ` · ${verdict.registry}` : ""}`
                : verdict.kind === "web"
                  ? `Web encode of ${verdict.title} — not the WAV master. Different file, different hash.`
                  : "No match in the vault. Different edition, or noise."}
            </p>
          ) : null}
          {err ? <p className="mt-3 text-sm text-danger">{err}</p> : null}
        </dl>
      ) : null}
    </div>
  );
}
