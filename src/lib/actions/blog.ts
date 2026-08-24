"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function listPublishedPosts() {
  const db = await getDb();
  return db.query.blogPosts.findMany({
    where: eq(blogPosts.isPublished, true),
    orderBy: (b, { desc }) => [desc(b.publishedAt)],
  });
}

export async function listAllPosts() {
  const db = await getDb();
  return db.query.blogPosts.findMany({ orderBy: (b, { desc }) => [desc(b.createdAt)] });
}

export async function getPostBySlug(slug: string) {
  const db = await getDb();
  return db.query.blogPosts.findFirst({ where: eq(blogPosts.slug, slug) });
}

export async function getPostById(id: number) {
  const db = await getDb();
  return db.query.blogPosts.findFirst({ where: eq(blogPosts.id, id) });
}

export async function createPost(input: {
  title: string;
  coverImage?: string;
  content: string;
  excerpt?: string;
  author?: string;
  isPublished: boolean;
}) {
  const db = await getDb();
  let slug = slugify(input.title);
  const existing = await db.query.blogPosts.findFirst({ where: eq(blogPosts.slug, slug) });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  await db.insert(blogPosts).values({
    ...input,
    slug,
    author: input.author || "Check Computer",
    publishedAt: input.isPublished ? new Date().toISOString() : null,
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updatePost(
  id: number,
  input: Partial<{
    title: string;
    coverImage: string;
    content: string;
    excerpt: string;
    author: string;
    isPublished: boolean;
  }>
) {
  const db = await getDb();
  const current = await db.query.blogPosts.findFirst({ where: eq(blogPosts.id, id) });

  const patch: typeof input & { publishedAt?: string | null } = { ...input };
  if (input.isPublished && !current?.publishedAt) {
    patch.publishedAt = new Date().toISOString();
  }

  await db.update(blogPosts).set(patch).where(eq(blogPosts.id, id));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deletePost(id: number) {
  const db = await getDb();
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
