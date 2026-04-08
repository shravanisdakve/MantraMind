import { gitaDatabase, GitaVerse } from "@/data/gita";
import { detectTags, prioritizeTag, Tag } from "./agents";
import { getPrincipleForTag } from "./gita_engine";
import { generateResponse, GeneratedResponse } from "./response";

export interface UserMetricsScore {
  physical: number; // 0-100
  mental: number;   // 0-100
  control: number;  // 0-100
}

/**
 * Main entry point for generating guidance.
 * Now uses the modular full system architecture.
 * This interface is now a direct alias of GeneratedResponse.
 */
export type StructuredGuidance = GeneratedResponse;

/**
 * Legacy wrapper for analyzeSubjectiveState.
 */
export function analyzeSubjectiveState(text: string): string[] {
  const input = text.toLowerCase();
  const tags: string[] = [];

  const library = {
    stress: ["overwhelmed", "stressed", "anxious", "pressure", "tired", "burnt out", "exhausted"],
    control: ["focus", "distracted", "wandering", "control", "scattered", "discipline", "procrastination"],
    clarity: ["confused", "uncertain", "too many", "chaos", "lost", "why", "meaning"],
    balance: ["unstable", "extreme", "fluctuating", "mood", "restless"],
  };

  Object.entries(library).forEach(([tag, keywords]) => {
    if (keywords.some(kw => input.includes(kw))) {
      tags.push(tag);
    }
  });

  return tags;
}

/**
 * Main entry point for generating guidance.
 * Now uses the modular full system architecture.
 */
export function getStructuredGuidance(subjectiveInput: string, metrics: UserMetricsScore): StructuredGuidance {
  const subjectiveTags = analyzeSubjectiveState(subjectiveInput) as Tag[];
  const metricTags = detectTags(metrics);
  
  // Combine and prioritize
  const allTags = [...subjectiveTags, ...metricTags];
  const priorityTag = prioritizeTag(allTags);

  const principle = getPrincipleForTag(priorityTag);
  
  return generateResponse({
    stateTag: priorityTag,
    principle
  });
}

/**
 * Simple recommended verse picker for passive UI elements.
 */
export function getRecommendedVerse(metrics: UserMetricsScore): GitaVerse {
  const tags = detectTags(metrics);
  if (tags.length === 0) tags.push("purpose");
  
  const tag = prioritizeTag(tags);
  return getPrincipleForTag(tag);
}

/**
 * Archetype mapping for personalization.
 */
export function getArchetypeGuidance(title: string): string {
  const guidanceMap: Record<string, string> = {
    "The Sovereign Mind": "Maintain your stillness. You are acting with deep intentionality.",
    "The Disciplined Operator": "High output requires high recovery. Stay steady.",
    "The Restless Achiever": "Focus on the action, not the outcome. Let go of the pressure.",
    "The Overloaded Visionary": "Your vision is large, but your focus is fragmented. Return to one thing.",
    "The Burnt-Out Grinder": "Immediate recovery is your only path forward. Stop and reset.",
    "The Distracted Dreamer": "Bring the wandering mind back. Action over thinking.",
    "The Reactive Survivor": "Awareness is the first step. Pause before you react.",
    "The Seeking Architect": "Build your foundations. Small progress matters most.",
    "The High-Performance Zen": "You are in flow. Guide others with your presence.",
    "The Balanced Performer": "Maintain your equilibrium. Consistency is your strength.",
  };

  return guidanceMap[title] || "Elevate yourself by your own mind.";
}
