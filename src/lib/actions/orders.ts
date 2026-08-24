"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { orders, orderStatusHistory, type OrderStatus } from "@/lib/db/schema";
import { generateTrackingCode } from "@/lib/tracking-code";
import { revalidatePath } from "next/cache";

export async function getOrderByTrackingCode(code: string) {
  const db = await getDb();
  const normalized = code.trim().toUpperCase();
  const order = await db.query.orders.findFirst({
    where: eq(orders.trackingCode, normalized),
  });
  if (!order) return null;

  const history = await db.query.orderStatusHistory.findMany({
    where: eq(orderStatusHistory.orderId, order.id),
    orderBy: (h, { asc }) => [asc(h.createdAt)],
  });

  return { order, history };
}

export async function listOrders() {
  const db = await getDb();
  return db.query.orders.findMany({
    orderBy: (o, { desc }) => [desc(o.createdAt)],
  });
}

export async function getOrderById(id: number) {
  const db = await getDb();
  const order = await db.query.orders.findFirst({ where: eq(orders.id, id) });
  if (!order) return null;
  const history = await db.query.orderStatusHistory.findMany({
    where: eq(orderStatusHistory.orderId, id),
    orderBy: (h, { asc }) => [asc(h.createdAt)],
  });
  return { order, history };
}

export async function createOrder(input: {
  customerName: string;
  customerPhone: string;
  deviceType: string;
  deviceBrandModel: string;
  complaint: string;
  estimasiSelesai?: string;
  estimasiBiaya?: number;
}) {
  const db = await getDb();
  let trackingCode = generateTrackingCode();

  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await db.query.orders.findFirst({
      where: eq(orders.trackingCode, trackingCode),
    });
    if (!existing) break;
    trackingCode = generateTrackingCode();
  }

  const [order] = await db
    .insert(orders)
    .values({
      trackingCode,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      deviceType: input.deviceType,
      deviceBrandModel: input.deviceBrandModel,
      complaint: input.complaint,
      estimasiSelesai: input.estimasiSelesai,
      estimasiBiaya: input.estimasiBiaya,
      status: "diterima",
    })
    .returning();

  await db.insert(orderStatusHistory).values({
    orderId: order.id,
    status: "diterima",
    note: "Perangkat diterima oleh Check Computer.",
  });

  revalidatePath("/admin/orders");
  return order;
}

export async function updateOrderStatus(
  orderId: number,
  status: OrderStatus,
  note?: string
) {
  const db = await getDb();
  await db
    .update(orders)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(eq(orders.id, orderId));

  await db.insert(orderStatusHistory).values({
    orderId,
    status,
    note: note || null,
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

export async function updateOrderEstimate(
  orderId: number,
  input: { estimasiSelesai?: string; estimasiBiaya?: number; biayaFinal?: number }
) {
  const db = await getDb();
  await db
    .update(orders)
    .set({ ...input, updatedAt: new Date().toISOString() })
    .where(eq(orders.id, orderId));

  revalidatePath(`/admin/orders/${orderId}`);
}
