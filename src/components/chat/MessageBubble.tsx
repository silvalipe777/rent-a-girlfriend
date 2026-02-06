import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  companionName?: string;
}

export default function MessageBubble({ role, content, companionName }: MessageBubbleProps) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          role === "user"
            ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-br-sm shadow-lg shadow-pink-500/10"
            : "bg-white/[0.04] border border-purple-500/10 text-gray-200 rounded-bl-sm backdrop-blur-sm"
        )}
      >
        {role === "assistant" && companionName && (
          <p className="text-purple-400 text-xs font-semibold mb-1">{companionName}</p>
        )}
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
