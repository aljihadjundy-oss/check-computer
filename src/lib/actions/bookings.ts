"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bookings, type BookingStatus } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { createOrder } from "./orders";

export async function createBooking(input: {
  customerName: string;
  customerPhone: string;
  deviceType: string;
  complaint: string;
  preferredDate: string;
  preferredTime: string;
}) {
  const db = await getDb();
  const [booking] = await db.insert(bookings).values(input).returning();
  revalidatePath("/admin/bookings");
  return booking;
}

export async function listBookings() {
  const db = await getDb();
  return db.query.bookings.findMany({
    orderBy: (b, { desc }) => [desc(b.createdAt)],
  });
}

export async function updateBookingStatus(id: number, status: BookingStatus) {
  const db = await getDb();
  await db.update(bookings).set({ status }).where(eq(bookings.id, id));
  revalidatePath("/admin/bookings");
}

export async function convertBookingToOrder(bookingId: number) {
  const db = await getDb();
  const booking = await db.query.bookings.findFirst({ where: eq(bookings.id, bookingId) });
  if (!booking) throw new Error("Booking tidak ditemukan");

  const order = await createOrder({
    customerName: booking.customerName,
    customerPhone: booking.customerPhone,
    deviceType: booking.deviceType,
    deviceBrandModel: "-",
    complaint: booking.complaint,
  });

  await db
    .update(bookings)
    .set({ status: "confirmed", linkedOrderId: order.id })
    .where(eq(bookings.id, bookingId));

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/orders");
  return order;
}
