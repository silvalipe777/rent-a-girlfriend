"use client";
import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import AnimatedAvatar from "./AnimatedAvatar";
import type { ChatMessageType } from "@/types";

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  companionName: string;
  companionAvatar: string | null;
}

export default function ChatWindow({ messages, isLoading, companionName, companionAvatar }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent via-rose-950/5 to-transparent">
      {/* Welcome message */}
      {messages.length === 0 && !isLoading && (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <AnimatedAvatar
              src={companionAvatar}
              alt={companionName}
              size="lg"
              isTalking={false}
            />
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

      {messages.map((msg, i) => {
        const isLastAssistant =
          msg.role === "assistant" &&
          i === messages.length - 1 &&
          isLoading;

        return (
          <MessageBubble
            key={i}
            role={msg.role}
            content={msg.content}
            companionName={msg.role === "assistant" ? companionName : undefined}
            companionAvatar={msg.role === "assistant" ? companionAvatar : undefined}
            isTalking={isLastAssistant}
          />
        );
      })}

      {isLoading && <TypingIndicator name={companionName} avatar={companionAvatar} />}

      <div ref={bottomRef} />
    </div>
  );
}
