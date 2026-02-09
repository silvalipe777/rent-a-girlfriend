import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const nonce = crypto.randomUUID().replace(/-/g, "");

  const response = NextResponse.json({ nonce });

  // Store nonce in httpOnly cookie so it persists across serverless invocations
  response.cookies.set("siwe-nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 300, // 5 minutes
    path: "/",
  });

  return response;
}
