import Link from "next/link";
import { listBookings, updateBookingStatus, convertBookingToOrder } from "@/lib/actions/bookings";
import { BOOKING_STATUS_LABEL } from "@/lib/constants";

export default async function AdminBookingsPage() {
  const bookings = await listBookings();

  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">Booking</h1>

      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b.id} className="rounded-xl border border-white/10 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{b.customerName} — {b.customerPhone}</p>
                <p className="text-sm text-paper/70">{b.deviceType}: {b.complaint}</p>
                <p className="text-xs text-paper/50">
                  Preferensi: {b.preferredDate} jam {b.preferredTime}
                </p>
                <p className="mt-1 text-xs text-neon">{BOOKING_STATUS_LABEL[b.status]}</p>
                {b.linkedOrderId && (
                  <Link href={`/admin/orders/${b.linkedOrderId}`} className="text-xs text-electric-light hover:underline">
                    Lihat order terkait →
                  </Link>
                )}
              </div>

              {b.status === "pending" && (
                <div className="flex gap-2">
                  <form action={async () => {
                    "use server";
                    await convertBookingToOrder(b.id);
                  }}>
                    <button className="rounded-full bg-neon px-3 py-1.5 text-xs font-semibold text-ink hover:bg-neon-dim">
                      Konfirmasi & Buat Order
                    </button>
                  </form>
                  <form action={async () => {
                    "use server";
                    await updateBookingStatus(b.id, "cancelled");
                  }}>
                    <button className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-red-400 hover:border-red-400">
                      Batalkan
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-paper/40">Belum ada booking.</p>}
      </div>
    </div>
  );
}
