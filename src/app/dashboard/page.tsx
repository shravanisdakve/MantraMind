"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { Flame, Brain, Droplets, Moon, TrendingUp, Quote, Zap, ArrowRight, Target, Sparkles, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { getRecommendedVerse, getArchetypeGuidance, getStructuredGuidance } from "@/lib/wisdom";
import Link from "next/link";

// Dynamic import for the chart to prevent SSR crashes
const WellnessChart = dynamic(() => import("@/components/dashboard/WellnessChart"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-white/[0.02] animate-pulse rounded-2xl" />
});

export default function Dashboard() {
  const { name, xp, stressLevel, sleepHours, hydration, streak, persona } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const metrics = [
    { label: "Stress Level", value: `${stressLevel}%`, icon: Brain, color: "text-primary" },
    { label: "Sleep", value: `${sleepHours}h`, icon: Moon, color: "text-indigo-400" },
    { label: "Hydration", value: `${hydration}%`, icon: Droplets, color: "text-blue-400" },
    { label: "Daily Streak", value: `${streak} Days`, icon: Flame, color: "text-secondary" },
  ];

  // Wisdom Engine Selection - Calculated only on client to avoid hydration mismatch
  const guidance = (isMounted && persona) 
    ? getStructuredGuidance(persona.subjectiveInput || "I'm looking for balance.", persona.metrics)
    : null;

  const versefallback = isMounted 
    ? getRecommendedVerse({ physical: 50, mental: 50, control: 50 })
    : null;
  
  const customGuidance = (isMounted && persona) 
    ? getArchetypeGuidance(persona.title)
    : "Elevate yourself by your own mind.";

  if (!isMounted) return <div className="min-h-screen bg-transparent" />;

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-2">
            <Zap size={12} /> {persona?.title || "Seeker"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome back, <span className="premium-text-gradient">{name || "Arjun"}</span>
          </h1>
          <p className="text-text-secondary text-lg font-light italic">
            &quot;{customGuidance}&quot;
          </p>
        </div>
        
        <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
          <div className="text-center">
            <div className="flex items-center gap-2 text-accent font-bold text-2xl">
              <TrendingUp size={20} className="text-accent/50" /> {xp}
            </div>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest">Global XP</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <div className="text-white font-bold text-2xl">Level 12</div>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest">Mindful Status</p>
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card glow className="flex items-center gap-6 p-6 group hover:border-primary/40 transition-colors">
              <div className={`p-4 rounded-xl bg-white/5 ${m.color} group-hover:scale-110 transition-transform`}>
                <m.icon size={32} />
              </div>
              <div>
                <p className="text-text-secondary text-[10px] uppercase tracking-widest mb-1">{m.label}</p>
                <h3 className="text-2xl font-bold">{m.value}</h3>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Column (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="min-h-[400px] flex flex-col p-10 bg-black/40 border-white/5 backdrop-blur-xl rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-bold mb-1">Wellness Overview</h3>
                <p className="text-text-secondary text-sm">Real-time mental and physical telemetry</p>
              </div>
              <div className="flex gap-6 text-[10px] tracking-widest uppercase font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(30,58,138,0.5)]"></div> Stress
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div> Recovery
                </div>
              </div>
            </div>
            <div className="flex-1 w-full min-h-[250px] opacity-80">
              <WellnessChart />
            </div>
          </Card>

          {/* New: Quick Focus Trigger */}
          <Link href="/focus-mode" className="block group">
            <Card className="p-8 bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] transition-all rounded-[2rem] group-active:scale-[0.98]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-cyan-400/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)] group-hover:scale-110 transition-transform">
                    <Target size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white/90">Initialize Focus Sanctuary</h4>
                    <p className="text-sm text-text-secondary">Silence the noise. Conquer your mind from within.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                  <span className="text-[10px] font-bold tracking-widest uppercase">Begin Session</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        {/* Elite Guidance Side Column (1/3) */}
        <div className="space-y-8">
          <Card glow className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-primary/5 border-white/10 flex flex-col p-10 rounded-[3rem] min-h-[600px]">
            <div className="relative z-10 h-full flex flex-col space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="text-[10px] text-primary font-bold tracking-[0.4em] uppercase">Current Diagnosis</h3>
                </div>
                <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[8px] text-white/40 uppercase tracking-tighter">
                  Ver 2.1 Engine
                </div>
              </div>
              
              {guidance ? (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/30">
                      <MessageSquare size={14} />
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Acknowledge</h4>
                    </div>
                    <p className="text-lg font-light text-white/80 leading-snug italic">
                      &quot;{guidance.acknowledge}&quot;
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary/40">
                      <Brain size={14} />
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Diagnose</h4>
                    </div>
                    <p className="text-lg font-light text-primary/90 leading-snug">
                      {guidance.diagnosis}
                    </p>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Quote className="w-4 h-4 text-cyan-400/50" />
                      <h4 className="text-[10px] text-cyan-400 font-bold tracking-[0.4em] uppercase">The Principle</h4>
                    </div>
                    <div className="space-y-4">
                      <p className="text-2xl font-light text-white leading-tight">
                        {guidance.verse}
                      </p>
                      <p className="text-[10px] text-text-secondary uppercase tracking-widest">
                        — {guidance.reference}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3 text-emerald-400/40">
                      <Zap size={14} />
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Mandatory Action</h4>
                    </div>
                    <div className="p-5 rounded-2xl bg-emerald-400/5 border border-emerald-400/10">
                      <p className="text-sm font-light text-emerald-400/80 leading-relaxed">
                        {guidance.action}
                      </p>
                    </div>
                  </div>
                </>
              ) : versefallback ? (
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 opacity-40">
                   <Quote className="w-12 h-12 text-white/10" />
                   <p className="text-xl font-light">{versefallback.short}</p>
                   <p className="text-[10px] uppercase tracking-[0.3em]">Seeking Pattern...</p>
                </div>
              ) : null}

              <Button 
                variant="ghost" 
                className="w-full mt-4 justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 hover:text-primary hover:bg-white/5 group"
              >
                View Full Analysis
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-primary/5 blur-[80px] rounded-full" />
            <div className="absolute bottom-[-5%] left-[-5%] w-40 h-40 bg-emerald-400/5 blur-[60px] rounded-full" />
          </Card>
        </div>
      </div>
    </div>
  );
}

