"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface RentalItem {
  id: string;
  plan: string;
  priceCharged: number;
  status: string;
  expiresAt: string;
  createdAt: string;
  companion: {
    id: string;
    name: string;
    avatarMain: string | null;
    emotionalStyle: string;
  };
}

export default function ChatsPage() {
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rentals")
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/login";
          return [];
        }
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setRentals(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const isActive = (rental: RentalItem) =>
    rental.status === "active" && new Date(rental.expiresAt) > new Date();

  const activeRentals = rentals.filter(isActive);
  const expiredRentals = rentals.filter((r) => !isActive(r));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
          <p className="text-gray-500 text-sm">Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12">
      {/* Background orbs */}
      <div className="absolute top-0 right-[20%] w-80 h-80 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-64 h-64 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Your conversations</span>
          <h1 className="text-5xl font-black mt-2">
            <span className="gradient-text">My Chats</span>
          </h1>
          <p className="text-gray-400/70 mt-3 max-w-md">
            View your active conversations and rental history.
          </p>
        </div>

        {rentals.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-lg font-medium">No conversations yet</p>
              <p className="text-gray-600 text-sm mt-1">Rent a companion to start chatting!</p>
            </div>
            <Link href="/marketplace">
              <Button size="lg" className="neon-pulse">Explore Companions</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Active Chats */}
            {activeRentals.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-300 font-medium">Active</span>
                  </div>
                  <span className="text-sm text-gray-500">{activeRentals.length} chat{activeRentals.length > 1 ? "s" : ""}</span>
                </div>
                <div className="grid gap-4">
                  {activeRentals.map((rental) => (
                    <RentalCard key={rental.id} rental={rental} active />
                  ))}
                </div>
              </div>
            )}

            {/* Expired Chats */}
            {expiredRentals.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs uppercase tracking-widest text-gray-600 font-medium">History</span>
                  <span className="text-sm text-gray-600">{expiredRentals.length} chat{expiredRentals.length > 1 ? "s" : ""}</span>
                </div>
                <div className="grid gap-4">
                  {expiredRentals.map((rental) => (
                    <RentalCard key={rental.id} rental={rental} active={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

function RentalCard({ rental, active }: { rental: RentalItem; active: boolean }) {
  const timeLeft = getTimeLeft(rental.expiresAt);
  const planLabel: Record<string, string> = {
    hourly: "1 Hour",
    daily: "1 Day",
    weekly: "1 Week",
  };

  return (
    <Link href={`/chat/${rental.id}`}>
      <div className={`glass rounded-2xl p-5 flex items-center gap-5 group transition-all hover:border-purple-500/20 ${active ? "" : "opacity-60"}`}>
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          {rental.companion.avatarMain ? (
            <Image
              src={rental.companion.avatarMain}
              alt={rental.companion.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{rental.companion.name.charAt(0)}</span>
            </div>
          )}
          {active && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0a0010]" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-lg">{rental.companion.name}</h3>
            <Badge variant="pink">{rental.companion.emotionalStyle}</Badge>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-500">Plan: {planLabel[rental.plan] || rental.plan}</span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-500">{formatCurrency(rental.priceCharged)}</span>
            {active && (
              <>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-purple-400">{timeLeft}</span>
              </>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="flex-shrink-0">
          {active ? (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          ) : (
            <span className="text-xs text-gray-600">Expired</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function getTimeLeft(expiresAt: string): string {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
}
