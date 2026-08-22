import { Moon, Sun } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppContext();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative flex h-9 w-9 items-center justify-center rounded-full
        border border-agri-border bg-agri-surface text-agri-text-muted
        transition-theme hover:text-agri-primary hover:border-agri-primary-light
        focus-visible:outline-2 focus-visible:outline-agri-primary"
    >
      <Sun
        className={`absolute h-4.5 w-4.5 transition-all duration-200 ${
          isDark ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-200 ${
          isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
        }`}
      />
    </button>
  );
}
