"use client";
import { useState } from "react";
import { useAccount, useConnect, useWriteContract, useSwitchChain } from "wagmi";
import { parseEther } from "viem";
import Button from "../ui/Button";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { PAYMENT_CONTRACT_ADDRESS, PAYMENT_CONTRACT_ABI } from "@/lib/contract";

interface PricingCardProps {
  companionId: string;
  companionName: string;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
}

const plans = [
  { key: "hourly", label: "1小时", field: "pricePerHour" as const },
  { key: "daily", label: "1天", field: "pricePerDay" as const, popular: true },
  { key: "weekly", label: "1周", field: "pricePerWeek" as const },
];

export default function PricingCard({
  companionId,
  companionName,
  pricePerHour,
  pricePerDay,
  pricePerWeek,
}: PricingCardProps) {
  const [selectedPlan, setSelectedPlan] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const prices = { pricePerHour, pricePerDay, pricePerWeek };
  const { isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const selectedPrice = prices[plans.find((p) => p.key === selectedPlan)!.field];
  const isFree = selectedPrice === 0;

  const createRental = async (txHash?: string) => {
    const res = await fetch("/api/rentals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companionId, plan: selectedPlan, txHash }),
    });

    if (res.status === 401) {
      window.location.href = "/login";
      return;
    }

    const data = await res.json();
    if (res.ok) {
      window.location.href = `/chat/${data.id}`;
    } else {
      alert(data.error || "租用失败");
    }
  };

  const handleRent = async () => {
    setLoading(true);
    setStatus("");

    try {
      // FREE — no payment needed
      if (isFree) {
        await createRental();
        return;
      }

      // PAID — need wallet
      if (!isConnected) {
        const metaMaskConnector = connectors.find(
          (c) => c.id === "injected" || c.name === "MetaMask"
        );
        if (!metaMaskConnector) {
          alert("未找到MetaMask。请安装MetaMask。");
          return;
        }
        await connectAsync({ connector: metaMaskConnector });
      }

      // Always switch to BSC (MetaMask may be on Ethereum)
      setStatus("切换至BSC...");
      await switchChainAsync({ chainId: 56 });

      // Send BNB to contract
      setStatus("请在MetaMask中确认...");
      const hash = await writeContractAsync({
        address: PAYMENT_CONTRACT_ADDRESS,
        abi: PAYMENT_CONTRACT_ABI,
        functionName: "pay",
        args: [companionId, selectedPlan],
        value: parseEther(selectedPrice.toString()),
      });

      // Wait for on-chain confirmation
      setStatus("等待链上确认...");
      const { createPublicClient, http } = await import("viem");
      const { bsc } = await import("viem/chains");
      const client = createPublicClient({
        chain: bsc,
        transport: http(
          process.env.NEXT_PUBLIC_BSC_RPC_URL || "https://bsc-dataseed.binance.org"
        ),
      });
      const receipt = await client.waitForTransactionReceipt({ hash });

      if (receipt.status !== "success") {
        alert("链上交易失败。");
        return;
      }

      // Create rental with verified txHash
      setStatus("激活中...");
      await createRental(hash);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("User rejected") || msg.includes("rejected")) {
        setStatus("");
      } else if (msg) {
        alert("支付错误: " + msg.slice(0, 100));
      } else {
        alert("连接错误");
      }
    } finally {
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">方案</span>
        <h2 className="text-xl font-bold text-white">解锁 {companionName}</h2>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => (
          <button
            key={plan.key}
            onClick={() => setSelectedPlan(plan.key)}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
              selectedPlan === plan.key
                ? "border-amber-500/40 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                : "border-amber-500/10 hover:border-amber-500/20 bg-white/[0.02]"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all",
                  selectedPlan === plan.key
                    ? "border-amber-500 bg-gradient-to-r from-yellow-500 to-amber-500"
                    : "border-gray-600"
                )}
              />
              <span className="font-medium text-white">{plan.label}</span>
              {plan.popular && (
                <span className="text-[10px] bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/20">
                  热门
                </span>
              )}
            </div>
            <span className="font-bold gradient-text">
              {formatCurrency(prices[plan.field])}
            </span>
          </button>
        ))}
      </div>

      {status && (
        <div className="text-center text-sm text-amber-300 animate-pulse">{status}</div>
      )}

      <Button className="w-full neon-pulse" size="lg" onClick={handleRent} disabled={loading}>
        {loading
          ? status || "处理中..."
          : isFree
            ? "立即解锁"
            : `支付 ${formatCurrency(selectedPrice)}`}
      </Button>

      <p className="text-[10px] text-gray-600 text-center leading-relaxed">
        {isFree
          ? "免费 — 无需支付。"
          : "通过BSC支付。链上验证。"}
      </p>
    </div>
  );
}
