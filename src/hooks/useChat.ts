"use client";
import { useState, useCallback } from "react";
import type { ChatMessageType } from "@/types";

export function useChat(rentalId: string) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      setMessages((prev) => [...prev, { role: "user", content }]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rentalId, message: content }),
        });

        if (!response.ok) {
          const err = await response.json();
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: `Erro: ${err.error || "Falha na conexao"}` },
          ]);
          setIsLoading(false);
          return;
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantMessage += decoder.decode(value);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantMessage,
            };
            return updated;
          });
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Erro de conexao. Tente novamente." },
        ]);
      }

      setIsLoading(false);
    },
    [rentalId]
  );

  return { messages, sendMessage, isLoading };
}
