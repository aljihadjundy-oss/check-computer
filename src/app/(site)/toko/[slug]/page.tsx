import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/actions/products";
import { PRODUCT_CATEGORY_LABEL, waLink } from "@/lib/constants";
import { AddToCartButton } from "@/components/add-to-cart-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.isActive) notFound();

  const image = product.images?.[0] ?? null;

  return (
    <div className="container-cc py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-graphite/40">
          {image ? (
            <Image src={image} alt={product.name} width={800} height={800} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-paper/20">No Image</div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-neon">
            {PRODUCT_CATEGORY_LABEL[product.category] ?? product.category} · {product.condition === "baru" ? "Baru" : "Bekas"}
          </p>
          <h1 className="mt-1 font-heading text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-3 font-heading text-3xl text-electric-light">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="mt-1 text-sm text-paper/50">Stok: {product.stock}</p>

          <div className="mt-6 whitespace-pre-line text-paper/75">{product.description}</div>

          <div className="mt-8">
            <AddToCartButton
              productId={product.id}
              name={product.name}
              price={product.price}
              image={image}
              stock={product.stock}
            />
          </div>

          <a
            href={waLink(`Halo Check Computer, saya mau tanya soal produk "${product.name}"`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center text-sm text-paper/60 hover:text-neon"
          >
            Tanya dulu via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
