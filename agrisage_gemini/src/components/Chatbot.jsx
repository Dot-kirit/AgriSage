import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Chatbot() {
  const { chatOpen, setChatOpen, chatMessages, sendChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  return (
    <>
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#419C5F] text-white p-3.5 rounded-full shadow-lg hover:bg-[#2F7E4A] transition-all flex items-center gap-2 group"
          title="Open AgriSage Assistant"
        >
          <Bot className="w-5 h-5" />
          <ChevronLeft className="w-4 h-4 hidden group-hover:inline transition-all" />
        </button>
      )}

      <div
        className={`fixed lg:static top-[61px] bottom-0 right-0 z-20 flex flex-col bg-white dark:bg-[#16231D] border-l border-[#E5ECE8] dark:border-[#273E34] transition-all duration-300 ease-in-out ${
          chatOpen
            ? 'w-full sm:w-[380px] lg:w-[30%] translate-x-0'
            : 'w-0 translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden border-none'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E5ECE8] dark:border-[#273E34] bg-white dark:bg-[#16231D]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E1F2E6] dark:bg-[#1D3A29] flex items-center justify-center text-[#2F7E4A] dark:text-[#67B781]">
              <Bot className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs text-[#1A2E22] dark:text-[#E5EFEA]">
              AgriSage Assistant
            </span>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="p-1 rounded-md text-[#52665B] dark:text-[#8CA397] hover:bg-[#F2F9F4] dark:hover:bg-[#1D2F27] transition-all"
            title="Minimize Chat"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    isUser
                      ? 'bg-[#419C5F] text-white rounded-br-none shadow-sm'
                      : 'bg-[#F2F9F4] dark:bg-[#1D2F27] text-[#1A2E22] dark:text-[#E5EFEA] border border-[#E1F2E6] dark:border-[#273E34] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#8CA397] mt-1 px-1">{msg.time}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="p-3 border-t border-[#E5ECE8] dark:border-[#273E34] bg-white dark:bg-[#16231D] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3.5 py-2 text-xs bg-[#F8FAF9] dark:bg-[#0F1713] text-[#1A2E22] dark:text-[#E5EFEA] border border-[#E5ECE8] dark:border-[#273E34] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#419C5F]"
          />
          <button
            type="submit"
            className="p-2 bg-[#419C5F] hover:bg-[#2F7E4A] text-white rounded-xl shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </>
  );
}