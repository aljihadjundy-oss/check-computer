import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createBooking } from "@/lib/actions/bookings";
import { DEVICE_TYPES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Booking Servis",
  description: "Booking servis laptop, PC, iPhone, atau MacBook kamu secara online di Check Computer Ciputat.",
};

async function handleBooking(formData: FormData) {
  "use server";
  await createBooking({
    customerName: String(formData.get("customerName")),
    customerPhone: String(formData.get("customerPhone")),
    deviceType: String(formData.get("deviceType")),
    complaint: String(formData.get("complaint")),
    preferredDate: String(formData.get("preferredDate")),
    preferredTime: String(formData.get("preferredTime")),
  });
  redirect("/booking?sukses=1");
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ sukses?: string }>;
}) {
  const { sukses } = await searchParams;

  return (
    <div className="container-cc py-16">
      <div className="mx-auto max-w-lg">
        <h1 className="font-heading text-4xl md:text-5xl">
          Booking <span className="text-neon">Servis</span>
        </h1>
        <p className="mt-3 text-paper/70">
          Isi form di bawah, nanti tim kami hubungi buat konfirmasi jadwal.
        </p>

        {sukses && (
          <div className="mt-6 rounded-xl border border-neon/30 bg-neon/10 p-4 text-sm text-neon">
            Booking berhasil dikirim! Kami akan hubungi kamu via WhatsApp buat konfirmasi jadwal.
          </div>
        )}

        <form action={handleBooking} className="mt-8 space-y-4">
          <Field label="Nama Lengkap" name="customerName" required />
          <Field label="No HP / WhatsApp" name="customerPhone" required />
          <div>
            <label className="mb-1 block text-sm text-paper/70">Jenis Perangkat</label>
            <select
              name="deviceType"
              required
              className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2.5 text-paper outline-none focus:border-electric"
            >
              {DEVICE_TYPES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-paper/70">Keluhan Singkat</label>
            <textarea
              name="complaint"
              required
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2.5 text-paper outline-none focus:border-electric"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tanggal Preferensi" name="preferredDate" type="date" required />
            <Field label="Jam Preferensi" name="preferredTime" type="time" required />
          </div>
          <button className="w-full rounded-full bg-neon py-3 font-semibold text-ink hover:bg-neon-dim">
            Kirim Booking
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-paper/70">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2.5 text-paper outline-none focus:border-electric"
      />
    </div>
  );
}
