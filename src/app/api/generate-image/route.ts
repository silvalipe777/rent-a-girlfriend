import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAvatar } from "@/lib/image-generator";

export async function POST(req: Request) {
  try {
    const { companionId, variant = 0 } = await req.json();

    const companion = await prisma.aICompanion.findUnique({
      where: { id: companionId },
    });

    if (!companion) {
      return NextResponse.json({ error: "Companion não encontrado" }, { status: 404 });
    }

    const imagePath = await generateAvatar({
      companionId,
      prompt: companion.imagePrompt,
      variant,
    });

    const updateField = variant === 0 ? "avatarMain" : variant === 1 ? "avatarAlt1" : variant === 2 ? "avatarAlt2" : "avatarAlt3";

    await prisma.aICompanion.update({
      where: { id: companionId },
      data: { [updateField]: imagePath },
    });

    return NextResponse.json({ path: imagePath });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao gerar imagem";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
