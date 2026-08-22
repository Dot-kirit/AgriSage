import { useState } from "react";
import { Send } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function ChatInput() {
  const { sendUserMessage, isChatSending } = useAppContext();
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.trim() || isChatSending) return;
    sendUserMessage(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-agri-border bg-agri-surface p-3"
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type your message..."
        aria-label="Type your message"
        className="flex-1 rounded-full border border-agri-border bg-agri-surface-alt
          px-4 py-2 text-sm text-agri-text placeholder:text-agri-text-muted
          outline-none transition-theme focus:border-agri-primary"
      />
      <button
        type="submit"
        disabled={!value.trim() || isChatSending}
        aria-label="Send message"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full
          bg-agri-primary text-white transition-theme hover:bg-agri-primary-dark
          disabled:opacity-40 disabled:hover:bg-agri-primary"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
