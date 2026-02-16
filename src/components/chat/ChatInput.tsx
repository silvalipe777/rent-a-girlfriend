"use client";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 border-t border-pink-500/10 bg-gradient-to-r from-[#0B0E11] via-rose-950/10 to-[#0B0E11] backdrop-blur-md">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="说点什么..."
        disabled={disabled}
        className="flex-1 bg-white/[0.04] border border-pink-500/15 rounded-2xl px-5 py-3.5 text-white placeholder-pink-300/30 focus:outline-none focus:border-pink-500/40 focus:bg-white/[0.06] focus:shadow-lg focus:shadow-pink-500/5 transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="px-5 py-3.5 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-pink-500/20 transition-all disabled:opacity-30 disabled:hover:shadow-none"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  );
}
