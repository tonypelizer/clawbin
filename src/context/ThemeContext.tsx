"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

const STORAGE_KEY = "clawbin-theme";

function applyTheme(t: Theme) {
  if (t === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default "dark" — the inline FOUC script may have already applied "light" to
  // the DOM, but we start with "dark" as SSR-safe default and sync on mount.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const systemLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    const resolved: Theme = stored ?? (systemLight ? "light" : "dark");
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Inline script string for FOUC prevention.
 * Must run synchronously before the page paints to apply the saved theme
 * before React hydrates. Inject via dangerouslySetInnerHTML in layout.tsx.
 */
export const THEME_SCRIPT = `(function(){
  try {
    var t = localStorage.getItem('clawbin-theme');
    if (!t) {
      t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    if (t === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch(e) {}
})();`;
