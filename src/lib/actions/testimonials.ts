"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function listPublishedTestimonials() {
  const db = await getDb();
  return db.query.testimonials.findMany({
    where: eq(testimonials.isPublished, true),
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });
}

export async function listAllTestimonials() {
  const db = await getDb();
  return db.query.testimonials.findMany({
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });
}

export async function createTestimonial(input: {
  customerName: string;
  rating: number;
  content: string;
  serviceType?: string;
}) {
  const db = await getDb();
  await db.insert(testimonials).values(input);
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimoni");
}

export async function toggleTestimonialPublished(id: number, isPublished: boolean) {
  const db = await getDb();
  await db.update(testimonials).set({ isPublished }).where(eq(testimonials.id, id));
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimoni");
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimoni");
}
