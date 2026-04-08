"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";
import { Bell, Monitor, Lock, LogOut, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const { settings, updateSettings, clearAllData } = useStore();
  const router = useRouter();

  const handleToggleDark = () => {
    updateSettings({ forceDark: !settings.forceDark });
  };

  const handleToggleNotifications = () => {
    updateSettings({ notifications: !settings.notifications });
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all your data? This cannot be undone.")) {
      clearAllData();
      router.push("/onboarding");
    }
  };

  const handleSignOut = () => {
    // For demo, we just clear and go to onboarding
    clearAllData();
    router.push("/onboarding");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your preferences and platform presence.</p>
      </header>

      <div className="space-y-6">
        <Card glow className="bg-background-secondary border-border/40 p-6">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Monitor size={20}/>
            <h3 className="font-bold text-lg">Display</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Force Dark Theme</p>
              <p className="text-sm text-text-secondary">Maintain deep visual relaxation</p>
            </div>
            <button 
              onClick={handleToggleDark}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${settings.forceDark ? 'bg-primary shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'bg-white/10'}`}
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${settings.forceDark ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
          </div>
        </Card>

        <Card glow className="bg-background-secondary border-border/40 p-6">
          <div className="flex items-center gap-2 mb-6 text-secondary">
            <Bell size={20}/>
            <h3 className="font-bold text-lg">Notifications</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Wellness Reminders</p>
              <p className="text-sm text-text-secondary">Receive minimal, gentle nudges to breathe and hydrate</p>
            </div>
            <button 
              onClick={handleToggleNotifications}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${settings.notifications ? 'bg-secondary shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'bg-white/10'}`}
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${settings.notifications ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
          </div>
        </Card>

        <Card className="bg-background-secondary border-border/40 p-6">
          <div className="flex items-center gap-2 mb-6 text-red-400">
            <Lock size={20}/>
            <h3 className="font-bold text-lg">Privacy & Data</h3>
          </div>
          <p className="text-sm text-text-secondary mb-6">Your data is stored locally on your device for absolute privacy.</p>
          <Button 
            variant="ghost" 
            onClick={handleClearData}
            className="text-red-400 hover:bg-red-400/10 px-4 gap-2 border border-red-400/20"
          >
            <Trash2 size={16} /> Clear Local Storage Data
          </Button>
        </Card>
      </div>

      <div className="pt-8 flex justify-center">
        <Button 
          variant="ghost" 
          onClick={handleSignOut}
          className="text-text-secondary hover:text-white flex items-center gap-2 transition-colors"
        >
          <LogOut size={18} /> Sign Out (Demo)
        </Button>
      </div>
    </div>
  );
}

