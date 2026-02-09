import { openai } from "./openai";
import fs from "fs";
import path from "path";

interface GenerateAvatarOptions {
  companionId: string;
  prompt: string;
  variant?: number;
}

const VARIANT_MODIFIERS = [
  "",
  ", different angle, slight smile, warm expression",
  ", looking to the side, contemplative mood, soft background",
  ", close-up portrait, gentle eyes, natural daylight",
];

export async function generateAvatar(
  options: GenerateAvatarOptions
): Promise<string> {
  const { companionId, prompt, variant = 0 } = options;

  const fullPrompt = prompt + (VARIANT_MODIFIERS[variant] || "");

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: fullPrompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
    style: "natural",
    response_format: "b64_json",
  });

  const base64Data = response.data?.[0]?.b64_json;
  if (!base64Data) throw new Error("Failed to generate image: empty response");
  const buffer = Buffer.from(base64Data, "base64");

  const fileName =
    variant === 0
      ? `${companionId}-main.png`
      : `${companionId}-alt${variant}.png`;

  const avatarDir = path.join(process.cwd(), "public", "avatars");
  if (!fs.existsSync(avatarDir)) {
    fs.mkdirSync(avatarDir, { recursive: true });
  }

  const filePath = path.join(avatarDir, fileName);
  fs.writeFileSync(filePath, buffer);

  return `/avatars/${fileName}`;
}

export async function generateAllAvatars(
  companionId: string,
  prompt: string
): Promise<{ main: string; alt1: string; alt2: string }> {
  const main = await generateAvatar({ companionId, prompt, variant: 0 });
  const alt1 = await generateAvatar({ companionId, prompt, variant: 1 });
  const alt2 = await generateAvatar({ companionId, prompt, variant: 2 });

  return { main, alt1, alt2 };
}
