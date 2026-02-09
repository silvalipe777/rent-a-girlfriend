import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-white/[0.03] border border-amber-500/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-amber-500/20 transition-all",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export default Input;
