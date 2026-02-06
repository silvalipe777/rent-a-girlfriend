import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "pink" | "green" | "yellow";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-sm",
        variant === "default" && "bg-white/5 text-gray-300 border border-white/10",
        variant === "pink" && "bg-pink-500/10 text-pink-300 border border-pink-500/20",
        variant === "green" && "bg-green-500/10 text-green-300 border border-green-500/20",
        variant === "yellow" && "bg-amber-500/10 text-amber-300 border border-amber-500/20",
        className
      )}
    >
      {children}
    </span>
  );
}
