import { GitaVerse } from "../data/gita";
import { Tag } from "./agents";

export interface ResponseInput {
  stateTag: Tag;
  principle: GitaVerse;
}

export interface GeneratedResponse {
  acknowledge: string;
  diagnosis: string;
  principle: string;
  verse: string;
  reference: string;
  action: string;
  verseData: GitaVerse;
}

const acknowledgeMap: Record<Tag, string> = {
  control: "It sounds like your mind is drifting and you're struggling to keep your focus steady.",
  clarity: "I feel your sense of confusion. Everything feels connected yet chaotic right now.",
  stress: "I can sense the weight you're carrying. It feels like you're being pulled in too many directions.",
  balance: "Your energy levels and state of mind seem to be fluctuating between extremes.",
  purpose: "You seem to be questioning your direction or seeking a deeper reason for your efforts."
};

const diagnosisMap: Record<Tag, string> = {
  control: "Your mind is currently not fully under your command. You are reacting to every passing thought, which is draining your primary reservoir of control.",
  clarity: "Your mental architecture is overloaded with too many 'open loops'. You've lost the forest for the trees.",
  stress: "You've become attached to the outcomes of a hundred different things you cannot control.",
  balance: "You have lost your steady equilibrium. You are swinging between intensity and depletion, missing the middle path.",
  purpose: "The path is clear, but the ego is clouding your vision with doubt or desire for validation."
};

/**
 * Generates a high-fidelity emotional diagnosis and guidance response.
 */
export function generateResponse(input: ResponseInput): GeneratedResponse {
  const { stateTag, principle } = input;

  return {
    acknowledge: acknowledgeMap[stateTag],
    diagnosis: diagnosisMap[stateTag],
    principle: principle.principle,
    verse: principle.short,
    reference: `Chapter ${principle.chapter}, Verse ${principle.verse}`,
    action: principle.action,
    verseData: principle
  };
}
