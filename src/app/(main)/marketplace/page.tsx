import { Suspense } from "react";
import prisma from "@/lib/prisma";
import Container from "@/components/layout/Container";
import CompanionGrid from "@/components/marketplace/CompanionGrid";
import FilterBar from "@/components/marketplace/FilterBar";
import Skeleton from "@/components/ui/Skeleton";

interface Props {
  searchParams: {
    search?: string;
    emotionalStyle?: string;
    category?: string;
    sort?: string;
  };
}

export default async function MarketplacePage({ searchParams }: Props) {
  const { search, emotionalStyle, category, sort } = searchParams;

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { tagline: { contains: search, mode: "insensitive" } },
    ];
  }
  if (emotionalStyle) where.emotionalStyle = emotionalStyle;
  if (category) where.category = category;

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { pricePerHour: "asc" };
  if (sort === "price_desc") orderBy = { pricePerHour: "desc" };
  if (sort === "name") orderBy = { name: "asc" };

  const companions = await prisma.aICompanion.findMany({
    where,
    orderBy,
  });

  return (
    <div className="relative py-12">
      {/* Background orbs */}
      <div className="absolute top-0 right-[20%] w-80 h-80 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-64 h-64 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Explore</span>
          <h1 className="text-5xl font-black mt-2">
            <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-gray-400/70 mt-3 max-w-md">
            Find the perfect AI Companion for you. Filter by personality, style or price.
          </p>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-5 mb-10">
          <Suspense fallback={<Skeleton className="h-20 w-full" />}>
            <FilterBar />
          </Suspense>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="text-purple-400 font-semibold">{companions.length}</span> companions found
          </p>
        </div>

        {/* Grid */}
        <CompanionGrid companions={companions} />
      </Container>
    </div>
  );
}
