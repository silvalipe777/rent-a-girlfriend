import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#12161C]/80 backdrop-blur-xl border border-amber-500/10 rounded-3xl overflow-hidden",
        hover && "glow-card transition-all duration-500 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
}
