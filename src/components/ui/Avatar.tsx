import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar({ src, alt, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-40 h-40",
  };

  return (
    <div className={cn("relative rounded-full overflow-hidden bg-gradient-to-br from-yellow-500 to-amber-600", sizes[size], className)}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
