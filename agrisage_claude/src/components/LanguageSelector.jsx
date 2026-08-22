import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import clsx from "clsx";
import { useAppContext } from "../context/AppContext";

export default function LanguageSelector() {
  const { languages, selectedLanguage, selectLanguage } = useAppContext();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-agri-border
          bg-agri-surface px-3.5 py-1.5 text-sm font-medium text-agri-text
          transition-theme hover:border-agri-primary-light"
      >
        <Globe className="h-3.5 w-3.5 text-agri-text-muted" />
        <span>{selectedLanguage.name}</span>
        <ChevronDown
          className={clsx(
            "h-3.5 w-3.5 text-agri-text-muted transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-xl
            border border-agri-border bg-agri-surface py-1 shadow-panel animate-fade-in"
        >
          {languages.map((language) => {
            const isActive = language.code === selectedLanguage.code;
            return (
              <li key={language.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    selectLanguage(language);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex w-full items-center justify-between px-3.5 py-2 text-sm transition-theme",
                    isActive
                      ? "bg-agri-primary-soft text-agri-primary-dark dark:text-agri-primary-light font-medium"
                      : "text-agri-text hover:bg-agri-surface-alt"
                  )}
                >
                  <span>{language.name}</span>
                  {isActive && <Check className="h-3.5 w-3.5" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
