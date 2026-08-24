import type { Metadata } from "next";
import Link from "next/link";
import { listActiveProducts } from "@/lib/actions/products";
import { ProductCard } from "@/components/product-card";
import { PRODUCT_CATEGORY_LABEL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Toko Online",
  description: "Jual-beli laptop, PC, aksesoris & rakit PC custom di Check Computer Ciputat.",
};

export default async function TokoPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const products = await listActiveProducts(kategori);

  return (
    <div className="container-cc py-16">
      <h1 className="font-heading text-4xl md:text-5xl">Toko Online</h1>
      <p className="mt-3 max-w-xl text-paper/70">
        Laptop & PC bekas berkualitas, unit baru, aksesoris, sampai jasa rakit PC custom.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 text-sm">
        <Link
          href="/toko"
          className={`rounded-full px-3 py-1.5 ${!kategori ? "bg-electric text-ink" : "bg-white/5 text-paper/70"}`}
        >
          Semua
        </Link>
        {Object.entries(PRODUCT_CATEGORY_LABEL).map(([key, label]) => (
          <Link
            key={key}
            href={`/toko?kategori=${key}`}
            className={`rounded-full px-3 py-1.5 ${kategori === key ? "bg-electric text-ink" : "bg-white/5 text-paper/70"}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {products.length === 0 && (
          <p className="col-span-full py-12 text-center text-paper/40">Belum ada produk di kategori ini.</p>
        )}
      </div>
    </div>
  );
}
