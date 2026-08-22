import clsx from "clsx";
import { useAppContext } from "../context/AppContext";

export default function CountrySelector() {
  const { countries, selectedCountry, selectCountry } = useAppContext();

  return (
    <div
      className="flex items-center gap-2 overflow-x-auto agri-scroll pb-1 -mb-1"
      role="radiogroup"
      aria-label="Chatbot country context"
    >
      {countries.map((country) => {
        const isActive = country.code === selectedCountry.code;
        return (
          <button
            key={country.code}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => selectCountry(country)}
            className={clsx(
              "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5",
              "text-sm font-medium transition-theme",
              isActive
                ? "border-agri-primary bg-agri-primary text-white shadow-subtle"
                : "border-agri-border bg-agri-surface text-agri-text-muted hover:border-agri-primary-light hover:text-agri-text"
            )}
          >
            <span className="text-base leading-none">{country.flag}</span>
            <span className="whitespace-nowrap">{country.name}</span>
          </button>
        );
      })}
    </div>
  );
}
