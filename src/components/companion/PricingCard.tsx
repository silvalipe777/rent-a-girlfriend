"use client";
import { useState } from "react";
import Button from "../ui/Button";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  companionId: string;
  companionName: string;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
}

const plans = [
  { key: "hourly", label: "1 Hour", field: "pricePerHour" as const },
  { key: "daily", label: "1 Day", field: "pricePerDay" as const, popular: true },
  { key: "weekly", label: "1 Week", field: "pricePerWeek" as const },
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

  const prices = { pricePerHour, pricePerDay, pricePerWeek };

  const handleRent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companionId, plan: selectedPlan }),
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      if (res.ok) {
        window.location.href = `/chat/${data.id}`;
      } else {
        alert(data.error || "Rental error");
      }
    } catch {
      alert("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Plans</span>
        <h2 className="text-xl font-bold text-white">Rent {companionName}</h2>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => (
          <button
            key={plan.key}
            onClick={() => setSelectedPlan(plan.key)}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
              selectedPlan === plan.key
                ? "border-purple-500/40 bg-purple-500/10 shadow-lg shadow-purple-500/5"
                : "border-purple-500/10 hover:border-purple-500/20 bg-white/[0.02]"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all",
                  selectedPlan === plan.key
                    ? "border-purple-500 bg-gradient-to-r from-pink-500 to-purple-500"
                    : "border-gray-600"
                )}
              />
              <span className="font-medium text-white">{plan.label}</span>
              {plan.popular && (
                <span className="text-[10px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20">
                  Popular
                </span>
              )}
            </div>
            <span className="font-bold gradient-text">
              {formatCurrency(prices[plan.field])}
            </span>
          </button>
        ))}
      </div>

      <Button className="w-full neon-pulse" size="lg" onClick={handleRent} disabled={loading}>
        {loading ? "Processing..." : "Rent Now"}
      </Button>

      <p className="text-[10px] text-gray-600 text-center leading-relaxed">
        By renting, you agree to our terms of use.
        100% fictional AI-generated character.
      </p>
    </div>
  );
}
