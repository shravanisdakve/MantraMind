import { gitaDatabase, GitaVerse } from "../data/gita";

/**
 * Fetches a Gita principle and its verse based on a priority tag.
 */
export function getPrincipleForTag(tag: string): GitaVerse {
  const matching = gitaDatabase.filter(v => v.tags.includes(tag));
  
  if (matching.length > 0) {
    // Return a random verse from the matching set for variety
    return matching[Math.floor(Math.random() * matching.length)];
  }

  // Fallback to a core foundational verse
  return gitaDatabase.find(v => v.id === "mind_1") || gitaDatabase[0];
}

/**
 * Global helper to find any verse by ID.
 */
export function getVerseById(id: string): GitaVerse | undefined {
  return gitaDatabase.find(v => v.id === id);
}
