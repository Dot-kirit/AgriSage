import { Leaf } from "lucide-react";
import clsx from "clsx";

/**
 * size: "sm" (header) | "lg" (login page)
 * withWordmark: show the "AgriSage" text next to the mark
 */
export default function Logo({ size = "sm", withWordmark = true, className }) {
  const isLarge = size === "lg";

  return (
    <div className={clsx("flex items-center gap-2.5", className)}>
      <span
        className={clsx(
          "flex items-center justify-center rounded-full shrink-0",
          "bg-agri-primary-soft border border-agri-primary-light/50",
          isLarge ? "h-14 w-14" : "h-8 w-8"
        )}
      >
        <Leaf
          className={clsx("text-agri-primary", isLarge ? "h-7 w-7" : "h-4 w-4")}
          strokeWidth={2.25}
        />
      </span>
      {withWordmark && (
        <span
          className={clsx(
            "font-display font-bold text-agri-primary-dark dark:text-agri-primary-light tracking-tight",
            isLarge ? "text-2xl" : "text-lg"
          )}
        >
          AgriSage
        </span>
      )}
    </div>
  );
}
