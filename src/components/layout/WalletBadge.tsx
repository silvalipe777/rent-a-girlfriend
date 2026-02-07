"use client";

export default function WalletBadge({ walletAddress }: { walletAddress?: string | null }) {
  if (!walletAddress) return null;

  const truncated = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-[10px] text-purple-300 font-mono">{truncated}</span>
    </div>
  );
}
