import React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // We'll create this utility

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { Sidebar } from "@/components/ui/Sidebar";

export const metadata: Metadata = {
  title: "MindMantra AI OS | Advanced Wellness Platform",
  description: "A cinematic, immersive multi-agent AI health and wellness platform offering mental, physical, and spiritual guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, outfit.variable, "bg-background text-text-primary antialiased min-h-screen selection:bg-secondary/30 selection:text-text-primary")}>
        <BackgroundEffects />
        <div className="relative min-h-screen z-10 flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 transition-all duration-300 p-4 md:p-8 md:pl-28 pb-24 md:pb-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

