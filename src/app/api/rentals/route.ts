import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getRentalExpiry } from "@/lib/utils";
import { createPublicClient, http, formatEther } from "viem";
import { bsc } from "viem/chains";
import { PAYMENT_CONTRACT_ADDRESS } from "@/lib/contract";

const publicClient = createPublicClient({
  chain: bsc,
  transport: http(process.env.NEXT_PUBLIC_BSC_RPC_URL || "https://bsc-dataseed.binance.org"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { companionId, plan, txHash } = await req.json();
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

    const expectedPrice = priceMap[plan] || companion.pricePerHour;

    // FREE companion — no payment needed
    if (expectedPrice === 0) {
      const rental = await prisma.rental.create({
        data: {
          userId,
          companionId,
          plan,
          priceCharged: 0,
          expiresAt: getRentalExpiry(plan),
        },
      });
      return NextResponse.json(rental, { status: 201 });
    }

    // PAID companion — require and verify transaction
    if (!txHash) {
      return NextResponse.json({ error: "Payment required" }, { status: 402 });
    }

    // Prevent replay: check txHash not already used
    const existing = await prisma.rental.findUnique({ where: { txHash } });
    if (existing) {
      return NextResponse.json({ error: "Transaction already used" }, { status: 409 });
    }

    // Verify transaction on BSC
    const receipt = await publicClient.getTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

    if (!receipt || receipt.status !== "success") {
      return NextResponse.json({ error: "Transaction failed or not found" }, { status: 400 });
    }

    // Verify transaction went to our contract
    if (
      PAYMENT_CONTRACT_ADDRESS &&
      receipt.to?.toLowerCase() !== PAYMENT_CONTRACT_ADDRESS.toLowerCase()
    ) {
      return NextResponse.json({ error: "Invalid payment destination" }, { status: 400 });
    }

    // Verify PaymentReceived event was emitted
    const paymentLog = receipt.logs.find(
      (log) =>
        PAYMENT_CONTRACT_ADDRESS &&
        log.address.toLowerCase() === PAYMENT_CONTRACT_ADDRESS.toLowerCase()
    );
    if (!paymentLog) {
      return NextResponse.json({ error: "Payment event not found" }, { status: 400 });
    }

    // Verify amount
    const tx = await publicClient.getTransaction({
      hash: txHash as `0x${string}`,
    });
    const paidAmount = Number(formatEther(tx.value));
    const payerAddress = tx.from.toLowerCase();

    if (paidAmount < expectedPrice * 0.99) {
      return NextResponse.json(
        { error: `Insufficient payment. Expected ${expectedPrice} BNB, got ${paidAmount} BNB` },
        { status: 400 }
      );
    }

    const rental = await prisma.rental.create({
      data: {
        userId,
        companionId,
        plan,
        priceCharged: expectedPrice,
        txHash,
        payerWallet: payerAddress,
        expiresAt: getRentalExpiry(plan),
      },
    });

    return NextResponse.json(rental, { status: 201 });
  } catch (error) {
    console.error("Rental error:", error);
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
