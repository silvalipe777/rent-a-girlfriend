import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden",
          variant === "primary" &&
            "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-black font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 rounded-full",
          variant === "secondary" &&
            "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-full backdrop-blur-sm",
          variant === "outline" &&
            "border-2 border-amber-500/50 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 rounded-full",
          variant === "ghost" &&
            "text-gray-400 hover:text-white hover:bg-white/5 rounded-xl",
          size === "sm" && "px-4 py-1.5 text-xs",
          size === "md" && "px-6 py-2.5 text-sm",
          size === "lg" && "px-10 py-4 text-base tracking-wide",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
