"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";
import { Flame, Brain, Droplets, Moon, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const chartData = [
  { stress: 65, recovery: 30 },
  { stress: 59, recovery: 40 },
  { stress: 80, recovery: 20 },
  { stress: 45, recovery: 60 },
  { stress: 30, recovery: 85 },
  { stress: 20, recovery: 95 },
  { stress: 25, recovery: 90 },
];

export default function Dashboard() {
  const { streak, xp, stressLevel, sleepHours, hydration } = useStore();

  const metrics = [
    { label: "Stress Level", value: `${stressLevel}%`, icon: Brain, color: "text-primary" },
    { label: "Sleep", value: `${sleepHours}h`, icon: Moon, color: "text-indigo-400" },
    { label: "Hydration", value: `${hydration}%`, icon: Droplets, color: "text-blue-400" },
    { label: "Daily Streak", value: `${streak} Days`, icon: Flame, color: "text-secondary" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, Seeker</h1>
          <p className="text-text-secondary text-lg">Your sanctuary awaits. Let's find balance today.</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-accent font-bold text-xl">
            <TrendingUp size={24} /> {xp} XP
          </div>
          <p className="text-sm text-text-secondary">Level 12 Mindful</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card glow className="flex items-center gap-6 p-6">
              <div className={`p-4 rounded-xl bg-white/5 ${m.color}`}>
                <m.icon size={32} />
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">{m.label}</p>
                <h3 className="text-2xl font-bold">{m.value}</h3>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <Card className="lg:col-span-2 min-h-[300px] flex flex-col p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Wellness Overview</h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-primary"></div> Stress</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-secondary"></div> Recovery</div>
            </div>
          </div>
          <div className="flex-1 w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="dashStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="dashRecovery" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="stress" stroke="#1E3A8A" strokeWidth={2} fillOpacity={1} fill="url(#dashStress)" />
                <Area type="monotone" dataKey="recovery" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#dashRecovery)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card glow className="bg-gradient-to-br from-background-secondary to-primary/10 border-primary/20 flex flex-col justify-center p-8">
          <h3 className="text-xl font-bold mb-4">Daily Insight</h3>
          <p className="text-text-secondary italic mb-6 leading-relaxed">
            "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction."
          </p>
          <p className="text-right text-xs text-text-secondary">— Bhagavad Gita 2.47</p>
        </Card>
      </div>
    </div>
  );
}
