"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Play, Pause, RotateCcw, Target, Sparkles } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getRecommendedVerse } from "@/lib/wisdom";

export default function FocusMode() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [isMounted, setIsMounted] = useState(false);
  const { persona } = useStore();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const verse = (isMounted && persona) 
    ? getRecommendedVerse(persona.metrics)
    : (isMounted ? getRecommendedVerse({ physical: 50, mental: 50, control: 50 }) : null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(25 * 60);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <BackgroundEffects />
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-10">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white/40 hover:text-white flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Sanctuary
          </Button>
        </Link>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Target className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-white/60">Focus Engine v1.0</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl text-center space-y-16">
        
        {/* Wisdom Centering Line */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isActive ? "active" : "inactive"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <p className="text-cyan-400/60 text-[10px] tracking-[0.4em] uppercase font-medium">
              Centering Principle
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white/90 leading-tight">
              {isActive 
                ? "Bring your mind back when it wanders." 
                : "Prepare your mind for deep action."}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* The Timer Bloom */}
        <div className="relative py-20 flex justify-center items-center">
            {/* Animated Rings */}
            <motion.div 
              animate={{ 
                scale: isActive ? [1, 1.2, 1] : 1,
                rotate: 360 
              }}
              transition={{ 
                scale: { repeat: Infinity, duration: 4 },
                rotate: { repeat: Infinity, duration: 20, ease: "linear" }
              }}
              className="absolute w-80 h-80 border border-white/5 rounded-full"
            />
            <motion.div 
              animate={{ 
                scale: isActive ? [1, 1.1, 1] : 1,
                rotate: -360 
              }}
              transition={{ 
                scale: { repeat: Infinity, duration: 3, delay: 0.5 },
                rotate: { repeat: Infinity, duration: 15, ease: "linear" }
              }}
              className="absolute w-[22rem] h-[22rem] border border-cyan-400/10 rounded-full"
            />

            <div className="relative">
              <motion.div 
                key={seconds}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-8xl md:text-9xl font-thin tracking-tighter text-white/95"
              >
                {formatTime(seconds)}
              </motion.div>
            </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-6">
            <Button 
                onClick={toggleTimer}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  isActive 
                    ? "bg-white/10 text-white hover:bg-white/20" 
                    : "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                }`}
            >
              {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </Button>
            
            <Button 
                variant="ghost" 
                onClick={resetTimer}
                className="w-16 h-16 rounded-full border border-white/5 text-white/30 hover:text-white hover:bg-white/5"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>

          {verse && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <Sparkles className="w-4 h-4 text-cyan-400/50" />
              <p className="text-xs text-white/40 font-light tracking-wide italic">
                {verse ? `"${verse.short}" - BG ${verse.chapter}.${verse.verse}` : "Focusing on the present moment..."}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

