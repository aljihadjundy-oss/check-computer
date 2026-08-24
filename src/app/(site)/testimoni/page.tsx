import type { Metadata } from "next";
import { listPublishedTestimonials } from "@/lib/actions/testimonials";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Testimoni",
  description: `Kata pelanggan Check Computer, rating ${SITE.rating.toFixed(1)} dari ${SITE.reviewCount} ulasan Google Maps.`,
};

export default async function TestimoniPage() {
  const testimonials = await listPublishedTestimonials();

  return (
    <div className="container-cc py-16">
      <h1 className="font-heading text-4xl md:text-5xl">Testimoni Pelanggan</h1>
      <div className="mt-3 flex items-center gap-2 text-paper/70">
        <StarIcon className="text-neon" />
        <span className="font-semibold text-paper">{SITE.rating.toFixed(1)}</span>
        <span>dari {SITE.reviewCount} ulasan Google Maps</span>
      </div>

      {testimonials.length === 0 ? (
        <p className="mt-10 text-paper/50">Belum ada testimoni yang ditampilkan.</p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-xl border border-white/10 p-5">
              <div className="mb-2 flex gap-0.5 text-neon">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-sm text-paper/80">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-paper">{t.customerName}</p>
                {t.serviceType && <p className="text-xs text-paper/40">{t.serviceType}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
    </svg>
  );
}
