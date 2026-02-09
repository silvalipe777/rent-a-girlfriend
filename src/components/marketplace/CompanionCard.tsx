import Link from "next/link";
import Image from "next/image";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { formatCurrency } from "@/lib/utils";
import type { AICompanionRaw } from "@/types/companion";

export default function CompanionCard({ companion }: { companion: AICompanionRaw }) {
  return (
    <Link href={`/companion/${companion.id}`}>
      <Card hover className="group cursor-pointer">
        {/* Avatar */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-yellow-900/30 to-orange-900/40" />

          {companion.avatarMain ? (
            <Image
              src={companion.avatarMain}
              alt={companion.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {companion.name.charAt(0)}
                </span>
              </div>
            </div>
          )}

          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E11] via-[#0B0E11]/20 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {companion.featured && (
              <Badge variant="yellow">Featured</Badge>
            )}
            {companion.available && (
              <div className="flex items-center gap-1.5 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-2.5 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-green-300 font-medium">Online</span>
              </div>
            )}
          </div>

          {/* Bottom name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">{companion.name}</h3>
            <p className="text-amber-300/80 text-xs mt-1">{companion.ageAppearance} y/o</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <Badge variant="pink">{companion.emotionalStyle}</Badge>

          <p className="text-gray-400/80 text-sm line-clamp-2 leading-relaxed">
            {companion.tagline}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-amber-500/10">
            <div>
              <span className="text-xs text-gray-500 block">From</span>
              <span className="text-lg font-bold gradient-text">
                {formatCurrency(companion.pricePerHour)}
              </span>
              <span className="text-xs text-gray-500">/hour</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
