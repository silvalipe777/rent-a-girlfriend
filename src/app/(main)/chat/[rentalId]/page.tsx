"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { useChat } from "@/hooks/useChat";
import { getTimeRemaining } from "@/lib/utils";

interface RentalInfo {
  id: string;
  expiresAt: string;
  status: string;
  companion: {
    id: string;
    name: string;
    avatarMain: string | null;
    emotionalStyle: string;
  };
}

export default function ChatPage() {
  const params = useParams();
  const rentalId = params.rentalId as string;
  const { messages, sendMessage, isLoading } = useChat(rentalId);
  const [rental, setRental] = useState<RentalInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    fetch(`/api/rentals?status=active`)
      .then((r) => r.json())
      .then((rentals: RentalInfo[]) => {
        const found = rentals.find((r) => r.id === rentalId);
        if (found) setRental(found);
      });
  }, [rentalId]);

  useEffect(() => {
    if (!rental) return;
    const update = () => setTimeLeft(getTimeRemaining(new Date(rental.expiresAt)));
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [rental]);

  if (!rental) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
          <p className="text-gray-500 text-sm">Loading chat...</p>
        </div>
      </div>
    );
  }

  const isExpired = new Date(rental.expiresAt) < new Date();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] relative">
      {/* Background orbs */}
      <div className="fixed top-20 right-[10%] w-64 h-64 bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-20 left-[5%] w-48 h-48 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Chat Header */}
      <div className="relative flex items-center gap-4 p-4 border-b border-pink-500/10 bg-gradient-to-r from-[#0B0E11] via-rose-950/10 to-[#0B0E11] backdrop-blur-md">
        <div className="relative">
          <Avatar src={rental.companion.avatarMain} alt={rental.companion.name} size="sm" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0B0E11]" />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-white">{rental.companion.name}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <Badge variant="pink">{rental.companion.emotionalStyle}</Badge>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-amber-300/70">{timeLeft}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-300 font-medium">Online</span>
        </div>
      </div>

      {/* Messages */}
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        companionName={rental.companion.name}
      />

      {/* Input */}
      {isExpired ? (
        <div className="p-5 border-t border-amber-500/10 glass text-center space-y-3">
          <p className="text-gray-400 text-sm">Your rental has expired.</p>
          <button
            onClick={() => window.location.href = `/companion/${rental.companion.id}`}
            className="text-sm font-semibold gradient-text hover:opacity-80 transition-opacity"
          >
            Renew to keep chatting →
          </button>
        </div>
      ) : (
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      )}
    </div>
  );
}
