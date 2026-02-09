import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getRentalExpiry } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { companionId, plan } = await req.json();
    const userId = (session.user as { id: string }).id;

    const companion = await prisma.aICompanion.findUnique({
      where: { id: companionId },
    });

    if (!companion || !companion.available) {
      return NextResponse.json({ error: "Companion not available" }, { status: 404 });
    }

    const priceMap: Record<string, number> = {
      hourly: companion.pricePerHour,
      daily: companion.pricePerDay,
      weekly: companion.pricePerWeek,
    };

    const rental = await prisma.rental.create({
      data: {
        userId,
        companionId,
        plan,
        priceCharged: priceMap[plan] || companion.pricePerHour,
        expiresAt: getRentalExpiry(plan),
      },
    });

    return NextResponse.json(rental, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating rental" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: Record<string, unknown> = { userId };
    if (status) where.status = status;

    const rentals = await prisma.rental.findMany({
      where,
      include: {
        companion: {
          select: { id: true, name: true, avatarMain: true, emotionalStyle: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rentals);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
