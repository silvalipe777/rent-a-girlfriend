"use client";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

interface AnimatedAvatarProps {
  src: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  isTalking?: boolean;
  className?: string;
}

export default function AnimatedAvatar({
  src,
  alt,
  size = "sm",
  isTalking = false,
  className,
}: AnimatedAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        isTalking ? "avatar-talk" : "avatar-breathe",
        className
      )}
    >
      {/* Gradient ring */}
      <div className={cn(isTalking ? "glow-ring" : "glow-ring-idle")} />

      {/* Dark mask between ring and avatar */}
      <div className="absolute inset-[3px] rounded-full bg-[#0B0E11] z-[1]" />

      {/* Avatar */}
      <div
        className={cn(
          "relative z-[2] rounded-full transition-shadow duration-500",
          isTalking ? "avatar-glow-talking" : "avatar-glow-idle"
        )}
      >
        <Avatar src={src} alt={alt} size={size} />
      </div>
    </div>
  );
}
