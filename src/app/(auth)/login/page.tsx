import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8 space-y-8">
          {/* Logo */}
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
              <span className="text-white text-xl font-bold">R</span>
            </div>
            <div>
              <h1 className="text-3xl font-black">
                <span className="gradient-text">Welcome back</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2">Sign in to your account to continue</p>
            </div>
          </div>

          <LoginForm />

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="gradient-text font-semibold hover:opacity-80 transition-opacity">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
