import { listProductOrders, updateProductOrderStatus } from "@/lib/actions/products";
import { PRODUCT_ORDER_STATUS_LABEL } from "@/lib/constants";
import { productOrderStatusEnum } from "@/lib/db/schema";

export default async function AdminProductOrdersPage() {
  const orders = await listProductOrders();

  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">Order Toko</h1>

      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl border border-white/10 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{o.orderCode} — {o.customerName}</p>
                <p className="text-sm text-paper/70">{o.customerPhone}</p>
                <ul className="mt-2 text-sm text-paper/60">
                  {o.items.map((item, idx) => (
                    <li key={idx}>{item.qty}x {item.name} — Rp {(item.qty * item.price).toLocaleString("id-ID")}</li>
                  ))}
                </ul>
                <p className="mt-2 font-heading text-lg text-electric-light">
                  Total: Rp {o.total.toLocaleString("id-ID")}
                </p>
              </div>

              <form action={async (formData: FormData) => {
                "use server";
                await updateProductOrderStatus(o.id, formData.get("status") as (typeof productOrderStatusEnum)[number]);
              }} className="flex items-center gap-2">
                <select
                  name="status"
                  defaultValue={o.status}
                  className="rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
                >
                  {Object.entries(PRODUCT_ORDER_STATUS_LABEL).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <button className="rounded-full border border-electric px-3 py-2 text-xs font-semibold text-electric-light hover:bg-electric hover:text-ink">
                  Update
                </button>
              </form>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-paper/40">Belum ada order toko.</p>}
      </div>
    </div>
  );
}
