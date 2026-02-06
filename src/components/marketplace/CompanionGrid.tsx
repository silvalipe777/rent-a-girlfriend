import CompanionCard from "./CompanionCard";
import type { AICompanionRaw } from "@/types/companion";

export default function CompanionGrid({ companions }: { companions: AICompanionRaw[] }) {
  if (companions.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-gray-400 text-lg font-medium">No companions found</p>
        <p className="text-gray-600 text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {companions.map((companion) => (
        <CompanionCard key={companion.id} companion={companion} />
      ))}
    </div>
  );
}
