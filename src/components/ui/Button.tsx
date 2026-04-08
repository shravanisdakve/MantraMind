"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary text-text-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(30,58,138,0.3)] hover:shadow-[0_0_25px_rgba(30,58,138,0.5)]",
      secondary: "bg-secondary text-background hover:bg-secondary/90 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
      ghost: "bg-transparent text-text-primary hover:bg-white/5",
      glass: "glass-panel hover:bg-white/10 border-border"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-4 text-lg font-medium",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full transition-all duration-300 relative overflow-hidden group",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant !== "ghost" && (
           <span className="absolute inset-0 bg-white/10 transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 origin-bottom rounded-full" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
