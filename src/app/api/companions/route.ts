import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const emotionalStyle = searchParams.get("emotionalStyle") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "newest";

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { tagline: { contains: search } },
      ];
    }
    if (emotionalStyle) where.emotionalStyle = emotionalStyle;
    if (category) where.category = category;

    let orderBy: Record<string, string> = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { pricePerHour: "asc" };
    if (sort === "price_desc") orderBy = { pricePerHour: "desc" };
    if (sort === "name") orderBy = { name: "asc" };

    const companions = await prisma.aICompanion.findMany({
      where,
      orderBy,
    });

    return NextResponse.json(companions);
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const companion = await prisma.aICompanion.create({ data });
    return NextResponse.json(companion, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar companion" }, { status: 500 });
  }
}
