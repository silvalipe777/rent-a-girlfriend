"use client";
import { useState, useEffect } from "react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

interface Companion {
  id: string;
  name: string;
  emotionalStyle: string;
  avatarMain: string | null;
  avatarAlt1: string | null;
  avatarAlt2: string | null;
  available: boolean;
}

export default function AdminPage() {
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCompanions = async () => {
    const res = await fetch("/api/companions");
    const data = await res.json();
    setCompanions(data);
  };

  useEffect(() => {
    fetchCompanions();
  }, []);

  const handleSeed = async () => {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/seed", { method: "POST" });
    const data = await res.json();
    setMessage(data.message || data.error);
    setLoading(false);
    fetchCompanions();
  };

  const handleGenerateImage = async (companionId: string, variant: number) => {
    setMessage(`正在生成图片 (变体 ${variant})...`);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companionId, variant }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`图片已生成: ${data.path}`);
        fetchCompanions();
      } else {
        setMessage(`错误: ${data.error}`);
      }
    } catch {
      setMessage("图片生成失败");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">
          <span className="gradient-text">管理面板</span>
        </h1>

        {message && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6 text-sm">
            {message}
          </div>
        )}

        {/* Seed Button */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">数据库</h2>
          <div className="flex gap-3">
            <Button onClick={handleSeed} disabled={loading}>
              {loading ? "播种中..." : "播种10个AI助手"}
            </Button>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            向数据库播种10个加密AI助手
          </p>
        </Card>

        {/* Companions List */}
        <h2 className="text-xl font-bold mb-4">
          助手 ({companions.length})
        </h2>
        <div className="grid gap-4">
          {companions.map((c) => (
            <Card key={c.id} className="p-4">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                  {c.avatarMain ? (
                    <Image src={c.avatarMain} alt={c.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-500 font-bold text-xl">
                      {c.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{c.name}</h3>
                    <Badge variant="pink">{c.emotionalStyle}</Badge>
                    {c.available && <Badge variant="green">活跃</Badge>}
                  </div>
                  <p className="text-xs text-gray-500">ID: {c.id}</p>
                </div>

                {/* Generate Images */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={c.avatarMain ? "ghost" : "primary"}
                    onClick={() => handleGenerateImage(c.id, 0)}
                  >
                    {c.avatarMain ? "重新生成" : "生成头像"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleGenerateImage(c.id, 1)}
                  >
                    Alt 1
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleGenerateImage(c.id, 2)}
                  >
                    Alt 2
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
