import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Real sign-out (Firebase/Google) will be wired in later.
    navigate("/");
  };

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between
        border-b border-agri-border bg-agri-surface/90 backdrop-blur
        px-4 py-3 sm:px-6 transition-theme"
    >
      <Logo size="sm" />

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-full border border-agri-border
            bg-agri-surface px-3.5 py-1.5 text-sm font-medium text-agri-text-muted
            transition-theme hover:border-agri-primary hover:text-agri-primary-dark
            dark:hover:text-agri-primary-light"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
