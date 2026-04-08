"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MindMantraLogoProps {
  className?: string;
  glowColor?: string;
}

export const MindMantraLogo = ({ 
  className = "w-24 h-24",
  glowColor = "rgba(34, 211, 238, 0.4)"
}: MindMantraLogoProps) => (
  <motion.div 
    className={cn("relative flex items-center justify-center", className)}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  >
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full"
      style={{ filter: `drop-shadow(0 0 15px ${glowColor})` }}
    >
      <defs>
        <linearGradient id="logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>
      
      {/* Background Glow */}
      <circle cx="50" cy="50" r="40" fill="url(#logo-grad-1)" fillOpacity="0.05" />
      
      {/* Stylized M Ribbons */}
      <motion.path
        d="M 20 70 C 20 30, 40 30, 50 50 C 60 70, 80 70, 80 30"
        stroke="url(#logo-grad-1)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M 20 60 C 25 25, 45 25, 50 45 C 55 65, 75 65, 80 20"
        stroke="url(#logo-grad-2)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
      />

      {/* Modern Accents */}
      <motion.circle 
        cx="50" cy="50" r="2" fill="white" 
        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </svg>
    
    {/* Animated Sparkles around the logo */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-0.5 bg-white rounded-full"
        animate={{
          y: [-10, -30],
          x: [0, (i - 1) * 15],
          opacity: [0, 1, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 3 + i,
          delay: i * 0.7,
          ease: "easeOut"
        }}
        style={{
          top: "40%",
          left: "50%"
        }}
      />
    ))}
  </motion.div>
);

