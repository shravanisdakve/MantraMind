"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";
import { Flame, Star, CheckCircle } from "lucide-react";

export default function JourneyPage() {
  const { streak, xp } = useStore();

  const milestones = [
    { level: 1, title: "Awakening", xpRequired: 0, completed: true },
    { level: 2, title: "Mindful Steps", xpRequired: 500, completed: true },
    { level: 3, title: "Inner Peace", xpRequired: 1200, completed: true },
    { level: 4, title: "Seeker of Wisdom", xpRequired: 2000, completed: false },
    { level: 5, title: "Master of Breath", xpRequired: 3500, completed: false },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Journey</h1>
          <p className="text-text-secondary">Track your path to sustained well-being.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-secondary font-bold bg-secondary/10 px-4 py-2 rounded-xl">
            <Flame size={20} /> {streak} Day Streak
          </div>
          <div className="flex items-center gap-2 text-accent font-bold bg-accent/10 px-4 py-2 rounded-xl">
            <Star size={20} /> {xp} total XP
          </div>
        </div>
      </header>

      <div className="relative pl-8 md:pl-0">
        {/* Vertical mapping line for mobile */}
        <div className="absolute left-11 top-0 bottom-0 w-1 bg-border md:hidden" />
        
        <div className="space-y-8 relative">
          {milestones.map((ms, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-6 group">
              <div className="hidden md:flex flex-1 justify-end text-right">
                {i % 2 !== 0 && (
                  <div>
                    <h3 className="font-bold text-lg">{ms.title}</h3>
                    <p className="text-sm text-text-secondary">{ms.xpRequired} XP needed</p>
                  </div>
                )}
              </div>
              
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 border-background transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                style={{ backgroundColor: ms.completed ? '#D4AF37' : '#1A1A1A' }}>
                {ms.completed ? <CheckCircle className="text-background" size={28} /> : <span className="text-text-secondary font-bold">L{ms.level}</span>}
              </div>

              <div className="flex-1 md:hidden md:text-left w-full pl-6">
                <Card className={`p-4 ${ms.completed ? 'border-accent/40' : ''}`}>
                  <h3 className="font-bold">{ms.title}</h3>
                  <p className="text-sm text-text-secondary">{ms.xpRequired} XP {ms.completed ? 'Achieved' : 'Needed'}</p>
                </Card>
              </div>

              <div className="flex-1 hidden md:block text-left">
                {i % 2 === 0 && (
                  <div>
                    <h3 className="font-bold text-lg">{ms.title}</h3>
                    <p className="text-sm text-text-secondary">{ms.xpRequired} XP needed</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

