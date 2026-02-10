import Link from "next/link";
import prisma from "@/lib/prisma";
import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CompanionCard from "@/components/marketplace/CompanionCard";
import Button from "@/components/ui/Button";

export default async function HomePage() {
  const featured = await prisma.aICompanion.findMany({
    where: { featured: true },
    take: 4,
  });

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      {/* Hero */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-yellow-500/20 rounded-full blur-[120px] float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-amber-600/15 rounded-full blur-[150px] float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[180px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <Container className="relative text-center space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-300">10 AI Assistants online now</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
            <span className="text-white">Your</span>
            <br />
            <span className="gradient-text">Crypto Assistant</span>
            <br />
            <span className="text-white">Awaits You</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400/80 max-w-xl mx-auto leading-relaxed">
            AI assistants specialized in crypto. Each one masters a different area — DeFi, NFTs, trading, airdrops and more. Powered by BSC.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/marketplace">
              <Button size="lg" className="neon-pulse">
                Explore Girls
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Connect Wallet
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 pt-8">
            {[
              { value: "10+", label: "Crypto Girls" },
              { value: "24/7", label: "Available" },
              { value: "100%", label: "Personalized" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="relative py-24">
        <Container>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">How it works</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Simple as <span className="gradient-text">1, 2, 3</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Explore",
                desc: "Browse our stunning crypto assistants and find your perfect match",
                color: "from-yellow-500 to-amber-500",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Rent",
                desc: "Choose your plan and unlock private time with your assistant",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "Chat",
                desc: "Intimate real-time conversations with personality, charm and crypto expertise",
                color: "from-orange-500 to-red-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all duration-500 hover:bg-white/[0.04]"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Companions */}
      {featured.length > 0 && (
        <section className="relative py-24">
          <Container>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Top picks</span>
                <h2 className="text-4xl font-bold mt-2">
                  Featured <span className="gradient-text">Girls</span>
                </h2>
              </div>
              <Link href="/marketplace">
                <Button variant="outline" size="sm">View all</Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((companion) => (
                <CompanionCard key={companion.id} companion={companion} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24">
        <Container>
          <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center">
            {/* BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-amber-600/20 to-orange-600/20" />
            <div className="absolute inset-0 bg-[#0B0E11]/60 backdrop-blur-sm" />
            <div className="absolute inset-[1px] rounded-[2rem] border border-amber-500/20" />

            <div className="relative space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to <span className="gradient-text">chat?</span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Connect your wallet and start chatting with our AI assistants right now.
              </p>
              <Link href="/login">
                <Button size="lg" className="neon-pulse">
                  Start Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
