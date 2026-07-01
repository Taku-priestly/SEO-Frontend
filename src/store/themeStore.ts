import { create } from "zustand";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}

const stored = localStorage.getItem("theme") as Theme | null;
const initial: Theme = stored ?? "dark";
document.documentElement.setAttribute("data-theme", initial);

export const useThemeStore =
create<ThemeState>((set) => ({
  theme: initial,

  toggle: () =>
    set((s) => {
      const next = s.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return { theme: next };
    }),

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },
}));
