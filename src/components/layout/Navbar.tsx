"use client";
import Link from "next/link";
import Image from "next/image";
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
          <Image src="/logo.PNG" alt="AVA" width={32} height={32} className="rounded-lg shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow" />
          <div className="hidden sm:flex items-baseline gap-1.5">
            <span className="font-bold text-lg gradient-text">AVA</span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide">自主虚拟代理</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/marketplace" className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all">
            市场
          </Link>
          {session && (
            <Link href="/chats" className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all">
              我的聊天
            </Link>
          )}
          <Link href="/whitepaper" className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all">
            Whitepaper
          </Link>
          <Link href="/admin" className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all">
            管理
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
                退出
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="primary" size="sm">连接钱包</Button>
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}
