import { cn } from "@/lib/utils";
import AnimatedAvatar from "./AnimatedAvatar";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  companionName?: string;
  companionAvatar?: string | null;
  isTalking?: boolean;
}

export default function MessageBubble({
  role,
  content,
  companionName,
  companionAvatar,
  isTalking = false,
}: MessageBubbleProps) {
  return (
    <div className={cn("flex items-end gap-2.5", role === "user" ? "justify-end" : "justify-start")}>
      {role === "assistant" && (
        <div className="flex-shrink-0 mb-1">
          <AnimatedAvatar
            src={companionAvatar ?? null}
            alt={companionName ?? "AI"}
            size="sm"
            isTalking={isTalking}
          />
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed",
          role === "user"
            ? "bg-gradient-to-r from-yellow-600 to-amber-600 text-black font-medium rounded-br-sm shadow-lg shadow-amber-500/20"
            : "bg-gradient-to-br from-rose-950/40 via-amber-950/30 to-purple-950/30 border border-pink-500/15 text-gray-100 rounded-bl-sm backdrop-blur-sm shadow-lg shadow-pink-500/5"
        )}
      >
        {role === "assistant" && companionName && (
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400 text-xs font-bold mb-1.5">{companionName}</p>
        )}
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
