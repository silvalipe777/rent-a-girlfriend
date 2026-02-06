"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { EMOTIONAL_STYLES } from "@/lib/constants";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const applyFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/marketplace?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilter("search", search);
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            placeholder="Search companion..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {/* Emotional Style Filters */}
      <div>
        <span className="text-[10px] uppercase tracking-widest text-gray-600 font-medium mb-2 block">Emotional Style</span>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!searchParams.get("emotionalStyle") ? "primary" : "ghost"}
            size="sm"
            onClick={() => applyFilter("emotionalStyle", "")}
          >
            All
          </Button>
          {EMOTIONAL_STYLES.map((style) => (
            <Button
              key={style}
              variant={searchParams.get("emotionalStyle") === style ? "primary" : "ghost"}
              size="sm"
              onClick={() => applyFilter("emotionalStyle", style)}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <span className="text-[10px] uppercase tracking-widest text-gray-600 font-medium mb-2 block">Sort by</span>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Most recent", value: "newest" },
            { label: "Lowest price", value: "price_asc" },
            { label: "Highest price", value: "price_desc" },
            { label: "Name", value: "name" },
          ].map((opt) => (
            <Button
              key={opt.value}
              variant={(searchParams.get("sort") || "newest") === opt.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => applyFilter("sort", opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
