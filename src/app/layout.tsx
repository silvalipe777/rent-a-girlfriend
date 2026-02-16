import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AVA - BSC链上的自主虚拟代理",
  description:
    "专注于加密领域的自主虚拟代理。每位助手精通不同领域 — DeFi、NFT、交易、空投等。",
  icons: {
    icon: "/logo.PNG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${inter.className} antialiased bg-gray-950 text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
