import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAvatar } from "@/lib/image-generator";

const CARTOON_PROMPTS: Record<string, string> = {
  Luna: "Beautiful anime girl, 24 years old, long flowing wavy chestnut brown hair, big warm honey brown eyes with sparkles, gentle sweet smile, wearing cozy cream off-shoulder sweater, fairy lights bokeh background, warm golden tones, anime art style, detailed digital illustration, soft shading, kawaii aesthetic, high quality anime portrait, vibrant colors, by studio ghibli meets modern anime",
  Valentina: "Stunning anime woman, 26 years old, sleek dark hair in glamorous waves, striking green eyes with smoky makeup, confident alluring smile, elegant black dress, luxury lounge background with neon lights, anime art style, detailed digital illustration, femme fatale aesthetic, high quality anime portrait, dramatic lighting, rich colors, manga style beauty",
  Sakura: "Adorable anime girl, 22 years old, straight black hair with pink highlights and cute clips, big sparkling dark brown doe eyes, shy blushing smile, wearing oversized pastel pink hoodie, cozy room with plushies and neon signs background, anime art style, kawaii chibi-realistic mix, soft pastel colors, high quality anime portrait, cute aesthetic, manga illustration",
  Isabella: "Elegant anime woman, 28 years old, rich auburn wavy hair in messy bun with loose strands, emerald green eyes behind stylish glasses, thoughtful knowing smile, burgundy turtleneck, moody library with candles background, anime art style, detailed digital illustration, intellectual beauty, high quality anime portrait, warm cinematic lighting, seinen manga style",
  Maya: "Energetic anime girl, 25 years old, wavy golden blonde hair blowing in wind, bright crystal blue eyes full of energy, confident radiant smile, sporty white crop top, golden hour mountain nature background, anime art style, dynamic pose, adventurous vibe, high quality anime portrait, vibrant saturated colors, shonen manga energy, detailed illustration",
  Aurora: "Mysterious anime woman, 27 years old, long flowing raven black hair with purple shimmer, deep violet eyes with dark eyeliner, enigmatic half smile, dark velvet outfit, moody candlelit gothic background with moonlight, anime art style, dark fantasy aesthetic, high quality anime portrait, dramatic shadows, mystical atmosphere, detailed dark illustration",
  Sofia: "Cheerful anime girl, 23 years old, bouncy curly light brown hair, big sparkling warm brown eyes, huge joyful laugh, colorful summer dress, bright fun city background with confetti, anime art style, vibrant energetic, high quality anime portrait, bright saturated colors, playful dynamic pose, slice of life manga style, happy aesthetic",
  Helena: "Elegant anime woman, 30 years old, beautiful honey blonde hair in soft waves, warm deep hazel eyes, wise gentle smile, silk cream blouse, luxurious cozy living room with warm lighting, anime art style, sophisticated mature beauty, high quality anime portrait, warm golden tones, graceful and refined, josei manga aesthetic, detailed soft illustration",
  Yuki: "Super cute anime girl, 21 years old, perfectly straight silky black hair with soft bangs, big innocent dark doe eyes with sparkles, sweet shy smile with rosy blush cheeks, soft pink cardigan over white top, dreamy pastel cafe background with flowers, anime art style, ultra kawaii, high quality anime portrait, soft pastel color palette, adorable aesthetic, korean webtoon style",
  Carmen: "Passionate anime woman, 29 years old, voluminous long curly dark hair flowing dramatically, intense smoldering dark eyes, confident radiant smile, fitted red outfit, warm latin-inspired background with golden dramatic lighting, anime art style, fiery passionate energy, high quality anime portrait, rich warm saturated colors, dynamic dramatic pose, detailed illustration",
};

export async function POST() {
  const results: { name: string; status: string; path?: string; error?: string }[] = [];

  const companions = await prisma.aICompanion.findMany();

  for (const companion of companions) {
    const cartoonPrompt = CARTOON_PROMPTS[companion.name];
    if (!cartoonPrompt) {
      results.push({ name: companion.name, status: "skipped", error: "No prompt found" });
      continue;
    }

    try {
      await prisma.aICompanion.update({
        where: { id: companion.id },
        data: { imagePrompt: cartoonPrompt },
      });

      const path = await generateAvatar({
        companionId: companion.id,
        prompt: cartoonPrompt,
        variant: 0,
      });

      await prisma.aICompanion.update({
        where: { id: companion.id },
        data: { avatarMain: path },
      });

      results.push({ name: companion.name, status: "success", path });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      results.push({ name: companion.name, status: "error", error: msg });
    }
  }

  return NextResponse.json({ results });
}
