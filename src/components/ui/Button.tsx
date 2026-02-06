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
            "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 rounded-full",
          variant === "secondary" &&
            "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-full backdrop-blur-sm",
          variant === "outline" &&
            "border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 rounded-full",
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
