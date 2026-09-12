import { create } from "zustand";

const FAV_KEY = "jawnbryte:favorites";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((x) => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

function writeFavorites(slugs: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAV_KEY, JSON.stringify(slugs));
}

type PlayerState = {
  currentSlug: string | null;
  tuned: boolean;
  playing: boolean;
  favorites: string[];
  hydrated: boolean;
  hydrate: () => void;
  tune: (slug: string) => void;
  detune: () => void;
  togglePlay: () => void;
  toggleFavorite: (slug: string) => void;
};

export const usePlayer = create<PlayerState>((set, get) => ({
  currentSlug: null,
  tuned: false,
  playing: false,
  favorites: [],
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    set({ favorites: readFavorites(), hydrated: true });
  },
  tune: (slug) => set({ currentSlug: slug, tuned: true, playing: true }),
  detune: () => set({ tuned: false, playing: false }),
  togglePlay: () => {
    if (!get().tuned) return;
    set({ playing: !get().playing });
  },
  toggleFavorite: (slug) => {
    const has = get().favorites.includes(slug);
    const next = has
      ? get().favorites.filter((s) => s !== slug)
      : [...get().favorites, slug];
    writeFavorites(next);
    set({ favorites: next });
  },
}));
