import AnimatedAvatar from "./AnimatedAvatar";

interface TypingIndicatorProps {
  name?: string;
  avatar?: string | null;
}

export default function TypingIndicator({ name, avatar }: TypingIndicatorProps) {
  return (
    <div className="flex items-end gap-2.5 justify-start">
      <div className="flex-shrink-0 mb-1">
        <AnimatedAvatar
          src={avatar ?? null}
          alt={name ?? "AI"}
          size="sm"
          isTalking={true}
        />
      </div>

      <div className="bg-gradient-to-br from-rose-950/40 via-amber-950/30 to-purple-950/30 border border-pink-500/15 rounded-2xl rounded-bl-sm px-5 py-3.5 backdrop-blur-sm shadow-lg shadow-pink-500/5">
        {name && <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400 text-xs font-bold mb-1.5">{name}</p>}
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-rose-400/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-amber-400/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
