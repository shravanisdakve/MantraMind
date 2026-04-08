"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { askGitaAgent } from "@/lib/agents";
import { Button } from "@/components/ui/Button";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SpiritualPage() {
  const { chatHistory, addMessage } = useStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = chatHistory.filter((m) => m.agentType === "gita");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), role: "user" as const, content: input, agentType: "gita" as const, timestamp: Date.now() };
    addMessage(userMsg);
    setInput("");
    setIsLoading(true);

    const replyText = await askGitaAgent(input);
    
    const botMsg = { id: (Date.now() + 1).toString(), role: "assistant" as const, content: replyText, agentType: "gita" as const, timestamp: Date.now() };
    addMessage(botMsg);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] relative max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">Gita Wisdom</h1>
        <p className="text-text-secondary">Timeless spiritual guidance based on the Bhagavad Gita.</p>
      </header>

      <div className="flex-1 overflow-y-auto pr-4 space-y-6 pb-20 custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-text-secondary">
            <p>What moral or existential dilemma do you face today?</p>
          </div>
        )}
        
        {messages.map((m) => (
          <motion.div 
            key={m.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 ${m.role === "user" ? "bg-secondary text-background" : "glass-panel border-secondary/20"}`}>
              {m.content}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="glass-panel border-secondary/20 max-w-[80%] rounded-2xl p-4 flex items-center gap-3">
              <Loader2 className="animate-spin text-secondary" size={20} />
              <span className="text-sm text-text-secondary">Seeking ancient wisdom...</span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 pt-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="glass-panel rounded-full p-2 flex items-center pr-4 border border-secondary/30">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none px-4 text-text-primary placeholder:text-text-secondary"
            placeholder="Ask Arjuna's questions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button size="sm" variant="secondary" onClick={handleSend} disabled={!input.trim() || isLoading} className="p-2 aspect-square flex items-center justify-center">
            <Send size={18} className="text-background" />
          </Button>
        </div>
      </div>
    </div>
  );
}
