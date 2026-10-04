import React from "react";
import { cn } from "../../lib/utils";
import { motion, type HTMLMotionProps } from "motion/react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 cursor-pointer select-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[#9B111E] text-white hover:bg-[#B3192B] focus-visible:ring-[#9B111E] shadow-sm hover:shadow-md",
      secondary:
        "bg-stone-900 text-white hover:bg-[#9B111E] focus-visible:ring-stone-900 shadow-sm",
      outline:
        "border border-stone-300 text-stone-800 hover:text-stone-950 hover:bg-stone-100/80 focus-visible:ring-stone-400 bg-transparent",
      ghost:
        "text-stone-700 hover:text-stone-950 hover:bg-stone-100 focus-visible:ring-stone-400",
      gold:
        "bg-[#F5B82E] text-stone-950 hover:bg-[#FFC72C] focus-visible:ring-[#F5B82E] shadow-sm font-bold",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs rounded-full gap-1.5",
      md: "h-11 px-5 text-sm rounded-full gap-2",
      lg: "h-13 px-7 text-base rounded-full gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
