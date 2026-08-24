import { redirect } from "next/navigation";
import { createOrder } from "@/lib/actions/orders";
import { DEVICE_TYPES } from "@/lib/constants";

async function handleCreate(formData: FormData) {
  "use server";
  const order = await createOrder({
    customerName: String(formData.get("customerName")),
    customerPhone: String(formData.get("customerPhone")),
    deviceType: String(formData.get("deviceType")),
    deviceBrandModel: String(formData.get("deviceBrandModel")),
    complaint: String(formData.get("complaint")),
    estimasiSelesai: String(formData.get("estimasiSelesai") || "") || undefined,
    estimasiBiaya: formData.get("estimasiBiaya")
      ? Number(formData.get("estimasiBiaya"))
      : undefined,
  });
  redirect(`/admin/orders/${order.id}`);
}

export default function NewOrderPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 font-heading text-3xl">Order Servis Baru</h1>
      <form action={handleCreate} className="space-y-4">
        <Field label="Nama Customer" name="customerName" required />
        <Field label="No HP" name="customerPhone" required />
        <div>
          <label className="mb-1 block text-sm text-paper/70">Jenis Perangkat</label>
          <select
            name="deviceType"
            required
            className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-paper outline-none focus:border-electric"
          >
            {DEVICE_TYPES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <Field label="Merk & Model" name="deviceBrandModel" required placeholder="cth: Asus Vivobook A416" />
        <div>
          <label className="mb-1 block text-sm text-paper/70">Keluhan</label>
          <textarea
            name="complaint"
            required
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-paper outline-none focus:border-electric"
          />
        </div>
        <Field label="Estimasi Selesai (opsional)" name="estimasiSelesai" placeholder="cth: 3 hari kerja" />
        <Field label="Estimasi Biaya (opsional)" name="estimasiBiaya" type="number" />
        <button className="rounded-full bg-neon px-6 py-2.5 font-semibold text-ink hover:bg-neon-dim">
          Buat Order
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-paper/70">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-paper outline-none focus:border-electric"
      />
    </div>
  );
}
