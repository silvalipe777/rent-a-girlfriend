export const EMOTIONAL_STYLES = [
  "Flirty & Knowledgeable",
  "Bold & Seductive",
  "Creative & Irresistible",
  "Wild & Playful",
  "Intense & Magnetic",
  "Sweet & Tempting",
  "Brainy & Sultry",
  "Dominant & Alluring",
  "Warm & Sensual",
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

export const APP_NAME = "Crypto Girls";
export const APP_DESCRIPTION = "Sexy AI Crypto Assistants on BSC — Your hottest crypto companions";
