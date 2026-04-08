import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentType: 'wellness' | 'gita' | 'intent';
  timestamp: number;
}

interface UserState {
  name: string;
  streak: number;
  xp: number;
  stressLevel: number; // 0 - 100
  sleepHours: number;
  hydration: number; // out of 100%
  chatHistory: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  updateMetrics: (metrics: Partial<{ stressLevel: number; sleepHours: number; hydration: number }>) => void;
  addXP: (amount: number) => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      name: "Seeker",
      streak: 5,
      xp: 1250,
      stressLevel: 45,
      sleepHours: 6.5,
      hydration: 60,
      chatHistory: [],
      addMessage: (msg) => set((state) => ({chatHistory: [...state.chatHistory, msg]})),
      updateMetrics: (metrics) => set((state) => ({ ...state, ...metrics })),
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
    }),
    {
      name: 'mindmantra-storage',
    }
  )
);
