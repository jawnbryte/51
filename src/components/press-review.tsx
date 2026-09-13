import { useEffect } from "react";
import { Star } from "lucide-react";
import type { PressClip } from "@/data/press";

export function PressReview({ clip }: { clip: PressClip }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#review") return;
    document
      .getElementById("review")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return (
    <section
      id="review"
      className="mt-20 scroll-mt-28 border-t border-line pt-16"
    >
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
        {clip.outlet} · {clip.kicker}
      </p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl tracking-wide md:text-4xl">
        {clip.headline}
      </h2>
      <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
        {clip.author} · {clip.genre}
      </p>

      <div className="mt-6 flex items-center gap-1 text-gold">
        {Array.from({ length: clip.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
        <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
          {clip.rating} / 5
        </span>
      </div>
      <p className="mt-3 font-display text-lg italic text-gold-bright">
        {clip.verdict}
      </p>

      <blockquote className="mt-10 max-w-3xl border-l-2 border-gold pl-5">
        <p className="font-display text-2xl italic leading-snug text-fg md:text-3xl">
          {clip.pull}
        </p>
      </blockquote>

      <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
        {clip.executive.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </div>

      <h3 className="mt-16 font-display text-2xl tracking-wide">
        Sonic architecture
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        The intro is a system reboot, not a hook. Radio static. Distant ocean.
        Heartbeat. Whispered recovery of signal. Production as emotional
        scaffolding — it never competes with the lyric.
      </p>
      <div className="mt-6 overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
        <div className="hidden grid-cols-[8rem_1fr_1fr] border-b border-line px-5 py-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-subtle md:grid">
          <span>Section</span>
          <span>Production</span>
          <span>Function</span>
        </div>
        {clip.sonic.map((row) => (
          <div
            key={row.section}
            className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[8rem_1fr_1fr] md:items-baseline md:gap-4"
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
              {row.section}
            </p>
            <p className="text-sm text-fg">{row.element}</p>
            <p className="text-sm text-muted">{row.function}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-16 font-display text-2xl tracking-wide">
        Three simultaneous levels
      </h3>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {clip.levels.map((level, i) => (
          <article
            key={level.title}
            className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
          >
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-gold">
              Level {i + 1}
            </p>
            <h4 className="mt-2 font-display text-lg tracking-wide">
              {level.title}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {level.body}
            </p>
            {level.quote ? (
              <p className="mt-4 font-display text-sm italic leading-snug text-gold-bright">
                {level.quote}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {clip.metaphors.map((m) => (
          <span
            key={m.term}
            className="rounded-sm px-3 py-2 shadow-[0_0_0_1px_rgb(196_165_116/0.35)]"
          >
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold">
              {m.term}
            </span>
            <span className="mt-1 block text-xs leading-snug text-muted">
              {m.gloss}
            </span>
          </span>
        ))}
      </div>

      <h3 className="mt-16 font-display text-2xl tracking-wide">
        Loss · Crucible · Resurrection
      </h3>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {clip.movements.map((m) => (
          <article key={m.n}>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
              Movement {m.n}
            </p>
            <h4 className="mt-2 font-display text-xl tracking-wide">
              {m.title}
            </h4>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              {m.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)] md:p-6">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
            {clip.motif.title}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {clip.motif.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-fg">
            The track never sentimentalizes the loss. Grief is integrated into
            the larger narrative of transformation.
          </p>
        </article>
        <article className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_rgb(196_165_116/0.28)] md:p-6">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
            STRYDER integration
          </p>
          <p className="mt-4 font-display text-lg italic leading-snug text-gold-bright">
            {clip.stryder.quote}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {clip.stryder.body}
          </p>
        </article>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-display text-xl tracking-wide">The mix</h3>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {clip.mix.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl tracking-wide">Own frequency</h3>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {clip.compare.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-16 font-display text-2xl tracking-wide">
        Why it matters
      </h3>
      <ol className="mt-6 grid gap-4 md:grid-cols-2">
        {clip.significance.map((p, i) => (
          <li key={p} className="flex gap-4">
            <span className="font-mono text-[0.6875rem] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-relaxed text-muted">{p}</span>
          </li>
        ))}
      </ol>

      <aside className="mt-12 overflow-hidden rounded-xl bg-surface p-6 shadow-[0_0_0_1px_rgb(196_165_116/0.28)] md:p-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          Final verdict · {clip.rating} / 5
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-fg">
          {clip.close}
        </p>
        <p className="mt-6 font-display text-xl italic text-gold-bright">
          The porch light stays on.
        </p>
        <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-subtle">
          Essential listening · {clip.for.join(" · ")}
        </p>
        <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-gold">
          {clip.amen}
        </p>
        {clip.pdf ? (
          <a
            href={clip.pdf}
            className="mt-6 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
          >
            Download original review
          </a>
        ) : null}
      </aside>
    </section>
  );
}
