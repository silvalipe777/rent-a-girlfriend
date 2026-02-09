import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const companion = await prisma.aICompanion.findUnique({
      where: { id: params.id },
    });
    if (!companion) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(companion);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const companion = await prisma.aICompanion.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(companion);
  } catch {
    return NextResponse.json({ error: "Error updating" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.aICompanion.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Error deleting" }, { status: 500 });
  }
}
