"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useStore } from "@/lib/store";
import { Wind, Ban } from "lucide-react";
import Link from "next/link";

const mockData = [
  { name: 'Mon', stress: 65, recovery: 30 },
  { name: 'Tue', stress: 59, recovery: 40 },
  { name: 'Wed', stress: 80, recovery: 20 },
  { name: 'Thu', stress: 45, recovery: 60 },
  { name: 'Fri', stress: 30, recovery: 85 },
  { name: 'Sat', stress: 20, recovery: 95 },
  { name: 'Sun', stress: 25, recovery: 90 },
];

export default function WellnessPage() {
  const { stressLevel } = useStore();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wellness Metrics</h1>
        <p className="text-text-secondary">Track your mental and physical balance over time.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-6">Stress vs Recovery Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="name" stroke="#A1A1AA" />
                <YAxis stroke="#A1A1AA" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', borderRadius: '8px' }}
                  itemStyle={{ color: '#F5F5F5' }}
                />
                <Area type="monotone" dataKey="stress" stroke="#1E3A8A" fillOpacity={1} fill="url(#colorStress)" />
                <Area type="monotone" dataKey="recovery" stroke="#F59E0B" fillOpacity={1} fill="url(#colorRecovery)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card glow className="bg-gradient-to-br from-primary/20 to-background border-primary/30">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Current Stress</h3>
                <p className="text-sm text-text-secondary">Based on chat sentiment</p>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg text-primary"><Wind /></div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">{stressLevel}%</div>
            
            <Link href="/breathing" className="block mt-6 text-center py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium">
              Start 4-4-8 Breathing Exercise
            </Link>
          </Card>

          <Card glow className="border-secondary/30">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Digital Detox</h3>
                <p className="text-sm text-text-secondary">Screen time limit</p>
              </div>
              <div className="p-2 bg-secondary/20 rounded-lg text-secondary"><Ban /></div>
            </div>
            <p className="text-text-secondary text-sm mb-4">You have 45 mins of screen time before suggested break.</p>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
