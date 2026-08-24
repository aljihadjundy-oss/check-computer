import Link from "next/link";
import { listOrders } from "@/lib/actions/orders";
import { ORDER_STATUS_LABEL } from "@/lib/constants";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const all = await listOrders();
  const filtered = status ? all.filter((o) => o.status === status) : all;

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="font-heading text-3xl">Tracking Servis</h1>
        <Link
          href="/admin/orders/new"
          className="rounded-full bg-neon px-4 py-2 text-sm font-semibold text-ink hover:bg-neon-dim"
        >
          + Order Baru
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <Link
          href="/admin/orders"
          className={`rounded-full px-3 py-1 ${!status ? "bg-electric text-ink" : "bg-white/5 text-paper/70"}`}
        >
          Semua
        </Link>
        {Object.entries(ORDER_STATUS_LABEL).map(([key, label]) => (
          <Link
            key={key}
            href={`/admin/orders?status=${key}`}
            className={`rounded-full px-3 py-1 ${status === key ? "bg-electric text-ink" : "bg-white/5 text-paper/70"}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-paper/60">
            <tr>
              <th className="px-4 py-3">Kode</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Perangkat</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="font-semibold text-electric-light">
                    {o.trackingCode}
                  </Link>
                </td>
                <td className="px-4 py-3">{o.customerName}</td>
                <td className="px-4 py-3">{o.deviceType} — {o.deviceBrandModel}</td>
                <td className="px-4 py-3">{ORDER_STATUS_LABEL[o.status]}</td>
                <td className="px-4 py-3 text-paper/50">
                  {new Date(o.createdAt).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-paper/40">
                  Belum ada order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
