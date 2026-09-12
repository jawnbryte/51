import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-lg flex-col justify-center px-4 py-16 md:px-6">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">
        The Lattice
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-wide md:text-5xl">
        Enter the frequency
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        Sign in to transmit. The feed is public. The blade is yours. We do not
        collect worship. We braid frequencies.
      </p>
      <div className="mt-10 flex max-w-sm flex-col gap-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              size="lg"
              onClick={() => signIn(p.providerId, { callbackURL: "/lattice" })}
            >
              Continue with {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
      </div>
      <Link
        to="/lattice"
        className="mt-8 inline-flex h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold"
      >
        Read the lattice without transmitting
      </Link>
    </main>
  );
}
