import { create } from "zustand";
import type Lenis from "lenis";

type UIState = {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  lenis: Lenis | null;
  setLenis: (l: Lenis | null) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}));
