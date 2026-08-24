import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// --- Admin ---
export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});

// --- Tracking servis ---
export const orderStatusEnum = [
  "diterima",
  "diagnosis",
  "menunggu_konfirmasi",
  "dikerjakan",
  "quality_check",
  "selesai",
  "dibatalkan",
] as const;
export type OrderStatus = (typeof orderStatusEnum)[number];

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  trackingCode: text("tracking_code").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  deviceType: text("device_type").notNull(), // laptop/pc/iphone/macbook
  deviceBrandModel: text("device_brand_model").notNull(),
  complaint: text("complaint").notNull(),
  status: text("status").$type<OrderStatus>().notNull().default("diterima"),
  estimasiSelesai: text("estimasi_selesai"),
  estimasiBiaya: real("estimasi_biaya"),
  biayaFinal: real("biaya_final"),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").notNull().default(sql`(current_timestamp)`),
});

export const orderStatusHistory = sqliteTable("order_status_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  status: text("status").$type<OrderStatus>().notNull(),
  note: text("note"),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});

// --- Booking ---
export const bookingStatusEnum = ["pending", "confirmed", "cancelled"] as const;
export type BookingStatus = (typeof bookingStatusEnum)[number];

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  deviceType: text("device_type").notNull(),
  complaint: text("complaint").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  status: text("status").$type<BookingStatus>().notNull().default("pending"),
  linkedOrderId: integer("linked_order_id").references(() => orders.id),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});

// --- Toko online ---
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // laptop/pc/aksesoris/rakit_pc
  price: real("price").notNull(),
  condition: text("condition").notNull(), // baru/bekas
  stock: integer("stock").notNull().default(0),
  description: text("description").notNull().default(""),
  images: text("images", { mode: "json" }).$type<string[]>().notNull().default([]),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});

export const productOrderStatusEnum = [
  "menunggu_pembayaran",
  "dibayar",
  "dikirim",
  "selesai",
  "dibatalkan",
] as const;
export type ProductOrderStatus = (typeof productOrderStatusEnum)[number];

export type ProductOrderItem = { productId: number; name: string; qty: number; price: number };

export const productOrders = sqliteTable("product_orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderCode: text("order_code").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address"),
  items: text("items", { mode: "json" }).$type<ProductOrderItem[]>().notNull(),
  total: real("total").notNull(),
  status: text("status").$type<ProductOrderStatus>().notNull().default("menunggu_pembayaran"),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});

// --- Testimoni ---
export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull().default(5),
  content: text("content").notNull(),
  serviceType: text("service_type"),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});

// --- Blog ---
export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  coverImage: text("cover_image"),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  author: text("author").notNull().default("Check Computer"),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull().default(sql`(current_timestamp)`),
});
