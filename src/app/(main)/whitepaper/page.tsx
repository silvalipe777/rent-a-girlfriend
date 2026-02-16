import Container from "@/components/layout/Container";

export default function WhitepaperPage() {
  return (
    <div className="relative py-20">
      {/* Background */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-amber-600/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Whitepaper v1.0</span>
          <h1 className="text-5xl md:text-6xl font-black">
            <span className="gradient-text">AVA</span>
          </h1>
          <p className="text-xl text-gray-400">Autonomous Virtual Agents</p>
          <p className="text-sm text-gray-600">February 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-16 text-gray-300 leading-relaxed">

          {/* Abstract */}
          <section className="glass rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Abstract</h2>
            <p>
              AVA (Autonomous Virtual Agents) is a decentralized platform built on Binance Smart Chain (BSC) that provides specialized AI-powered crypto assistants. Each agent is an expert in a specific domain of the cryptocurrency ecosystem — from Bitcoin fundamentals and DeFi strategies to NFT art, technical analysis, security, and alpha hunting. Users interact with these agents through real-time chat, paying in BNB via smart contracts for premium access.
            </p>
          </section>

          {/* 1. Introduction */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">01</span>
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
            </div>
            <p>
              The cryptocurrency market has grown into a multi-trillion dollar industry, yet navigating it remains overwhelming for most participants. Information is fragmented across thousands of sources, misinformation spreads rapidly, and the learning curve for DeFi, NFTs, trading, and security is steep.
            </p>
            <p>
              AVA addresses this by creating a team of 10 specialized AI agents, each with deep expertise in a specific crypto domain. Unlike generic chatbots, AVA agents have distinct personalities, communication styles, and areas of knowledge — making crypto education engaging, personalized, and accessible 24/7.
            </p>
          </section>

          {/* 2. Problem */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">02</span>
              <h2 className="text-2xl font-bold text-white">The Problem</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Information Overload", desc: "Thousands of tokens, protocols, and strategies make it impossible for newcomers to know where to start." },
                { title: "Scams & Security", desc: "Billions are lost annually to phishing, rug pulls, and smart contract exploits. Users lack accessible security guidance." },
                { title: "Fragmented Knowledge", desc: "DeFi, NFTs, trading, and airdrops each require specialized knowledge spread across different communities." },
                { title: "No Personalization", desc: "Existing tools offer one-size-fits-all solutions that don't adapt to individual knowledge levels or interests." },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h3 className="font-semibold text-amber-400 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Solution */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">03</span>
              <h2 className="text-2xl font-bold text-white">The Solution</h2>
            </div>
            <p>
              AVA deploys a network of 10 autonomous virtual agents, each powered by GPT-4 with custom personality prompts and domain-specific expertise. The platform operates on BSC for low-cost, fast transactions, with on-chain payment verification through a custom smart contract.
            </p>
            <div className="glass rounded-2xl p-8 space-y-6">
              <h3 className="font-bold text-white text-lg">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Explore", desc: "Browse the marketplace of 10 specialized AI agents. Each has a unique personality, expertise area, and communication style." },
                  { step: "2", title: "Rent", desc: "Choose an hourly, daily, or weekly plan. Pay in BNB directly through your wallet via our smart contract on BSC." },
                  { step: "3", title: "Chat", desc: "Engage in real-time streaming conversations with your chosen agent. Get personalized crypto advice, education, and alpha." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. The Agents */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">04</span>
              <h2 className="text-2xl font-bold text-white">The 10 AVA Agents</h2>
            </div>
            <p>
              Each agent is carefully designed with a unique personality, expertise domain, and emotional style to provide the most engaging and effective crypto guidance possible.
            </p>
            <div className="space-y-3">
              {[
                { name: "Suki", role: "Bitcoin Expert", style: "Friendly & Knowledgeable", desc: "Free-tier agent covering Bitcoin fundamentals, blockchain, mining, and halving cycles.", free: true },
                { name: "DeFi Queen", role: "DeFi Strategist", style: "Bold & Confident", desc: "Yield farming, liquidity pools, AMMs, lending protocols, and smart contract risk analysis." },
                { name: "NFT Bella", role: "NFT Artist & Collector", style: "Creative & Inspiring", desc: "NFT minting, marketplaces (OpenSea, Blur), PFP projects, and generative art." },
                { name: "Meme Coin Mia", role: "Meme Coin Degen", style: "Wild & Lively", desc: "Meme coins, community tokens, degen trading strategies, and crypto culture." },
                { name: "Trader Tanya", role: "Technical Analyst", style: "Intense & Magnetic", desc: "Candlestick patterns, RSI, MACD, Fibonacci, support/resistance, and futures trading." },
                { name: "Airdrop Amy", role: "Alpha Hunter", style: "Sweet & Helpful", desc: "Airdrop strategies, testnet participation, bridge farming, and governance voting." },
                { name: "Web3 Wendy", role: "Web3 Developer", style: "Intelligent & Witty", desc: "Solidity, Rust, smart contracts, DAOs, tokenomics, and dApp development." },
                { name: "Security Sara", role: "Security Expert", style: "Confident & Strategic", desc: "Wallet safety, phishing prevention, smart contract auditing, and OpSec best practices." },
                { name: "Staking Sophie", role: "Passive Income Specialist", style: "Warm & Supportive", desc: "PoS staking, validators, liquid staking (Lido, Rocket Pool), and restaking (EigenLayer)." },
                { name: "Alpha Luna", role: "On-Chain Analyst", style: "Mysterious & Dark", desc: "Whale tracking, smart money analysis, emerging narratives (AI, RWA, DePIN), and alpha discovery." },
              ].map((agent) => (
                <div key={agent.name} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold shrink-0 text-xs">
                    {agent.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-white">{agent.name}</h3>
                      <span className="text-xs text-amber-400">— {agent.role}</span>
                      {agent.free && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">FREE</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{agent.style}</p>
                    <p className="text-sm text-gray-400 mt-1">{agent.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Pricing */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">05</span>
              <h2 className="text-2xl font-bold text-white">Pricing Model</h2>
            </div>
            <p>
              AVA uses a simple, transparent pricing model denominated in BNB. Suki, the Bitcoin expert, is permanently free to ensure everyone has access to crypto education.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Plan</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Price (BNB)</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white font-medium">Free (Suki)</td>
                    <td className="py-3 px-4 text-gray-400">Unlimited</td>
                    <td className="py-3 px-4 text-green-400">0 BNB</td>
                    <td className="py-3 px-4 text-gray-500">Always free</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white font-medium">Hourly</td>
                    <td className="py-3 px-4 text-gray-400">1 hour</td>
                    <td className="py-3 px-4 text-amber-400">0.1 BNB</td>
                    <td className="py-3 px-4 text-gray-500">Quick session</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-white font-medium">Daily</td>
                    <td className="py-3 px-4 text-gray-400">24 hours</td>
                    <td className="py-3 px-4 text-amber-400">0.5 BNB</td>
                    <td className="py-3 px-4 text-gray-500">Most popular</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white font-medium">Weekly</td>
                    <td className="py-3 px-4 text-gray-400">7 days</td>
                    <td className="py-3 px-4 text-amber-400">2.0 BNB</td>
                    <td className="py-3 px-4 text-gray-500">Best value</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Smart Contract */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">06</span>
              <h2 className="text-2xl font-bold text-white">Smart Contract</h2>
            </div>
            <p>
              All payments are processed on-chain through our verified smart contract on Binance Smart Chain. The contract emits a <code className="text-amber-400 bg-white/5 px-1.5 py-0.5 rounded text-xs">PaymentReceived</code> event for every transaction, ensuring full transparency and auditability.
            </p>
            <div className="glass rounded-2xl p-6 space-y-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Contract Address (BSC)</span>
                <p className="font-mono text-amber-400 text-sm mt-1 break-all">0x7c2856e0f530096e594dbf7bbb4976b9aafe4444</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Network</span>
                <p className="text-white text-sm mt-1">Binance Smart Chain (Chain ID: 56)</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Payment Function</span>
                <p className="font-mono text-sm text-gray-400 mt-1">pay(string companionId, string plan) payable</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Event</span>
                <p className="font-mono text-sm text-gray-400 mt-1">PaymentReceived(address payer, uint256 amount, string companionId, string plan)</p>
              </div>
            </div>
          </section>

          {/* 7. Technology */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">07</span>
              <h2 className="text-2xl font-bold text-white">Technology Stack</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "AI Engine", items: ["GPT-4 with custom personality prompts", "Streaming responses for real-time chat", "20-message context window per session", "Domain-specific system prompts"] },
                { title: "Frontend", items: ["Next.js 14 (App Router)", "TypeScript + Tailwind CSS", "Real-time streaming UI", "Mobile-responsive design"] },
                { title: "Blockchain", items: ["Binance Smart Chain (BSC)", "Custom Solidity smart contract", "MetaMask wallet integration", "SIWE (Sign In With Ethereum)"] },
                { title: "Backend", items: ["PostgreSQL database (Neon)", "Prisma ORM", "NextAuth authentication", "Serverless deployment (Vercel)"] },
              ].map((stack) => (
                <div key={stack.title} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h3 className="font-semibold text-amber-400 mb-3">{stack.title}</h3>
                  <ul className="space-y-1.5">
                    {stack.items.map((item) => (
                      <li key={item} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-amber-500 mt-1">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Roadmap */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">08</span>
              <h2 className="text-2xl font-bold text-white">Roadmap</h2>
            </div>
            <div className="space-y-4">
              {[
                { phase: "Phase 1", title: "Launch", status: "Live", items: ["10 AI agents deployed", "BSC smart contract", "MetaMask wallet integration", "Real-time streaming chat"] },
                { phase: "Phase 2", title: "Growth", status: "Q2 2026", items: ["Token launch on BSC", "Agent voice chat", "Multi-language support", "Community governance"] },
                { phase: "Phase 3", title: "Expansion", status: "Q3 2026", items: ["20+ new specialized agents", "Cross-chain support (ETH, SOL)", "Mobile app (iOS/Android)", "Agent marketplace (user-created agents)"] },
                { phase: "Phase 4", title: "Autonomy", status: "Q4 2026", items: ["Agents execute on-chain actions", "Automated trading strategies", "Portfolio management", "Full DAO governance"] },
              ].map((phase) => (
                <div key={phase.phase} className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="shrink-0 text-center">
                    <div className="text-xs text-amber-400 font-semibold">{phase.phase}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{phase.status}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{phase.title}</h3>
                    <ul className="mt-2 space-y-1">
                      {phase.items.map((item) => (
                        <li key={item} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-amber-500 mt-1">&#8226;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Contact */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-mono text-sm">09</span>
              <h2 className="text-2xl font-bold text-white">Contact & Community</h2>
            </div>
            <div className="glass rounded-2xl p-8 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <a href="https://x.com/Ava_autonomous" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-colors">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="text-sm text-gray-300">@Ava_autonomous</span>
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-colors">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  <span className="text-sm text-gray-300">Telegram</span>
                </a>
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-colors">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
                  <span className="text-sm text-gray-300">Discord</span>
                </a>
              </div>
              <div className="pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Website</span>
                <p className="text-amber-400 text-sm mt-1">avaautonomous.com</p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="text-center pt-8 border-t border-white/5">
            <p className="text-xs text-gray-600 max-w-2xl mx-auto">
              Disclaimer: This whitepaper is for informational purposes only. It does not constitute financial advice. Cryptocurrency investments carry significant risk. Always do your own research (DYOR) before making any investment decisions. AVA agents provide educational content and should not be relied upon as the sole basis for financial decisions.
            </p>
          </section>

        </div>
      </Container>
    </div>
  );
}
