"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Welcome to MindMantra",
    subtitle: "Your intelligent companion for mental, physical, and spiritual harmony.",
  },
  {
    title: "What brings you here?",
    subtitle: "Select your primary focus so our AI can personalize your journey.",
    options: ["Mental Clarity", "Spiritual Guidance", "Physical Vitality", "Stress Relief"]
  },
  {
    title: "Initializing your space...",
    subtitle: "Connecting to wellness models. Preparing your sanctuary.",
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg"
        >
          <Card glow className="text-center p-12">
            <h1 className="text-4xl font-bold mb-4 premium-text-gradient">{steps[step].title}</h1>
            <p className="text-text-secondary mb-10 text-lg">{steps[step].subtitle}</p>

            {steps[step].options && (
              <div className="grid grid-cols-2 gap-4 mb-10">
                {steps[step].options?.map((opt, i) => (
                  <Button key={i} variant="glass" className="py-4 font-medium hover:!bg-primary/20">
                    {opt}
                  </Button>
                ))}
              </div>
            )}

            {step === steps.length - 1 ? (
              <div className="flex justify-center my-8">
                <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-accent animate-spin" />
              </div>
            ) : null}

            <Button size="lg" onClick={handleNext} className="w-full">
              {step === steps.length - 1 ? "Enter Dashboard" : "Continue"}
            </Button>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="flex gap-3 mt-12">
        {steps.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-accent' : 'bg-border'}`} 
          />
        ))}
      </div>
    </div>
  );
}
