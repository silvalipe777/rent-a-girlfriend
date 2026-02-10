"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Container from "./Container";
import WalletBadge from "./WalletBadge";
import Button from "../ui/Button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-40 glass">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
            <span className="text-white text-sm font-bold">AVA</span>
          </div>
          <div className="hidden sm:flex items-baseline gap-1.5">
            <span className="font-bold text-lg gradient-text">AVA</span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide">Autonomous Virtual Agents</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/marketplace" className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all">
            Marketplace
          </Link>
          {session && (
            <Link href="/chats" className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all">
              My Chats
            </Link>
          )}
          <Link href="/admin" className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all">
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500" />
                <span className="text-xs text-gray-300 hidden sm:block">
                  {session.user?.name || session.user?.email}
                </span>
              </div>
              {session.user?.walletAddress && (
                <WalletBadge walletAddress={session.user.walletAddress} />
              )}
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="primary" size="sm">Connect Wallet</Button>
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}
