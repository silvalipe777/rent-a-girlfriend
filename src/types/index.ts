export * from "./companion";

export interface ChatMessageType {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export interface RentalType {
  id: string;
  userId: string;
  companionId: string;
  status: "active" | "expired" | "cancelled";
  plan: "hourly" | "daily" | "weekly";
  priceCharged: number;
  startedAt: string;
  expiresAt: string;
  companion?: {
    id: string;
    name: string;
    avatarMain: string | null;
    emotionalStyle: string;
  };
}
