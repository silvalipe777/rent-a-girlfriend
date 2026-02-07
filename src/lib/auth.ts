import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { SiweMessage } from "siwe";
import prisma from "./prisma";
import { consumeNonce } from "./siwe-nonce";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    // Email/Password provider
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          walletAddress: user.walletAddress,
        };
      },
    }),

    // SIWE (Sign-In With Ethereum) provider
    CredentialsProvider({
      id: "siwe",
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.message || !credentials?.signature) return null;

        try {
          const siweMessage = new SiweMessage(credentials.message);
          const result = await siweMessage.verify({
            signature: credentials.signature,
          });

          if (!result.success) return null;

          // Verify nonce was issued by our server
          const nonceValid = consumeNonce(siweMessage.nonce);
          if (!nonceValid) return null;

          // Verify chain is Polygon
          if (siweMessage.chainId !== 137) return null;

          const walletAddress = siweMessage.address.toLowerCase();

          // Find or create user
          let user = await prisma.user.findFirst({
            where: { walletAddress },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                walletAddress,
                name: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
              },
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            walletAddress: user.walletAddress,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.walletAddress = user.walletAddress;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.walletAddress = token.walletAddress as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
};
