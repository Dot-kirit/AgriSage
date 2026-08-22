import clsx from "clsx";
import { Leaf } from "lucide-react";

function formatTime(isoString) {
  try {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={clsx("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div className={clsx("flex max-w-[85%] gap-2", isUser && "flex-row-reverse")}>
        {!isUser && (
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-agri-primary-soft text-agri-primary">
            <Leaf className="h-3.5 w-3.5" />
          </span>
        )}
        <div>
          <div
            className={clsx(
              "rounded-2xl px-3.5 py-2 text-sm leading-relaxed animate-fade-in",
              isUser
                ? "rounded-br-sm bg-agri-primary text-white"
                : "rounded-bl-sm bg-agri-surface-alt text-agri-text"
            )}
          >
            {message.text}
          </div>
          <span
            className={clsx(
              "mt-1 block text-[11px] text-agri-text-muted",
              isUser ? "text-right" : "text-left"
            )}
          >
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}
