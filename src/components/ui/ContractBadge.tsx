"use client";
import { useState } from "react";

export default function ContractBadge({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  const hasAddress = !!address;
  const short = hasAddress ? `${address.slice(0, 6)}...${address.slice(-4)}` : "待公布";

  const copy = async () => {
    if (!hasAddress) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-amber-500/30 backdrop-blur-sm transition-all group cursor-pointer"
    >
      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">合约</span>
      <span className="text-xs text-amber-400 font-mono">{short}</span>
      {hasAddress && (
        <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          )}
        </svg>
      )}
      {copied && <span className="text-[10px] text-green-400">已复制！</span>}
    </button>
  );
}
