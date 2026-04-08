export interface GitaVerse {
  id: string;
  chapter: number;
  verse: number;
  principle: string;
  tags: string[];
  short: string;
  long: string;
  action: string;
}

export const gitaDatabase: GitaVerse[] = [
  {
    id: "action_1",
    chapter: 2,
    verse: 47,
    principle: "Detachment from results",
    tags: ["control", "stress", "outcome", "discipline"],
    short: "Focus on action, not results.",
    long: "You have control over your actions, not the outcomes. Do not let the fruit of your labor be your motive.",
    action: "Stop thinking about outcomes. Just execute the next step with absolute focus."
  },
  {
    id: "stability_1",
    chapter: 2,
    verse: 48,
    principle: "Equanimity",
    tags: ["balance", "stability", "clarity"],
    short: "Be steadfast in Yoga.",
    long: "Perform your duty with an even mind, abandoning all attachment to success or failure.",
    action: "Take 3 deep breaths. Accept the tension without letting it dictate your next move."
  },
  {
    id: "mind_1",
    chapter: 6,
    verse: 5,
    principle: "Self-elevation",
    tags: ["control", "purpose", "ego"],
    short: "Elevate the self by the self.",
    long: "A man must elevate himself by his own mind, not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well.",
    action: "Focus on one task. Bring your attention back firmly when it drifts."
  },
  {
    id: "mind_2",
    chapter: 6,
    verse: 6,
    principle: "Mastery of Mind",
    tags: ["control", "clarity", "focus"],
    short: "The mind is your best friend or worst enemy.",
    long: "For him who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his mind will remain the greatest enemy.",
    action: "Observe your thoughts as a witness. Do not let them pull you into an emotional spiral."
  },
  {
    id: "focus_1",
    chapter: 6,
    verse: 26,
    principle: "Refocusing",
    tags: ["focus", "control", "discipline"],
    short: "Bring the wandering mind back.",
    long: "From wherever the mind wanders due to its flickering and unsteady nature, one must certainly withdraw it and bring it back under the control of the Self.",
    action: "Reduce distractions. Work on one thing at a time. If the mind wanders, return without judgment."
  },
  {
    id: "balance_1",
    chapter: 6,
    verse: 17,
    principle: "Moderation",
    tags: ["balance", "stability", "lifestyle"],
    short: "Yoga is for the moderate.",
    long: "He who is regulated in his habits of eating, sleeping, recreation and work can mitigate all material pains by practicing the yoga system.",
    action: "Rest properly. Balance work and recovery. Avoid high-intensity effort for the next hour."
  },
  {
    id: "fear_1",
    chapter: 2,
    verse: 40,
    principle: "Fearlessness",
    tags: ["fear", "purpose", "growth"],
    short: "No effort is lost.",
    long: "In this endeavor there is no loss or diminution, and a little advancement on this path can protect one from the most dangerous type of fear.",
    action: "Identify the worst-case scenario. Accept it, then proceed with your duty anyway."
  },
  {
    id: "clarity_1",
    chapter: 2,
    verse: 63,
    principle: "Clouded Judgment",
    tags: ["clarity", "stress", "anger"],
    short: "Anger clouds judgment.",
    long: "From anger, complete delusion arises, and from delusion bewilderment of memory. When memory is bewildered, intelligence is lost.",
    action: "Step away from the situation. Wait for the 'fog' of emotion to clear before making a decision."
  },
  {
    id: "ego_1",
    chapter: 3,
    verse: 27,
    principle: "True Agency",
    tags: ["ego", "clarity", "purpose"],
    short: "The ego claims credit falsely.",
    long: "The spirit soul bewildered by the influence of false ego thinks himself the doer of activities that are in actuality carried out by the three modes of material nature.",
    action: "Reflect on what you actually control. Let go of the need for external validation or credit."
  },
  {
    id: "stress_1",
    chapter: 18,
    verse: 61,
    principle: "Surrender",
    tags: ["stress", "control", "peace"],
    short: "The Supreme resides in the heart.",
    long: "The Supreme Lord is situated in everyone's heart, O Arjuna, and is directing the wanderings of all living entities.",
    action: "Trust that you are exactly where you need to be. Release the internal resistance to the present moment."
  },
  {
    id: "purpose_1",
    chapter: 3,
    verse: 35,
    principle: "Individual Path",
    tags: ["purpose", "discipline", "fear"],
    short: "Better your own path than another's.",
    long: "It is far better to discharge one's own prescribed duties, even though faultily, than another's duties perfectly. Destruction in the course of performing one's own duty is better than engaging in another's duties, for to follow another's path is dangerous.",
    action: "Do the work that belongs to you, even if it feels small. Do not compare your progress with another's path."
  },
  {
    id: "discipline_1",
    chapter: 18,
    verse: 37,
    principle: "True Happiness",
    tags: ["discipline", "balance", "growth"],
    short: "Poison at first, nectar at last.",
    long: "That which in the beginning may be just like poison but at the end is just like nectar and which awakens one to self-realization is said to be happiness in the mode of goodness.",
    action: "Choose the harder path right now. The effort that feels like poison now will lead to lasting clarity."
  },
  {
    id: "clarity_2",
    chapter: 13,
    verse: 34,
    principle: "Awareness",
    tags: ["clarity", "focus", "spiritual"],
    short: "The sun illuminates the world.",
    long: "O son of Bharata, as the sun alone illuminates all this universe, so does the living entity, one within the body, illuminate the entire body by consciousness.",
    action: "Observe your consciousness. You are the light that sees the problem, not the problem itself."
  },
  {
    id: "control_2",
    chapter: 5,
    verse: 19,
    principle: "Internal Conquest",
    tags: ["control", "stability", "focus"],
    short: "Conquer the world from within.",
    long: "Those whose minds are established in sameness and equanimity have already conquered the conditions of birth and death.",
    action: "Build your inner sanctuary. Dedicate 5 minutes to pure stillness and equanimity."
  },
  {
    id: "stress_2",
    chapter: 5,
    verse: 26,
    principle: "Liberation from Stress",
    tags: ["stress", "clarity", "peace"],
    short: "Freedom for the self-controlled.",
    long: "Those who are free from anger and all material desires, who are self-realized, self-disciplined and constantly endeavoring for perfection, are assured of liberation in the Supreme in the very near future.",
    action: "Practice self-restraint. Say 'no' to one distraction that threatens your peace today."
  },
  {
    id: "focus_2",
    chapter: 2,
    verse: 41,
    principle: "One-pointedness",
    tags: ["focus", "discipline", "purpose"],
    short: "One aim, many branches.",
    long: "Those who are on this path are resolute in purpose, and their aim is one. O beloved child of the Kurus, the intelligence of those who are irresolute is many-branched.",
    action: "Narrow your vision. Pursue one clear aim for the next 30 minutes with absolute resolve."
  },
  {
    id: "balance_2",
    chapter: 14,
    verse: 24,
    principle: "Steady Neutrality",
    tags: ["balance", "stability", "ego"],
    short: "Steady in pleasure and pain.",
    long: "He who is situated in the self and regards alike pleasure and pain; who looks on a clod, a stone and a piece of gold with an equal eye; who is wise and holds praise and blame to be the same.",
    action: "Remain neutral to feedback for the next hour. Whether results are good or bad, your duty stays the same."
  },
  {
    id: "fear_2",
    chapter: 16,
    verse: 1,
    principle: "Divine Nature",
    tags: ["fear", "clarity", "spiritual"],
    short: "Fearlessness is the first quality.",
    long: "Fearlessness; purification of one's existence; cultivation of spiritual knowledge; charity; self-control; performance of sacrifice; study of the Vedas; austerity; simplicity.",
    action: "Cultivate simplicity. Strip away one mental complexity that is breeding unnecessary fear."
  },
  {
    id: "discipline_2",
    chapter: 18,
    verse: 33,
    principle: "Mental Fortitude",
    tags: ["discipline", "control", "focus"],
    short: "Determination sustained by Yoga.",
    long: "O son of Prtha, that determination which is unbreakable, which is sustained with steadfastness by yoga practice, and which thus controls the activities of the mind, life and senses is determination in the mode of goodness.",
    action: "Use your determination to prune one unproductive habit or thought pattern right now."
  },
  {
    id: "purpose_2",
    chapter: 4,
    verse: 38,
    principle: "Purifying Knowledge",
    tags: ["purpose", "clarity", "growth"],
    short: "Nothing as pure as knowledge.",
    long: "In this world, there is nothing so sublime and pure as transcendental knowledge. Such knowledge is the mature fruit of all mysticism.",
    action: "Seek purifying knowledge. Read one profound passage to elevate your perspective."
  }
];
