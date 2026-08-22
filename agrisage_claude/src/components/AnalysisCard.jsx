import { ArrowRight } from "lucide-react";
import clsx from "clsx";

// Written as full, literal class strings (not interpolated) so Tailwind's
// content scanner can statically detect and generate them.
const COLOR_CLASSES = {
  soil: { bg: "bg-soil-bg", text: "text-soil-accent" },
  weather: { bg: "bg-weather-bg", text: "text-weather-accent" },
  best: { bg: "bg-best-bg", text: "text-best-accent" },
  worst: { bg: "bg-worst-bg", text: "text-worst-accent" },
};

/**
 * colorKey selects the accent family defined in tailwind.config.js / index.css:
 * "soil" | "weather" | "best" | "worst"
 */
export default function AnalysisCard({
  colorKey,
  icon: Icon,
  title,
  subtitle,
  rows,
  onViewDetails,
}) {
  const colors = COLOR_CLASSES[colorKey];

  return (
    <div
      className={clsx(
        "flex flex-col rounded-card border border-agri-border p-5 sm:p-6",
        "shadow-card transition-theme animate-fade-in",
        colors.bg
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={clsx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-agri-surface/70",
            colors.text
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <div>
          <h3 className={clsx("font-display text-base font-semibold", colors.text)}>
            {title}
          </h3>
          <p className="mt-0.5 text-sm text-agri-text-muted">{subtitle}</p>
        </div>
      </div>

      <dl className="mt-5 space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <dt className="text-agri-text-muted">{row.label}</dt>
            <dd className="font-medium text-agri-text">{row.value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onViewDetails}
        className={clsx(
          "mt-5 flex items-center gap-1.5 text-sm font-semibold transition-transform",
          "hover:gap-2.5",
          colors.text
        )}
      >
        View Details
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
