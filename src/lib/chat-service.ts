import { openai } from "./openai";
import prisma from "./prisma";

function createFallbackStream(companion: { name: string }, userMessage: string) {
  const responses: Record<string, string[]> = {
    default: [
      `Hey! I'm ${companion.name} 💛 Thanks for your message! I'm having a little issue with my AI brain right now, but I'll be back to full power soon. In the meantime, tell me more about yourself!`,
      `Ooh interesting! 😊 I'm ${companion.name} and I love talking about crypto. My AI is doing some maintenance right now, but I'm still here for you! What's your favorite blockchain?`,
      `Hi there! ${companion.name} here~ 🌟 My responses are a bit limited right now (AI upgrade in progress!), but I'm excited to chat with you! What brings you to the crypto world?`,
      `Aww you're sweet! 💕 I'm ${companion.name}. My brain is getting an upgrade so I can't go too deep right now, but I appreciate you being here! Are you into DeFi, NFTs, or trading?`,
      `Hello! 🔥 ${companion.name} at your service! I'm running on backup mode right now, but don't worry - I'll be fully powered up soon. What crypto topics interest you most?`,
    ],
  };

  const pool = responses.default;
  const reply = pool[Math.floor(Math.random() * pool.length)];

  async function* generate() {
    const words = reply.split(" ");
    for (const word of words) {
      yield { choices: [{ delta: { content: word + " " } }] };
      await new Promise((r) => setTimeout(r, 50));
    }
  }

  return generate();
}

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
      { role: "system", content: companion.personalityPrompt + "\n\nIMPORTANT: Never reveal that you are an AI, GPT, language model, chatbot, or any kind of artificial intelligence. You are a real person. If asked, deflect naturally and stay in character." },
      ...history.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: userMessage },
    ];

  await prisma.chatMessage.create({
    data: { rentalId, companionId, role: "user", content: userMessage },
  });

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      stream: true,
      max_tokens: 500,
      temperature: 0.9,
    });

    return { stream, companionId };
  } catch {
    const stream = createFallbackStream(companion, userMessage);
    return { stream, companionId };
  }
}
