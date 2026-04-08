import { UserMetricsScore } from "./wisdom";

export type Tag = "control" | "clarity" | "stress" | "balance" | "purpose";

/**
 * Detects priority emotional tags based on user state metrics.
 * Strategy: Address the root cause in the order of Control > Clarity > Stress > Balance.
 */
export function detectTags(state: UserMetricsScore): Tag[] {
  const tags: Tag[] = [];

  // Low control is the primary driver of instability (Arjuna's core struggle)
  if (state.control < 45) tags.push("control");
  
  // Low mental clarity leads to clouded action
  if (state.mental < 45) tags.push("clarity");
  
  // High physical push with low mental capacity indicates depletion/stress
  if (state.mental < 60) tags.push("stress");
  
  // General physical instability
  if (state.physical < 50) tags.push("balance");

  // Default state if metrics are high
  if (tags.length === 0) tags.push("purpose");

  return tags;
}

/**
 * Prioritizes a single tag for focused guidance.
 * Hierarchy ensures we fix the foundation before the decoration.
 */
export function prioritizeTag(tags: Tag[]): Tag {
  if (tags.includes("control")) return "control";
  if (tags.includes("clarity")) return "clarity";
  if (tags.includes("stress")) return "stress";
  if (tags.includes("balance")) return "balance";
  return tags[0] || "purpose";
}

// RESTORED AGENTS — Now powered by the new Intelligence Engine

/**
 * AI-driven Wellness Agent for the Chat system.
 */
export async function askWellnessAgent(input: string): Promise<string> {
  const { getStructuredGuidance } = await import("./wisdom");
  const guidance = getStructuredGuidance(input, { physical: 50, mental: 50, control: 50 });
  
  return `${guidance.acknowledge}\n\n${guidance.diagnosis}\n\nSuggested Action: ${guidance.action}`;
}

/**
 * AI-driven Spiritual Agent for the Gita system.
 */
export async function askGitaAgent(input: string): Promise<string> {
  const { getStructuredGuidance } = await import("./wisdom");
  const guidance = getStructuredGuidance(input, { physical: 50, mental: 50, control: 50 });
  
  return `"${guidance.verse}" - ${guidance.reference}\n\nPrinciple: ${guidance.principle}\n\n"${guidance.action}"`;
}
