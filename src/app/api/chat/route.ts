import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createChatStream } from "@/lib/chat-service";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rentalId, message } = await req.json();
    const userId = (session.user as { id: string }).id;

    const rental = await prisma.rental.findFirst({
      where: { id: rentalId, userId, status: "active" },
    });

    if (!rental) {
      return NextResponse.json({ error: "Rental not found or expired" }, { status: 404 });
    }

    if (new Date(rental.expiresAt) < new Date()) {
      await prisma.rental.update({
        where: { id: rentalId },
        data: { status: "expired" },
      });
      return NextResponse.json({ error: "Rental expired" }, { status: 403 });
    }

    const { stream, companionId } = await createChatStream(rentalId, rental.companionId, message);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          fullResponse += content;
          controller.enqueue(encoder.encode(content));
        }
        await prisma.chatMessage.create({
          data: { rentalId, companionId, role: "assistant", content: fullResponse },
        });
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return NextResponse.json({ error: "Chat error" }, { status: 500 });
  }
}
