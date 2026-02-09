"use client";
import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import type { ChatMessageType } from "@/types";

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  companionName: string;
}

export default function ChatWindow({ messages, isLoading, companionName }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent via-rose-950/5 to-transparent">
      {/* Welcome message */}
      {messages.length === 0 && !isLoading && (
        <div className="text-center py-16 space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/30 to-amber-500/30 blur-xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-600/20 border border-pink-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">{companionName}</h2>
            <p className="text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
              Hey there... I&apos;ve been waiting for you.
              <br />
              <span className="text-pink-400/60">Send me a message and let&apos;s get to know each other.</span>
            </p>
          </div>
        </div>
      )}

      {messages.map((msg, i) => (
        <MessageBubble
          key={i}
          role={msg.role}
          content={msg.content}
          companionName={msg.role === "assistant" ? companionName : undefined}
        />
      ))}

      {isLoading && <TypingIndicator name={companionName} />}

      <div ref={bottomRef} />
    </div>
  );
}
