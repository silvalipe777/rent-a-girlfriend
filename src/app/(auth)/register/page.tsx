import Link from "next/link";
import Image from "next/image";
import WalletLoginButton from "@/components/auth/WalletLoginButton";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background orbs */}
      <div className="absolute top-[20%] right-[15%] w-72 h-72 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[15%] w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8 space-y-8">
          {/* Logo */}
          <div className="text-center space-y-4">
            <Image src="/logo.PNG" alt="AVA" width={56} height={56} className="rounded-2xl mx-auto shadow-lg shadow-amber-500/20" />
            <div>
              <h1 className="text-3xl font-black">
                <span className="gradient-text">开始使用</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2">连接你的钱包开始租用AI助手</p>
            </div>
          </div>

          <WalletLoginButton />

          <p className="text-center text-gray-600 text-sm">
            已有账号？{" "}
            <Link href="/login" className="gradient-text font-semibold hover:opacity-80 transition-opacity">
              登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
