export const EMOTIONAL_STYLES = [
  "Friendly & Knowledgeable",
  "Bold & Confident",
  "Creative & Inspiring",
  "Wild & Playful",
  "Intense & Magnetic",
  "Sweet & Helpful",
  "Brainy & Witty",
  "Confident & Strategic",
  "Warm & Supportive",
  "Mysterious & Dark",
] as const;

export const CATEGORIES = [
  { value: "assistant", label: "Assistant" },
  { value: "boyfriend", label: "Boyfriend" },
  { value: "friend", label: "Friend" },
  { value: "mentor", label: "Mentor" },
] as const;

export const PRICING_PLANS = [
  { key: "hourly", label: "Per Hour", duration: 1 },
  { key: "daily", label: "Per Day", duration: 24 },
  { key: "weekly", label: "Per Week", duration: 168 },
] as const;

export const APP_NAME = "AVA";
export const APP_DESCRIPTION = "Autonomous Virtual Agents on BSC — Your smartest crypto companions";
