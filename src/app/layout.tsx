import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import AgeConfirmModal from "@/components/compliance/AgeConfirmModal";
import DisclaimerBanner from "@/components/compliance/DisclaimerBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent a Girlfriend - Virtual AI Companions",
  description:
    "Encontre sua companheira AI perfeita. Marketplace de AI Girlfriends virtuais para companhia, conversa e conexão emocional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased bg-gray-950 text-white`}>
        <Providers>
          <DisclaimerBanner />
          {children}
          <AgeConfirmModal />
        </Providers>
      </body>
    </html>
  );
}
