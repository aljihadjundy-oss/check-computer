import type { MetadataRoute } from "next";
import { listActiveProducts } from "@/lib/actions/products";
import { listPublishedPosts } from "@/lib/actions/blog";

const BASE_URL = "https://checkcomputer.pages.dev";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/tentang",
    "/layanan",
    "/testimoni",
    "/kontak",
    "/tracking",
    "/booking",
    "/toko",
    "/blog",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const [products, posts] = await Promise.all([listActiveProducts(), listPublishedPosts()]);

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/toko/${p.slug}`,
    lastModified: new Date(p.createdAt),
  }));

  const postRoutes = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt ?? p.createdAt),
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
