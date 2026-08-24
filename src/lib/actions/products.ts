"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { products, productOrders, type ProductOrderItem, type ProductOrderStatus } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { generateOrderCode } from "@/lib/tracking-code";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function listActiveProducts(category?: string) {
  const db = await getDb();
  const all = await db.query.products.findMany({
    where: eq(products.isActive, true),
    orderBy: (p, { desc }) => [desc(p.createdAt)],
  });
  return category ? all.filter((p) => p.category === category) : all;
}

export async function listAllProducts() {
  const db = await getDb();
  return db.query.products.findMany({ orderBy: (p, { desc }) => [desc(p.createdAt)] });
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  return db.query.products.findFirst({ where: eq(products.slug, slug) });
}

export async function getProductById(id: number) {
  const db = await getDb();
  return db.query.products.findFirst({ where: eq(products.id, id) });
}

export async function createProduct(input: {
  name: string;
  category: string;
  price: number;
  condition: string;
  stock: number;
  description: string;
  images: string[];
}) {
  const db = await getDb();
  let slug = slugify(input.name);
  const existing = await db.query.products.findFirst({ where: eq(products.slug, slug) });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  await db.insert(products).values({ ...input, slug });
  revalidatePath("/admin/products");
  revalidatePath("/toko");
}

export async function updateProduct(
  id: number,
  input: Partial<{
    name: string;
    category: string;
    price: number;
    condition: string;
    stock: number;
    description: string;
    images: string[];
    isActive: boolean;
  }>
) {
  const db = await getDb();
  await db.update(products).set(input).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/toko");
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/toko");
}

export async function createProductOrder(input: {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: ProductOrderItem[];
}) {
  const db = await getDb();
  const total = input.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  let orderCode = generateOrderCode();

  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await db.query.productOrders.findFirst({
      where: eq(productOrders.orderCode, orderCode),
    });
    if (!existing) break;
    orderCode = generateOrderCode();
  }

  const [order] = await db
    .insert(productOrders)
    .values({
      orderCode,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerAddress: input.customerAddress,
      items: input.items,
      total,
      status: "menunggu_pembayaran",
    })
    .returning();

  revalidatePath("/admin/product-orders");
  return order;
}

export async function listProductOrders() {
  const db = await getDb();
  return db.query.productOrders.findMany({ orderBy: (o, { desc }) => [desc(o.createdAt)] });
}

export async function updateProductOrderStatus(id: number, status: ProductOrderStatus) {
  const db = await getDb();
  await db.update(productOrders).set({ status }).where(eq(productOrders.id, id));
  revalidatePath("/admin/product-orders");
}
