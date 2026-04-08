"use client";

import React from "react";

import { Brain, Wind, Flame, Feather, Sparkles } from "lucide-react";

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-[#050505]">
      {/* Vibrant Ethereal Blobs - Optimized Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[80px] animate-float opacity-50" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-pink-500/10 blur-[100px] animate-pulse-glow opacity-40" />
      <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-blue-500/10 blur-[80px] animate-float opacity-30" />
      <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[90px] animate-pulse-glow opacity-30" />

      {/* Wellness & Spiritual Floating Icons */}
      <div className="absolute top-[15%] left-[10%] text-pink-500/20 animate-float" style={{ animationDelay: '1s' }}>
        <Brain size={32} />
      </div>
      <div className="absolute bottom-[20%] right-[10%] text-purple-400/20 animate-float" style={{ animationDelay: '3s' }}>
        <Wind size={40} />
      </div>
      <div className="absolute bottom-[10%] left-[15%] text-secondary/20 animate-float" style={{ animationDelay: '2s' }}>
        <Flame size={28} />
      </div>
      <div className="absolute top-[45%] right-[15%] text-blue-400/15 animate-pulse-glow">
        <Feather size={32} />
      </div>
      <div className="absolute top-[10%] right-[30%] text-accent/10 animate-float">
        <Sparkles size={20} />
      </div>
      {/* Elite Microcopy - Subtle Brand Identity */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-10 flex flex-col items-center">
        <p className="text-[10px] tracking-[1em] uppercase font-light text-white mb-2 ml-[1em]">
          MindMantra OS v1.2
        </p>
        <p className="text-[9px] tracking-[0.2em] italic font-light text-white/60">
          Clarity leads to control. Control leads to freedom.
        </p>
      </div>

      {/* Cinematic Noise Texture - Optimized Noise */}
      <div 
        className="absolute inset-0 opacity-[0.01] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

