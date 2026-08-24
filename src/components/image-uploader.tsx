"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageUploader({
  name,
  initialImages = [],
}: {
  name: string;
  initialImages?: string[];
}) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) setImages((prev) => [...prev, data.url]);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(images)} />
      <div className="flex flex-wrap gap-3">
        {images.map((url, idx) => (
          <div key={url} className="relative h-20 w-20 overflow-hidden rounded-lg border border-white/10">
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
              className="absolute right-0 top-0 bg-black/60 px-1 text-xs text-white"
            >
              ✕
            </button>
          </div>
        ))}
        <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border border-dashed border-white/20 text-xs text-paper/50 hover:border-electric">
          {uploading ? "..." : "+ Foto"}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
}
