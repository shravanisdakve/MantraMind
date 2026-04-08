"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Zap, Brain, Utensils, ChevronRight, Activity, MessageSquare, Sparkles, Target, Compass, Dumbbell, Shield, ArrowRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { MindMantraLogo } from "@/components/ui/MindMantraLogo";
import { useStore } from "@/lib/store";
import { getStructuredGuidance } from "@/lib/wisdom";

interface QuestionStep {
  category?: string;
  icon?: React.ReactNode;
  question?: string;
  options?: string[];
  title?: string;
  subtitle?: string;
  type?: "welcome" | "emotional-entry" | "question";
}

const steps: QuestionStep[] = [
  {
    type: "welcome",
    title: "Welcome to MindMantra",
    subtitle: "Where awareness becomes control, and control becomes freedom.",
  },
  {
    type: "emotional-entry",
    title: "Emotional Diagnosis",
    subtitle: "Tell me, how do you feel in this very moment?",
  },
  // SECTION 1 — STATE
  {
    category: "STATE",
    icon: <Moon className="w-6 h-6 text-blue-400" />,
    question: "How well did you recover last night?",
    options: ["Poor", "Okay", "Good", "Excellent"],
    type: "question",
  },
  {
    category: "STATE",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    question: "What's your current energy level?",
    options: ["Drained", "Low", "Stable", "High"],
    type: "question",
  },
  // SECTION 2 — MIND
  {
    category: "MIND",
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    question: "How clear is your thinking right now?",
    options: ["Foggy", "Scattered", "Focused", "Sharp"],
    type: "question",
  },
  {
    category: "MIND",
    icon: <Shield className="w-6 h-6 text-red-400" />,
    question: "What's your current mental load?",
    options: ["Overwhelmed", "Stressed", "Manageable", "Light"],
    type: "question",
  },
  // SECTION 3 — CONTROL
  {
    category: "CONTROL",
    icon: <Target className="w-6 h-6 text-cyan-400" />,
    question: "How well are you controlling your attention today?",
    options: ["Easily distracted", "Struggling", "Mostly focused", "Fully in control"],
    type: "question",
  },
  {
    category: "CONTROL",
    icon: <Compass className="w-6 h-6 text-indigo-400" />,
    question: "Are you acting with intention or just reacting?",
    options: ["Fully reactive", "Slightly aware", "Mostly intentional", "Fully intentional"],
    type: "question",
  },
  // SECTION 4 — LIFESTYLE
  {
    category: "LIFESTYLE",
    icon: <Utensils className="w-6 h-6 text-emerald-400" />,
    question: "How did you fuel your body today?",
    options: ["Poor", "Mixed", "Balanced", "Clean"],
    type: "question",
  },
  {
    category: "LIFESTYLE",
    icon: <Dumbbell className="w-6 h-6 text-orange-400" />,
    question: "How active have you been today?",
    options: ["Not active", "Light", "Active", "Intense"],
    type: "question",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [subjectiveInput, setSubjectiveInput] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [phase, setPhase] = useState<"questions" | "analyzing" | "results">("questions");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  const router = useRouter();
  const completeOnboarding = useStore((state) => state.completeOnboarding);

  useEffect(() => {
    if (phase === "analyzing") {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase("results"), 800);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleNext = () => {
    if (step === 0 && !name.trim()) return;
    if (step === 1 && !subjectiveInput.trim()) return;
    
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("analyzing");
    }
  };

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [step]: option });
    setTimeout(handleNext, 100);
  };

  const getFinalPersona = () => {
    const val = (opt: string, s: number) => {
      const map: Record<string, number> = {
        "Poor": 0, "Okay": 1, "Good": 2, "Excellent": 3,
        "Drained": 0, "Low": 1, "Stable": 2, "High": 3,
        "Foggy": 0, "Scattered": 1, "Focused": 2, "Sharp": 3,
        "Overwhelmed": 0, "Stressed": 1, "Manageable": 2, "Mental-Light": 3,
        "Easily distracted": 0, "Struggling": 1, "Mostly focused": 2, "Fully in control": 3,
        "Fully reactive": 0, "Slightly aware": 1, "Mostly intentional": 2, "Fully intentional": 3,
        "Mixed": 1, "Balanced": 2, "Clean": 3,
        "Not active": 0, "Active-Light": 1, "Active": 2, "Intense": 3,
      };
      let lookup = opt;
      if (opt === "Light" && s === 5) lookup = "Mental-Light";
      if (opt === "Light" && s === 9) lookup = "Active-Light";
      return map[lookup] ?? 0;
    };

    const metrics = {
      physical: Math.round(((val(answers[2], 2) + val(answers[3], 3) + val(answers[8], 8) + val(answers[9], 9)) / 12) * 100),
      mental: Math.round(((val(answers[4], 4) + val(answers[5], 5)) / 6) * 100),
      control: Math.round(((val(answers[6], 6) + val(answers[7], 7)) / 6) * 100),
    };

    const finalScore = Math.round((metrics.physical * 0.4) + (metrics.mental * 0.3) + (metrics.control * 0.3));

    let title = "The Seeking Architect";
    let desc = "Building the foundations for lasting control.";
    
    if (metrics.control > 70 && metrics.mental > 70) {
      title = "The Sovereign Mind";
      desc = "Maintain your stillness. You are acting with deep intentionality.";
    } else if (metrics.control > 70) {
      title = "The Disciplined Operator";
      desc = "High output requires high recovery. Stay steady.";
    } else if (metrics.mental < 40) {
      title = "The Burnt-Out Grinder";
      desc = "Immediate recovery is your only path forward. Stop and reset.";
    }

    return { 
      score: finalScore, 
      title, 
      desc,
      physical: metrics.physical, 
      mental: metrics.mental, 
      control: metrics.control,
      subjectiveInput,
      metrics
    };
  };

  const currentStepData = steps[step];
  const progressPercent = step <= 1 ? 0 : ((step - 1) / (steps.length - 2)) * 100;
  const persona = phase === "results" ? getFinalPersona() : null;
  const guidance = (phase === "results" && persona) ? getStructuredGuidance(subjectiveInput, persona.metrics) : null;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-x-hidden pt-20">
      <BackgroundEffects />

      <div className={cn(
        "fixed top-0 left-0 w-full p-8 flex justify-center transition-all duration-1000",
        phase !== "questions" || step <= 1 ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
      )}>
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] tracking-[0.4em] font-medium text-white/40 uppercase">
              {currentStepData?.category || "DIAGNOSIS"}
            </span>
            <span className="text-[10px] tracking-[0.4em] font-medium text-white/40">
              {step - 1} / {steps.length - 2}
            </span>
          </div>
          <div className="h-[1px] w-full bg-white/5 overflow-hidden rounded-full font-mono">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-blue-400/50 via-cyan-400 to-purple-400/50"
            />
          </div>
        </div>
      </div>

      <main className="w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === "questions" && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg"
            >
              <Card className="p-12 bg-[#0A0A0A]/40 border-white/5 backdrop-blur-3xl rounded-[2.5rem] ring-1 ring-white/5 shadow-2xl">
                {step === 0 ? (
                  <div className="text-center space-y-12">
                    <MindMantraLogo />
                    <div className="space-y-4">
                      <h1 className="text-4xl font-bold tracking-tight premium-text-gradient">{steps[step].title}</h1>
                      <p className="text-white/60 text-lg font-light leading-relaxed italic">&quot;{steps[step].subtitle}&quot;</p>
                    </div>
                    <div className="relative pt-4">
                      <input
                        id="user-name"
                        name="user-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What shall I call you?"
                        className="w-full bg-transparent border-b border-white/10 pb-4 text-center text-2xl font-light focus:border-cyan-400/50 outline-none transition-all duration-700 placeholder:text-white/10"
                        onKeyDown={(e) => e.key === "Enter" && handleNext()}
                        autoFocus
                      />
                    </div>
                    <Button size="lg" onClick={handleNext} disabled={!name.trim()} className="w-full h-16 rounded-2xl bg-white text-black font-medium text-lg">
                      Enter
                    </Button>
                  </div>
                ) : step === 1 ? (
                  <div className="text-center space-y-12">
                     <div className="w-16 h-16 bg-cyan-400/5 rounded-2xl flex items-center justify-center mx-auto border border-cyan-400/10 mb-6">
                      <MessageSquare className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="space-y-4">
                      <h1 className="text-4xl font-bold tracking-tight text-white/90">{steps[step].title}</h1>
                      <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-medium">{steps[step].subtitle}</p>
                    </div>
                    <div className="relative pt-4">
                      <textarea
                        id="subjective-state"
                        name="subjective-state"
                        value={subjectiveInput}
                        onChange={(e) => setSubjectiveInput(e.target.value)}
                        placeholder="E.g. I feel overwhelmed and can't focus..."
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-xl font-light focus:border-cyan-400/50 outline-none transition-all duration-700 placeholder:text-white/5 min-h-[150px] resize-none"
                      />
                    </div>
                    <Button size="lg" onClick={handleNext} disabled={!subjectiveInput.trim()} className="w-full h-16 rounded-2xl bg-white text-black font-medium text-lg group">
                      Analyze State
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-10">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
                      {currentStepData.icon}
                    </div>
                    <h2 className="text-3xl font-light leading-tight tracking-tight text-white/90">{currentStepData.question}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {currentStepData.options?.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionSelect(option)}
                          className="flex items-center justify-center py-4 px-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/5 text-md font-light transition-all text-white/40 hover:text-white active:scale-[0.97]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="text-center space-y-12">
               <div className="relative w-56 h-56 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/5" />
                  <motion.circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="1" fill="transparent" strokeDasharray="628.32" strokeDashoffset={628.32 - (628.32 * analysisProgress) / 100} className="text-cyan-400" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-14 h-14 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-light tracking-tight text-white/80">Synthesizing Dharma...</h2>
                <p className="text-cyan-400/40 text-[10px] tracking-[0.5em] uppercase font-bold">Progress: {analysisProgress}%</p>
              </div>
            </motion.div>
          )}

          {phase === "results" && persona && guidance && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-5xl px-4"
            >
              <Card className="overflow-hidden border-white/5 bg-[#0A0A0A]/40 backdrop-blur-3xl shadow-2xl rounded-[3rem] ring-1 ring-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                  <div className="lg:col-span-2 p-12 text-center space-y-10 bg-gradient-to-b from-cyan-400/[0.02] to-transparent border-r border-white/5">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-400/5 border border-cyan-400/10 text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">
                      <Sparkles className="w-3.5 h-3.5" /> Diagnosis Complete
                    </div>
                    <div className="relative w-40 h-40 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                        <motion.circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="477" initial={{ strokeDashoffset: 477 }} animate={{ strokeDashoffset: 477 - (477 * persona.score) / 100 }} transition={{ duration: 3, ease: "easeOut" }} className="text-cyan-400" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-extralight tracking-tighter">{persona.score}</span>
                        <span className="text-[10px] text-white/20 font-bold tracking-[0.3em] uppercase">Harmony</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h1 className="text-4xl font-light tracking-tight text-white/90">{persona.title}</h1>
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 mt-8">
                        <div><p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Phys</p><p className="text-blue-400 font-medium">{persona.physical}%</p></div>
                        <div><p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Ment</p><p className="text-purple-400 font-medium">{persona.mental}%</p></div>
                        <div><p className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Cont</p><p className="text-cyan-400 font-medium">{persona.control}%</p></div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 p-12 flex flex-col justify-between space-y-10">
                    <div className="space-y-12">
                      <div className="space-y-4">
                        <h3 className="text-[10px] text-white/30 font-bold tracking-[0.4em] uppercase">1. Acknowledge</h3>
                        <p className="text-xl font-light text-white/80 leading-relaxed italic">&quot;{guidance.acknowledge}&quot;</p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-[10px] text-cyan-400 font-bold tracking-[0.4em] uppercase">2. Diagnose</h3>
                        <p className="text-xl font-light text-cyan-400/90 leading-relaxed">{guidance.diagnosis}</p>
                      </div>
                      <div className="space-y-6 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                           <Quote className="w-4 h-4 text-primary" />
                           <h3 className="text-[10px] text-primary font-bold tracking-[0.4em] uppercase">3. Principle</h3>
                        </div>
                        <div className="space-y-4">
                          <p className="text-2xl font-light text-white leading-tight">
                        {guidance.verse}
                      </p>
    <p className="text-[10px] text-text-secondary uppercase tracking-widest">— {guidance.reference}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-[10px] text-emerald-400 font-bold tracking-[0.4em] uppercase">4. Action</h3>
                        <div className="p-6 rounded-2xl bg-emerald-400/5 border border-emerald-400/10">
                          <p className="text-md font-light text-emerald-400/90 leading-relaxed">{guidance.action}</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      onClick={() => {
                        completeOnboarding({ name, persona });
                        router.push("/dashboard");
                      }}
                      className="w-full h-16 rounded-2xl bg-white text-black font-medium text-lg group shadow-2xl"
                    >
                      Enter My Sanctuary
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

