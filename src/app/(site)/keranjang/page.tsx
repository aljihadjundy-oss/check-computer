"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { createProductOrder } from "@/lib/actions/products";
import { SITE, waLink } from "@/lib/constants";

export default function KeranjangPage() {
  const { items, removeItem, updateQty, total, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ orderCode: string; total: number } | null>(null);
  const [form, setForm] = useState({ customerName: "", customerPhone: "", customerAddress: "" });

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const order = await createProductOrder({
        ...form,
        items: items.map((i) => ({ productId: i.productId, name: i.name, qty: i.qty, price: i.price })),
      });
      setResult({ orderCode: order.orderCode, total: order.total });
      clear();
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="container-cc py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-neon/30 bg-neon/5 p-8 text-center">
          <h1 className="font-heading text-3xl text-neon">Order Diterima!</h1>
          <p className="mt-2 text-paper/70">Kode order kamu:</p>
          <p className="mt-1 font-heading text-2xl">{result.orderCode}</p>
          <p className="mt-4 text-paper/70">
            Total: <strong className="text-paper">Rp {result.total.toLocaleString("id-ID")}</strong>
          </p>
          <p className="mt-4 text-sm text-paper/60">
            Silakan transfer sesuai total, lalu konfirmasi pembayaran via WhatsApp ke {SITE.owner} biar segera kami proses.
          </p>
          <a
            href={waLink(`Halo Check Computer, saya mau konfirmasi pembayaran order ${result.orderCode} sebesar Rp ${result.total.toLocaleString("id-ID")}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-neon px-6 py-3 font-semibold text-ink hover:bg-neon-dim"
          >
            Konfirmasi via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container-cc py-16">
      <h1 className="font-heading text-4xl md:text-5xl">Keranjang</h1>

      {items.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-paper/50">Keranjang kamu masih kosong.</p>
          <Link href="/toko" className="mt-4 inline-block text-neon hover:underline">
            Lihat produk →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 rounded-xl border border-white/10 p-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-graphite/40">
                  {item.image && (
                    <Image src={item.image} alt={item.name} width={80} height={80} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-electric-light">Rp {item.price.toLocaleString("id-ID")}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={item.stock}
                      value={item.qty}
                      onChange={(e) => updateQty(item.productId, Number(e.target.value))}
                      className="w-16 rounded-lg border border-white/10 bg-graphite/40 px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-white/10 p-6">
            <p className="flex justify-between text-lg">
              <span>Total</span>
              <span className="font-heading text-electric-light">Rp {total.toLocaleString("id-ID")}</span>
            </p>

            <form onSubmit={handleCheckout} className="mt-6 space-y-3">
              <input
                required
                placeholder="Nama Lengkap"
                value={form.customerName}
                onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2.5 text-sm outline-none focus:border-electric"
              />
              <input
                required
                placeholder="No HP / WhatsApp"
                value={form.customerPhone}
                onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2.5 text-sm outline-none focus:border-electric"
              />
              <textarea
                placeholder="Alamat (opsional, buat pengiriman)"
                rows={2}
                value={form.customerAddress}
                onChange={(e) => setForm((f) => ({ ...f, customerAddress: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2.5 text-sm outline-none focus:border-electric"
              />
              <button
                disabled={submitting}
                className="w-full rounded-full bg-neon py-3 font-semibold text-ink hover:bg-neon-dim disabled:opacity-50"
              >
                {submitting ? "Memproses..." : "Checkout"}
              </button>
              <p className="text-center text-xs text-paper/40">
                Pembayaran via transfer manual, konfirmasi ke kami setelah checkout.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
