"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function BreathingPage() {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (phase === "inhale") {
      setTimeLeft(4);
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setPhase("hold");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (phase === "hold") {
      setTimeLeft(4);
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setPhase("exhale");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (phase === "exhale") {
      setTimeLeft(8);
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setPhase("inhale"); // Loop
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [phase]);

  const getScale = () => {
    if (phase === "idle") return 1;
    if (phase === "inhale") return 1.5;
    if (phase === "hold") return 1.5;
    if (phase === "exhale") return 1;
    return 1;
  };

  const getMessage = () => {
    if (phase === "idle") return "Ready to start?";
    if (phase === "inhale") return "Breathe In...";
    if (phase === "hold") return "Hold...";
    if (phase === "exhale") return "Breathe Out...";
  };

  const getColor = () => {
    if (phase === "inhale") return "bg-primary";
    if (phase === "hold") return "bg-accent";
    if (phase === "exhale") return "bg-secondary";
    return "bg-border";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 premium-text-gradient">4-4-8 Breathing</h1>
        <p className="text-text-secondary">Release tension and find your center.</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Animated Circle */}
        <motion.div
          animate={{
            scale: getScale(),
          }}
          transition={{
            duration: phase === "inhale" ? 4 : phase === "hold" ? 0 : phase === "exhale" ? 8 : 0.5,
            ease: "easeInOut"
          }}
          className={`absolute inset-0 rounded-full ${getColor()} opacity-20`}
        />
        <motion.div
          animate={{
            scale: getScale(),
          }}
          transition={{
            duration: phase === "inhale" ? 4 : phase === "hold" ? 0 : phase === "exhale" ? 8 : 0.5,
            ease: "easeInOut"
          }}
          className={`absolute w-3/4 h-3/4 rounded-full ${getColor()} opacity-40`}
        />
        
        <Card glow className="relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center !p-0 border-primary/30">
          <p className="text-xl font-bold">{getMessage()}</p>
          {phase !== "idle" && (
            <p className="text-3xl font-bold mt-2 text-primary">{timeLeft}</p>
          )}
        </Card>
      </div>

      <Button 
        size="lg" 
        onClick={() => setPhase(phase === "idle" ? "inhale" : "idle")}
        variant={phase === "idle" ? "primary" : "ghost"}
      >
        {phase === "idle" ? "Start Exercise" : "Stop"}
      </Button>
    </div>
  );
}

