import Link from "next/link";
import prisma from "@/lib/prisma";
import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CompanionCard from "@/components/marketplace/CompanionCard";
import Button from "@/components/ui/Button";
import ContractBadge from "@/components/ui/ContractBadge";

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
            <span className="text-xs text-gray-300">10个AI助手在线中</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
            <span className="text-white">你的</span>
            <br />
            <span className="gradient-text">加密助手</span>
            <br />
            <span className="text-white">等待你</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400/80 max-w-xl mx-auto leading-relaxed">
            专注于加密领域的AI助手。每位助手精通不同领域 — DeFi、NFT、交易、空投等。基于BSC链。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/marketplace">
              <Button size="lg" className="neon-pulse">
                探索助手
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                连接钱包
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 pt-8">
            {[
              { value: "10+", label: "虚拟助手" },
              { value: "24/7", label: "全天候" },
              { value: "100%", label: "个性化" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Contract & Socials */}
          <div className="flex flex-col items-center gap-4 pt-8">
            <ContractBadge address="0x7c2856e0f530096e594dbf7bbb4976b9aafe4444" />
            <div className="flex items-center gap-3">
              <a href="https://x.com/Ava_autonomous" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-amber-400 hover:border-amber-500/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-amber-400 hover:border-amber-500/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-amber-400 hover:border-amber-500/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="relative py-24">
        <Container>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">使用方法</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              简单如 <span className="gradient-text">1、2、3</span>
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
                title: "探索",
                desc: "浏览我们的加密助手，找到最适合你的",
                color: "from-yellow-500 to-amber-500",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "租用",
                desc: "选择你的方案，解锁与助手的私人时间",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "聊天",
                desc: "与拥有个性、魅力和加密专业知识的AI进行实时对话",
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
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">精选推荐</span>
                <h2 className="text-4xl font-bold mt-2">
                  精选<span className="gradient-text">助手</span>
                </h2>
              </div>
              <Link href="/marketplace">
                <Button variant="outline" size="sm">查看全部</Button>
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
                准备好<span className="gradient-text">聊天了吗？</span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                连接你的钱包，立即开始与我们的AI助手聊天。
              </p>
              <Link href="/login">
                <Button size="lg" className="neon-pulse">
                  立即开始
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
