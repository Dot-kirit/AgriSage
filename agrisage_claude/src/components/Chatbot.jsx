import { useEffect, useRef } from "react";
import { Bot, ChevronsRight, MessageCircle, X } from "lucide-react";
import clsx from "clsx";
import { useAppContext } from "../context/AppContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

function ChatPanelBody({ onCollapse, collapseIcon: CollapseIcon, collapseLabel }) {
  const { chatMessages, isChatSending } = useAppContext();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [chatMessages, isChatSending]);

  return (
    <div className="flex h-full flex-col bg-agri-surface">
      {/* Chatbot header */}
      <div className="flex items-center justify-between border-b border-agri-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-agri-primary-soft text-agri-primary">
            <Bot className="h-4 w-4" />
          </span>
          <h2 className="font-display text-sm font-semibold text-agri-text">
            AgriSage Assistant
          </h2>
        </div>
        <button
          type="button"
          onClick={onCollapse}
          aria-label={collapseLabel}
          className="flex h-7 w-7 items-center justify-center rounded-full text-agri-text-muted
            transition-theme hover:bg-agri-surface-alt hover:text-agri-primary"
        >
          <CollapseIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto agri-scroll px-4 py-4">
        {chatMessages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isChatSending && (
          <div className="flex items-center gap-1.5 pl-8 text-agri-text-muted">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-agri-primary" />
            <span
              className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-agri-primary"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-agri-primary"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        )}
      </div>

      <ChatInput />
    </div>
  );
}

export default function Chatbot() {
  const { chatOpen, toggleChat } = useAppContext();

  return (
    <>
      {/* ---------------- Desktop: inline ~30% side panel ---------------- */}
      <div
        className={clsx(
          "relative hidden shrink-0 border-l border-agri-border transition-all duration-300 lg:block",
          chatOpen ? "lg:w-[30%] lg:min-w-[320px]" : "lg:w-0 lg:min-w-0 lg:border-l-0"
        )}
      >
        {chatOpen && (
          <div className="absolute inset-0 animate-panel-in">
            <ChatPanelBody
              onCollapse={toggleChat}
              collapseIcon={ChevronsRight}
              collapseLabel="Minimize chatbot"
            />
          </div>
        )}
      </div>

      {/* Reopen tab — desktop only, shown when collapsed */}
      {!chatOpen && (
        <button
          type="button"
          onClick={toggleChat}
          aria-label="Open AgriSage Assistant"
          className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-1.5
            rounded-l-xl border border-r-0 border-agri-border bg-agri-surface px-2.5 py-3
            text-agri-primary shadow-panel transition-theme hover:bg-agri-primary-soft lg:flex"
        >
          <Bot className="h-4 w-4" />
        </button>
      )}

      {/* ---------------- Mobile: floating FAB + overlay panel ---------------- */}
      <div className="lg:hidden">
        {chatOpen ? (
          <div
            className="fixed inset-x-3 bottom-3 top-auto z-40 h-[70vh] max-w-sm overflow-hidden
              rounded-2xl border border-agri-border shadow-panel animate-panel-in sm:right-4 sm:left-auto sm:w-[92vw]"
          >
            <ChatPanelBody onCollapse={toggleChat} collapseIcon={X} collapseLabel="Close chatbot" />
          </div>
        ) : (
          <button
            type="button"
            onClick={toggleChat}
            aria-label="Open AgriSage Assistant"
            className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center
              rounded-full bg-agri-primary text-white shadow-panel transition-theme
              hover:bg-agri-primary-dark"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </>
  );
}
