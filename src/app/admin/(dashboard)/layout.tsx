import Link from "next/link";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Tracking Servis" },
  { href: "/admin/bookings", label: "Booking" },
  { href: "/admin/products", label: "Produk Toko" },
  { href: "/admin/product-orders", label: "Order Toko" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimoni" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink text-paper">
      <aside className="hidden w-60 flex-col border-r border-white/10 p-5 md:flex">
        <p className="font-heading text-xl">
          CHECK<span className="text-neon">.</span>COMPUTER
        </p>
        <p className="mb-8 text-xs text-paper/50">Admin Dashboard</p>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-paper/75 hover:bg-white/5 hover:text-neon"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action="/api/admin/logout" method="POST">
          <button className="w-full rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-paper/60 hover:text-red-400">
            Keluar
          </button>
        </form>
      </aside>

      <div className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:hidden">
          <p className="font-heading text-lg">CHECK.COMPUTER Admin</p>
          <form action="/api/admin/logout" method="POST">
            <button className="text-sm text-paper/60">Keluar</button>
          </form>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}
