import { ExternalLink } from "lucide-react";
import { VOYAGE, type VoyageIssueId } from "@/data/voyage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VoyageSpread({
  issue,
  compact = false,
}: {
  issue?: VoyageIssueId;
  compact?: boolean;
}) {
  const covers = issue
    ? VOYAGE.issues.filter((item) => item.id === issue)
    : VOYAGE.issues;

  return (
    <section
      className={cn(
        compact ? "mt-0" : "mt-16 border-t border-line pt-16 md:mt-20",
      )}
    >
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
        {VOYAGE.outlet} · {VOYAGE.kicker}
      </p>
      <h2
        className={cn(
          "mt-2 font-display tracking-wide",
          compact ? "text-2xl" : "text-3xl md:text-4xl",
        )}
      >
        {VOYAGE.title}
      </h2>
      <p className="mt-4 max-w-2xl font-display text-lg italic leading-snug text-gold-bright">
        “{VOYAGE.pull}”
      </p>

      <div
        className={cn(
          "mt-8 grid items-start gap-6",
          covers.length > 1 ? "md:grid-cols-2" : "max-w-md",
        )}
      >
        {covers.map((cover) => (
          <a
            key={cover.id}
            href={VOYAGE.url}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <img
              src={cover.src}
              alt={`${VOYAGE.outlet} — ${cover.title}`}
              className="w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-white/10 shadow-[0_0_0_1px_rgb(196_165_116/0.28)] transition-[box-shadow] duration-150 group-hover:shadow-[0_0_0_1px_rgb(196_165_116/0.55)]"
            />
            <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-gold">
              {cover.masthead}
            </p>
            <p className="mt-1 font-display text-xl tracking-wide">
              {cover.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {cover.deck}
            </p>
          </a>
        ))}
      </div>

      <Button asChild variant={compact ? "ghost" : "primary"} className="mt-8">
        <a href={VOYAGE.url} target="_blank" rel="noreferrer">
          Read the conversation
          <ExternalLink className="size-3.5" />
        </a>
      </Button>
    </section>
  );
}
