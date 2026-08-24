import Link from "next/link";
import { getDb } from "@/lib/db";

export default async function AdminDashboardPage() {
  const db = await getDb();
  const [orders, bookings, products, productOrders, blogPosts] = await Promise.all([
    db.query.orders.findMany(),
    db.query.bookings.findMany(),
    db.query.products.findMany(),
    db.query.productOrders.findMany(),
    db.query.blogPosts.findMany(),
  ]);

  const activeOrders = orders.filter((o) => !["selesai", "dibatalkan"].includes(o.status));
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const pendingPayments = productOrders.filter((p) => p.status === "menunggu_pembayaran");

  const cards = [
    { label: "Servis Aktif", value: activeOrders.length, href: "/admin/orders", total: orders.length },
    { label: "Booking Pending", value: pendingBookings.length, href: "/admin/bookings", total: bookings.length },
    { label: "Produk Aktif", value: products.filter((p) => p.isActive).length, href: "/admin/products", total: products.length },
    { label: "Order Toko Pending", value: pendingPayments.length, href: "/admin/product-orders", total: productOrders.length },
    { label: "Artikel Blog", value: blogPosts.filter((b) => b.isPublished).length, href: "/admin/blog", total: blogPosts.length },
  ];

  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-xl border border-white/10 p-5 transition hover:border-electric"
          >
            <p className="text-sm text-paper/60">{c.label}</p>
            <p className="mt-1 font-heading text-4xl text-neon">{c.value}</p>
            <p className="text-xs text-paper/40">dari {c.total} total</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
