import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentType: 'wellness' | 'gita' | 'intent';
  timestamp: number;
}

export interface Persona {
  title: string;
  desc: string;
  score: number;
  physical: number;
  mental: number;
  control: number;
  subjectiveInput?: string;
  metrics: {
    physical: number;
    mental: number;
    control: number;
  };
}

interface UserState {
  name: string;
  streak: number;
  xp: number;
  stressLevel: number;
  sleepHours: number;
  hydration: number;
  persona: Persona | null;
  onboardingComplete: boolean;
  chatHistory: ChatMessage[];
  
  // Settings
  settings: {
    notifications: boolean;
    forceDark: boolean;
  };

  addMessage: (msg: ChatMessage) => void;
  updateMetrics: (metrics: Partial<{ stressLevel: number; sleepHours: number; hydration: number }>) => void;
  completeOnboarding: (data: { name: string; persona: Persona }) => void;
  addXP: (amount: number) => void;
  updateSettings: (settings: Partial<{ notifications: boolean; forceDark: boolean }>) => void;
  clearAllData: () => void;
}

const initialState = {
  name: "Seeker",
  streak: 5,
  xp: 1250,
  stressLevel: 45,
  sleepHours: 6.5,
  hydration: 60,
  persona: null,
  onboardingComplete: false,
  chatHistory: [],
  settings: {
    notifications: true,
    forceDark: true,
  }
};

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      addMessage: (msg) => set((state) => ({chatHistory: [...state.chatHistory, msg]})),
      updateMetrics: (metrics) => set((state) => ({ ...state, ...metrics })),
      completeOnboarding: (data) => set({ 
        name: data.name, 
        persona: data.persona,
        onboardingComplete: true,
        stressLevel: Math.max(0, 100 - data.persona.metrics.mental),
        hydration: data.persona.metrics.physical,
      }),
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      clearAllData: () => {
        set(initialState);
        localStorage.removeItem('mindmantra-storage');
      }
    }),
    {
      name: 'mindmantra-storage',
    }
  )
);
