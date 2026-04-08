"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-panel rounded-2xl p-6 transition-all duration-300 relative group",
          glow && "hover-glow",
          className
        )}
        {...props}
      >
        {glow && (
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-secondary/20 pointer-events-none transition-colors duration-300" />
        )}
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
