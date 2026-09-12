import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

function RevealedTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ").filter(Boolean);
  return (
    <h1 className={cn("font-display tracking-wide text-balance", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="hero-word"
          style={{ "--hero-delay": `${80 + i * 90}ms` } as CSSProperties}
        >
          {word}
          {i < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </h1>
  );
}

type CinematicHeroProps = {
  poster: string;
  video?: string;
  kicker: string;
  title: string;
  size?: "feature" | "page" | "strip";
  align?: "center" | "left";
  lockup?: string;
  slate?: string;
  foil?: boolean;
  focus?: string;
  veil?: "default" | "portrait" | "lockup";
  bare?: boolean;
  fit?: "cover" | "lockup" | "contain";
  anchor?: "center" | "end";
  children?: ReactNode;
};

export function CinematicHero({
  poster,
  video,
  kicker,
  title,
  size = "page",
  align = "left",
  lockup,
  slate = "Lyte Sketch 143",
  foil = false,
  focus,
  veil = "default",
  bare = false,
  fit = "cover",
  anchor = "center",
  children,
}: CinematicHeroProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduce || !video) return;

    const tryPlay = () => {
      el.play().catch(() => {});
    };

    tryPlay();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video, reduce]);

  return (
    <section
      className={cn(
        "hero-frame relative flex flex-col overflow-hidden border-b border-line",
        size === "feature" && "hero-frame-feature",
        size === "page" && "hero-frame-page",
        size === "strip" && "hero-frame-strip",
      )}
    >
      <div className="hero-letterbox hero-letterbox-top" aria-hidden="true" />
      <div className="hero-letterbox hero-letterbox-bottom" aria-hidden="true" />

      <div
        className={cn(
          "absolute inset-0 bg-ink",
          !reduce && !video && "hero-kenburns",
        )}
      >
        {video && !reduce ? (
          <video
            ref={videoRef}
            className={cn(
              "h-full w-full transition-opacity duration-700",
              fit === "lockup"
                ? "hero-media-lockup"
                : fit === "contain"
                  ? "object-contain"
                  : "object-cover",
              ready ? "opacity-100" : "opacity-0",
            )}
            style={focus ? { objectPosition: focus } : undefined}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            onCanPlay={() => setReady(true)}
            aria-hidden="true"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : null}
        <img
          src={poster}
          alt=""
            className={cn(
            "absolute inset-0 h-full w-full outline-none",
            fit === "lockup"
              ? "hero-media-lockup"
              : fit === "contain"
                ? "object-contain"
                : "object-cover",
            video && !reduce && ready ? "opacity-0" : "opacity-100",
          )}
          style={focus ? { objectPosition: focus } : undefined}
        />
      </div>

      <div
        className={cn(
          "hero-veil pointer-events-none absolute inset-0",
          veil === "portrait" && "hero-veil-portrait",
          veil === "lockup" && "hero-veil-lockup",
        )}
      />
      <div className="hero-grain pointer-events-none absolute inset-0" />
      <div className="hero-scan pointer-events-none" aria-hidden="true" />

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 md:px-6 md:py-24",
          size === "feature" &&
            !bare &&
            anchor !== "end" &&
            "justify-center py-20 md:py-28",
          size === "feature" &&
            (bare || anchor === "end") &&
            "justify-end py-16 md:py-20",
          size !== "feature" && "justify-end",
          align === "center" && "items-center text-center",
        )}
      >
        <p
          className={cn(
            "hero-kicker font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-gold",
            bare &&
              "absolute left-0 right-0 top-16 text-center md:top-[4.75rem]",
          )}
        >
          {kicker}
        </p>

        {lockup ? (
          <div className="hero-lockup relative mt-8 overflow-hidden rounded-lg shadow-[0_0_0_1px_rgb(196_165_116/0.28)]">
            <img
              src={lockup}
              alt=""
            className="block w-full max-w-md object-cover outline-none md:max-w-lg"
            />
            <span className="hero-shine" aria-hidden="true" />
          </div>
        ) : null}

        <RevealedTitle
          text={title}
          className={cn(
            lockup || bare
              ? "sr-only"
              : size === "feature" || foil
                ? "mt-4 gold-foil text-6xl md:text-8xl"
                : "mt-4 text-5xl text-fg md:text-6xl",
            size === "strip" && !lockup && !foil && !bare && "text-4xl md:text-5xl",
          )}
        />

        {children ? (
          <div
            className={cn(
              "hero-copy mt-6",
              align === "center" && "flex flex-col items-center",
            )}
          >
            {children}
          </div>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute bottom-5 left-4 z-10 hidden items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-gold md:bottom-7 md:left-6 md:flex"
        aria-hidden="true"
      >
        <span className="hero-rec" />
        {slate}
      </div>
    </section>
  );
}
