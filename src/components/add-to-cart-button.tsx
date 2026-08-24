"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
}: {
  productId: number;
  name: string;
  price: number;
  image: string | null;
  stock: number;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (stock <= 0) {
    return (
      <button disabled className="w-full cursor-not-allowed rounded-full bg-white/10 py-3 font-semibold text-paper/40">
        Stok Habis
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-10 w-10 rounded-full border border-white/15 text-paper hover:border-electric"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(stock, q + 1))}
          className="h-10 w-10 rounded-full border border-white/15 text-paper hover:border-electric"
        >
          +
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            addItem({ productId, name, price, image, stock }, qty);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          className="flex-1 rounded-full border border-electric py-3 font-semibold text-electric-light hover:bg-electric hover:text-ink"
        >
          {added ? "Ditambahkan ✓" : "Tambah ke Keranjang"}
        </button>
        <button
          onClick={() => {
            addItem({ productId, name, price, image, stock }, qty);
            router.push("/keranjang");
          }}
          className="flex-1 rounded-full bg-neon py-3 font-semibold text-ink hover:bg-neon-dim"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}
