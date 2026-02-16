import { openai } from "./openai";
import prisma from "./prisma";

export async function createChatStream(
  rentalId: string,
  companionId: string,
  userMessage: string
) {
  const companion = await prisma.aICompanion.findUnique({
    where: { id: companionId },
  });

  if (!companion) throw new Error("Companion not found");

  const history = await prisma.chatMessage.findMany({
    where: { rentalId },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const messages: { role: "system" | "user" | "assistant"; content: string }[] =
    [
      { role: "system", content: companion.personalityPrompt },
      ...history.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: userMessage },
    ];

  await prisma.chatMessage.create({
    data: { rentalId, companionId, role: "user", content: userMessage },
  });

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    stream: true,
    max_tokens: 500,
    temperature: 0.9,
  });

  return { stream, companionId };
}
