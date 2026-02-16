"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WalletLoginButton from "@/components/auth/WalletLoginButton";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    const result = await signIn("guest", { redirect: false });
    if (result?.ok) {
      router.push("/marketplace");
    }
    setGuestLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-64 h-64 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8 space-y-8">
          {/* Logo */}
          <div className="text-center space-y-4">
            <Image src="/logo.PNG" alt="AVA" width={56} height={56} className="rounded-2xl mx-auto shadow-lg shadow-amber-500/20" />
            <div>
              <h1 className="text-3xl font-black">
                <span className="gradient-text">欢迎</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2">选择你的登录方式</p>
            </div>
          </div>

          {/* Guest Login */}
          <Button
            onClick={handleGuestLogin}
            disabled={guestLoading}
            className="w-full"
            size="lg"
          >
            {guestLoading ? "进入中..." : "游客进入"}
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-amber-500/10" />
            <span className="text-xs text-gray-600">或</span>
            <div className="flex-1 h-px bg-amber-500/10" />
          </div>

          {/* Web3 Login */}
          <WalletLoginButton />
        </div>
      </div>
    </div>
  );
}
