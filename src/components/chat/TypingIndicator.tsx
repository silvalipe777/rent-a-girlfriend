export default function TypingIndicator({ name }: { name?: string }) {
  return (
    <div className="flex justify-start">
      <div className="bg-white/[0.04] border border-purple-500/10 rounded-2xl rounded-bl-sm px-4 py-3 backdrop-blur-sm">
        {name && <p className="text-purple-400 text-xs font-semibold mb-1">{name}</p>}
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
