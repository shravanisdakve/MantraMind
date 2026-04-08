"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Moon, Bell, Monitor, Lock, LogOut } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkToggle, setDarkToggle] = useState(true);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your preferences and platform presence.</p>
      </header>

      <div className="space-y-6">
        <Card glow className="bg-background-secondary border-border/40">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Monitor size={20}/> Display</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Force Dark Theme</p>
              <p className="text-sm text-text-secondary">Maintain deep visual relaxation</p>
            </div>
            <div 
              onClick={() => setDarkToggle(!darkToggle)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${darkToggle ? 'bg-primary' : 'bg-border'}`}
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${darkToggle ? 'translate-x-7' : 'translate-x-0'}`} />
            </div>
          </div>
        </Card>

        <Card glow className="bg-background-secondary border-border/40">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Bell size={20}/> Notifications</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Wellness Reminders</p>
              <p className="text-sm text-text-secondary">Receive minimal, gentle nudges to breathe and hydrate</p>
            </div>
            <div 
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${notifications ? 'bg-secondary' : 'bg-border'}`}
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${notifications ? 'translate-x-7' : 'translate-x-0'}`} />
            </div>
          </div>
        </Card>

        <Card className="bg-background-secondary border-border/40">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Lock size={20}/> Privacy & Data</h3>
          <p className="text-sm text-text-secondary mb-4">Your data is stored locally on your device for absolute privacy.</p>
          <Button variant="ghost" className="text-red-400 hover:bg-red-400/10 px-0">Clear Local Storage Data</Button>
        </Card>
      </div>

      <div className="pt-8 flex justify-center">
        <Button variant="ghost" className="text-text-secondary flex items-center gap-2">
          <LogOut size={18} /> Sign Out (Demo)
        </Button>
      </div>
    </div>
  );
}
