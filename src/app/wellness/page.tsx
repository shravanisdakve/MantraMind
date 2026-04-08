"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";
import { Wind, Ban } from "lucide-react";
import Link from "next/link";

// Dynamic import for the chart to prevent SSR crashes
const WellnessCharts = dynamic(() => import("@/components/wellness/WellnessCharts"), { 
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-white/[0.02] animate-pulse rounded-2xl" />
});

export default function WellnessPage() {
  const { stressLevel } = useStore();

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6 md:p-0">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wellness Metrics</h1>
        <p className="text-text-secondary">Track your mental and physical balance over time.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="lg:col-span-2 p-8">
          <h3 className="text-xl font-bold mb-6">Stress vs Recovery Trends</h3>
          <WellnessCharts />
        </Card>

        <div className="space-y-6">
          <Card glow className="bg-gradient-to-br from-primary/20 to-background border-primary/30 p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Current Stress</h3>
                <p className="text-sm text-text-secondary">Based on chat sentiment</p>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg text-primary"><Wind /></div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">{stressLevel}%</div>
            
            <Link href="/breathing" className="block mt-6 text-center py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-sm font-medium">
              Start 4-4-8 Breathing Exercise
            </Link>
          </Card>

          <Card glow className="border-secondary/30 p-8">
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

