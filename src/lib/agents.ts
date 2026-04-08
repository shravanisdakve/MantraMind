export const MOCK_DELAY = 1500;

export async function intentClassifier(message: string): Promise<'wellness' | 'gita'> {
  // Simple keyword mock
  const gitaKeywords = ['god', 'karma', 'duty', 'life', 'death', 'soul', 'purpose', 'gita', 'krishna'];
  const isGita = gitaKeywords.some(kw => message.toLowerCase().includes(kw));
  return new Promise(resolve => setTimeout(() => resolve(isGita ? 'gita' : 'wellness'), 500));
}

export async function askWellnessAgent(message: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`I sense you're reflecting on "${message}". How is your stress level today? Remember to take a deep breath. Try the 4-4-8 breathing exercise in the side menu if you feel overwhelmed.`);
    }, MOCK_DELAY);
  });
}

export async function askGitaAgent(message: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Regarding your thought: "${message}", the Gita teaches us equanimity. "Even-mindedness is called Yoga" (BG 2.48). Focus on your action, not the outcome.`);
    }, MOCK_DELAY);
  });
}
