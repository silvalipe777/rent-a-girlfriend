import { NextResponse } from "next/server";
import { generateNonce, cleanExpiredNonces } from "@/lib/siwe-nonce";

export async function GET() {
  cleanExpiredNonces();
  const nonce = generateNonce();
  return NextResponse.json({ nonce });
}
