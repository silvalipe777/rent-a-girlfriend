"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  name: string;
  images: (string | null)[];
}

export default function ImageGallery({ name, images }: ImageGalleryProps) {
  const validImages = images.filter(Boolean) as string[];
  const [selected, setSelected] = useState(0);

  if (validImages.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Gallery</h2>
      </div>

      {/* Main image */}
      <div className="relative aspect-square rounded-xl overflow-hidden border border-purple-500/15">
        <Image
          src={validImages[selected]}
          alt={`${name} - photo ${selected + 1}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0010]/30 to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-3">
          {validImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                selected === i
                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                  : "border-purple-500/10 opacity-50 hover:opacity-80"
              )}
            >
              <Image src={img} alt={`${name} thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
