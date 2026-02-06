import Image from "next/image";
import Badge from "../ui/Badge";

interface ProfileHeaderProps {
  name: string;
  tagline: string;
  emotionalStyle: string;
  avatarMain: string | null;
  ageAppearance: number;
  available: boolean;
}

export default function ProfileHeader({
  name,
  tagline,
  emotionalStyle,
  avatarMain,
  ageAppearance,
  available,
}: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Background blur from avatar */}
      <div className="absolute inset-0 h-72 overflow-hidden rounded-3xl">
        {avatarMain && (
          <Image
            src={avatarMain}
            alt=""
            fill
            className="object-cover blur-3xl opacity-20 scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0010]/60 to-[#0a0010]" />
      </div>

      <div className="relative pt-8 flex flex-col md:flex-row items-center md:items-end gap-8">
        {/* Avatar */}
        <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-2xl overflow-hidden flex-shrink-0 group">
          <div className="absolute -inset-[1px] bg-gradient-to-br from-pink-500/50 via-purple-500/50 to-indigo-500/50 rounded-2xl" />
          <div className="absolute inset-[2px] rounded-2xl overflow-hidden">
            {avatarMain ? (
              <Image src={avatarMain} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center">
                <span className="text-6xl font-bold text-white">{name.charAt(0)}</span>
              </div>
            )}
          </div>
          {/* Shadow glow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-purple-500/20 blur-xl rounded-full" />
        </div>

        {/* Info */}
        <div className="text-center md:text-left pb-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <h1 className="text-5xl font-black">
              <span className="gradient-text">{name}</span>
            </h1>
            {available && (
              <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-300 font-medium">Available</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <Badge variant="pink">{emotionalStyle}</Badge>
            <Badge variant="default">{ageAppearance} years old</Badge>
          </div>
          <p className="text-gray-400 text-lg max-w-lg leading-relaxed">{tagline}</p>
          <p className="text-gray-600 text-xs tracking-wide">Fictional AI-generated character</p>
        </div>
      </div>
    </div>
  );
}
