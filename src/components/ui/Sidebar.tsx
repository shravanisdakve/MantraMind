"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Activity } from "lucide-react";
import { Wind } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Settings } from "lucide-react";
import { Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { MindMantraLogo } from "./MindMantraLogo";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/focus-mode", icon: Target, label: "Focus Mode" },
  { href: "/chat", icon: MessageSquare, label: "Wellness AI" },
  { href: "/spiritual", icon: BookOpen, label: "Gita Wisdom" },
  { href: "/wellness", icon: Activity, label: "Metrics" },
  { href: "/breathing", icon: Wind, label: "Breathe" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  // Don't show sidebar on onboarding, focus mode, or the initial landing
  if (pathname === "/" || pathname === "/onboarding" || pathname === "/focus-mode") return null;

  return (
    <nav className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto md:top-4 md:bottom-4 md:w-20 glass-panel rounded-2xl flex md:flex-col items-center justify-between py-3 px-6 md:py-8 md:px-0 z-50 overflow-x-auto">
      <div className="hidden md:flex flex-col items-center gap-2 mb-12">
        <Link href="/dashboard">
          <MindMantraLogo className="w-12 h-12" />
        </Link>
      </div>
      
      <div className="flex md:flex-col items-center gap-6 md:gap-8 w-full md:w-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative group">
              <div 
                className={cn(
                  "p-3 rounded-xl transition-all duration-300",
                  isActive ? "bg-white/10 text-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]" : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                <item.icon size={22} className={cn("transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
              </div>
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

