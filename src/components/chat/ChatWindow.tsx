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
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Welcome message */}
      {messages.length === 0 && !isLoading && (
        <div className="text-center py-20 space-y-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-purple-500/20 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold gradient-text">{companionName}</h2>
          <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
            Start a conversation with {companionName}.
            She's ready to listen and chat with you.
          </p>
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
