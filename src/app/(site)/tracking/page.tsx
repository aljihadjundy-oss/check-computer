import { getOrderByTrackingCode } from "@/lib/actions/orders";
import { TrackingTimeline } from "@/components/tracking-timeline";
import { waLink } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lacak Status Servis",
  description: "Cek progress servis laptop, PC, iPhone, atau MacBook kamu di Check Computer pakai kode tracking.",
};

export default async function TrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const result = code ? await getOrderByTrackingCode(code) : null;

  return (
    <div className="container-cc py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl tracking-wide md:text-5xl">
          Lacak Status <span className="text-neon">Servis</span>
        </h1>
        <p className="mt-3 text-paper/70">
          Masukin kode tracking dari struk servis kamu buat liat progress-nya, kayak lacak resi.
        </p>

        <form className="mt-8 flex flex-col gap-3 sm:flex-row" action="/tracking">
          <input
            name="code"
            defaultValue={code}
            placeholder="Contoh: CC-A1B2C3"
            required
            className="flex-1 rounded-full border border-white/15 bg-graphite/40 px-5 py-3 uppercase tracking-wide text-paper outline-none focus:border-electric"
          />
          <button
            type="submit"
            className="rounded-full bg-electric px-6 py-3 font-semibold text-ink transition hover:bg-electric-light"
          >
            Lacak
          </button>
        </form>
      </div>

      {code && (
        <div className="mx-auto mt-12 max-w-2xl">
          {result ? (
            <div className="rounded-2xl border border-white/10 bg-graphite/30 p-6 md:p-8">
              <div className="mb-6 flex flex-col justify-between gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs uppercase tracking-wide text-paper/50">Kode Tracking</p>
                  <p className="font-heading text-2xl text-neon">{result.order.trackingCode}</p>
                </div>
                <div className="text-sm text-paper/70">
                  <p>{result.order.deviceType} — {result.order.deviceBrandModel}</p>
                  {result.order.estimasiSelesai && (
                    <p className="text-paper/50">Estimasi selesai: {result.order.estimasiSelesai}</p>
                  )}
                </div>
              </div>

              <TrackingTimeline currentStatus={result.order.status} history={result.history} />

              {result.order.estimasiBiaya != null && (
                <div className="mt-6 rounded-xl bg-electric/10 p-4 text-sm">
                  <p className="text-paper/70">Estimasi biaya servis</p>
                  <p className="font-heading text-xl text-electric-light">
                    Rp {result.order.estimasiBiaya.toLocaleString("id-ID")}
                  </p>
                </div>
              )}

              <a
                href={waLink(`Halo Check Computer, saya mau tanya soal servis dengan kode tracking ${result.order.trackingCode}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-ink hover:bg-neon-dim"
              >
                Tanya via WhatsApp
              </a>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-graphite/30 p-8 text-center">
              <p className="font-heading text-xl">Kode tracking gak ketemu</p>
              <p className="mt-2 text-sm text-paper/60">
                Coba cek lagi kode tracking-nya, atau hubungi kami langsung via WhatsApp kalau masih bingung.
              </p>
              <a
                href={waLink("Halo Check Computer, saya mau tanya kode tracking servis saya")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-ink hover:bg-neon-dim"
              >
                Chat WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
