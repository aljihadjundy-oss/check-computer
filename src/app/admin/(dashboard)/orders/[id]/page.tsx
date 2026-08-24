import { notFound } from "next/navigation";
import { getOrderById, updateOrderStatus, updateOrderEstimate } from "@/lib/actions/orders";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { orderStatusEnum } from "@/lib/db/schema";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getOrderById(Number(id));
  if (!data) notFound();
  const { order, history } = data;

  async function handleStatusUpdate(formData: FormData) {
    "use server";
    await updateOrderStatus(
      order.id,
      formData.get("status") as (typeof orderStatusEnum)[number],
      String(formData.get("note") || "") || undefined
    );
  }

  async function handleEstimateUpdate(formData: FormData) {
    "use server";
    await updateOrderEstimate(order.id, {
      estimasiSelesai: String(formData.get("estimasiSelesai") || "") || undefined,
      estimasiBiaya: formData.get("estimasiBiaya") ? Number(formData.get("estimasiBiaya")) : undefined,
      biayaFinal: formData.get("biayaFinal") ? Number(formData.get("biayaFinal")) : undefined,
    });
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-paper/50">Kode Tracking</p>
        <h1 className="font-heading text-3xl text-neon">{order.trackingCode}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-white/10 p-5">
          <h2 className="mb-3 font-semibold">Info Customer</h2>
          <dl className="space-y-1 text-sm">
            <Row label="Nama" value={order.customerName} />
            <Row label="No HP" value={order.customerPhone} />
            <Row label="Perangkat" value={`${order.deviceType} — ${order.deviceBrandModel}`} />
            <Row label="Keluhan" value={order.complaint} />
          </dl>
        </section>

        <section className="rounded-xl border border-white/10 p-5">
          <h2 className="mb-3 font-semibold">Update Status</h2>
          <form action={handleStatusUpdate} className="space-y-3">
            <select
              name="status"
              defaultValue={order.status}
              className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
            >
              {Object.entries(ORDER_STATUS_LABEL).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <textarea
              name="note"
              placeholder="Catatan (opsional)"
              rows={2}
              className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
            />
            <button className="rounded-full bg-electric px-4 py-2 text-sm font-semibold text-ink hover:bg-electric-light">
              Update Status
            </button>
          </form>
        </section>

        <section className="rounded-xl border border-white/10 p-5 md:col-span-2">
          <h2 className="mb-3 font-semibold">Estimasi & Biaya</h2>
          <form action={handleEstimateUpdate} className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs text-paper/60">Estimasi Selesai</label>
              <input
                name="estimasiSelesai"
                defaultValue={order.estimasiSelesai ?? ""}
                placeholder="cth: 3 hari kerja"
                className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-paper/60">Estimasi Biaya (Rp)</label>
              <input
                name="estimasiBiaya"
                type="number"
                defaultValue={order.estimasiBiaya ?? ""}
                className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-paper/60">Biaya Final (Rp)</label>
              <input
                name="biayaFinal"
                type="number"
                defaultValue={order.biayaFinal ?? ""}
                className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
              />
            </div>
            <button className="rounded-full border border-electric px-4 py-2 text-sm font-semibold text-electric-light hover:bg-electric hover:text-ink sm:col-span-3 sm:w-fit">
              Simpan
            </button>
          </form>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-white/10 p-5">
        <h2 className="mb-4 font-semibold">Riwayat Status</h2>
        <ul className="space-y-3 text-sm">
          {history.map((h) => (
            <li key={h.id} className="border-b border-white/5 pb-3 last:border-0">
              <p className="font-medium">{ORDER_STATUS_LABEL[h.status]}</p>
              <p className="text-xs text-paper/50">
                {new Date(h.createdAt).toLocaleString("id-ID")}
              </p>
              {h.note && <p className="mt-1 text-paper/70">{h.note}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-paper/50">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
