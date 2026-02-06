export interface AICompanionType {
  id: string;
  name: string;
  tagline: string;
  personality: string;
  personalityPrompt: string;
  imagePrompt: string;
  emotionalStyle: string;
  traits: string[];
  interests: string[];
  language: string;
  avatarMain: string | null;
  avatarAlt1: string | null;
  avatarAlt2: string | null;
  avatarAlt3: string | null;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
  available: boolean;
  featured: boolean;
  category: string;
  ageAppearance: number;
  createdAt: string;
}

export interface AICompanionRaw {
  id: string;
  name: string;
  tagline: string;
  personality: string;
  personalityPrompt: string;
  imagePrompt: string;
  emotionalStyle: string;
  traits: string;
  interests: string;
  language: string;
  avatarMain: string | null;
  avatarAlt1: string | null;
  avatarAlt2: string | null;
  avatarAlt3: string | null;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
  available: boolean;
  featured: boolean;
  category: string;
  ageAppearance: number;
}

export function parseCompanion(raw: AICompanionRaw): AICompanionType {
  return {
    ...raw,
    traits: JSON.parse(raw.traits),
    interests: JSON.parse(raw.interests),
    createdAt: new Date().toISOString(),
  };
}
