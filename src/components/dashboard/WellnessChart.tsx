"use client";

import React from "react";
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

export default function WellnessChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="dashStress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="dashRecovery" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area 
          type="monotone" 
          dataKey="stress" 
          stroke="#1E3A8A" 
          strokeWidth={3} 
          fillOpacity={1} 
          fill="url(#dashStress)" 
          animationDuration={1500}
        />
        <Area 
          type="monotone" 
          dataKey="recovery" 
          stroke="#F59E0B" 
          strokeWidth={3} 
          fillOpacity={1} 
          fill="url(#dashRecovery)" 
          animationDuration={2000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

