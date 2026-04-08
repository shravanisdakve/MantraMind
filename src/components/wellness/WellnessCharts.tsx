"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { name: 'Mon', stress: 65, recovery: 30 },
  { name: 'Tue', stress: 59, recovery: 40 },
  { name: 'Wed', stress: 80, recovery: 20 },
  { name: 'Thu', stress: 45, recovery: 60 },
  { name: 'Fri', stress: 30, recovery: 85 },
  { name: 'Sat', stress: 20, recovery: 95 },
  { name: 'Sun', stress: 25, recovery: 90 },
];

export default function WellnessCharts() {
  return (
    <div className="w-full h-full min-h-[350px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
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
  );
}

