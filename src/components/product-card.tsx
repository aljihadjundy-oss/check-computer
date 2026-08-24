import Link from "next/link";
import Image from "next/image";
import { PRODUCT_CATEGORY_LABEL } from "@/lib/constants";
import type { products } from "@/lib/db/schema";

type Product = typeof products.$inferSelect;

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];

  return (
    <Link
      href={`/toko/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 transition hover:border-electric"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-graphite/40">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-paper/20">No Image</div>
        )}
        {product.stock <= 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-red-500/90 px-2 py-0.5 text-xs font-semibold text-white">
            Stok Habis
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs uppercase tracking-wide text-neon">
          {PRODUCT_CATEGORY_LABEL[product.category] ?? product.category} · {product.condition === "baru" ? "Baru" : "Bekas"}
        </p>
        <p className="font-medium text-paper">{product.name}</p>
        <p className="mt-auto font-heading text-lg text-electric-light">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}
