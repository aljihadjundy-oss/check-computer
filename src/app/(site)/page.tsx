import Link from "next/link";
import { SITE, waLink } from "@/lib/constants";
import { listPublishedTestimonials } from "@/lib/actions/testimonials";

export default async function HomePage() {
  const testimonials = (await listPublishedTestimonials()).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-electric/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-neon/10 blur-3xl" />
        <div className="container-cc relative py-20 md:py-28">
          <p className="mb-3 inline-block rounded-full border border-neon/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neon">
            Servis Terpercaya Sejak {SITE.since} · Ciputat
          </p>
          <h1 className="max-w-2xl font-heading text-5xl leading-tight tracking-wide md:text-7xl">
            <span className="text-gradient-brand">Service Puas,</span>
            <br />
            Harga Pas.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-paper/70">
            Servis laptop, PC, iPhone & MacBook. Jual-beli unit bekas/baru. Rakit PC custom.
            Dipercaya {SITE.usersServed} pengguna di Ciputat & sekitarnya.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tracking"
              className="rounded-full border border-electric px-6 py-3 text-center font-semibold text-electric-light hover:bg-electric hover:text-ink"
            >
              Lacak Status Servis
            </Link>
            <Link
              href="/booking"
              className="rounded-full bg-neon px-6 py-3 text-center font-semibold text-ink hover:bg-neon-dim"
            >
              Booking Servis Sekarang
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-paper/70">
            <div className="flex items-center gap-1.5">
              <StarIcon />
              <span className="font-semibold text-paper">{SITE.rating.toFixed(1)}</span>
              <span>({SITE.reviewCount} ulasan Google Maps)</span>
            </div>
            <div>{SITE.usersServed} pengguna terlayani</div>
            <div>{SITE.addressShort}</div>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section className="container-cc py-20">
        <h2 className="font-heading text-3xl md:text-4xl">Layanan Kami</h2>
        <p className="mt-2 max-w-xl text-paper/70">Tiga layanan utama buat semua kebutuhan komputer & gadget kamu.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <ServiceCard
            title="Servis Laptop, PC, iPhone & MacBook"
            desc="Diagnosis jujur, konsultasi dulu sebelum fix harga. Progress bisa dilacak online."
            cta="Booking Servis"
            href="/booking"
          />
          <ServiceCard
            title="Jual-Beli Laptop/PC"
            desc="Unit bekas berkualitas & baru, harga bersahabat buat mahasiswa."
            cta="Lihat Toko"
            href="/toko"
          />
          <ServiceCard
            title="Rakit PC Custom"
            desc="Rakit PC sesuai budget & kebutuhan, dari gaming sampai kerja berat."
            cta="Konsultasi Rakit PC"
            href="/toko"
          />
        </div>
      </section>

      {/* Testimoni preview */}
      {testimonials.length > 0 && (
        <section className="border-t border-white/10 bg-graphite/20 py-20">
          <div className="container-cc">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl md:text-4xl">Kata Mereka</h2>
              <Link href="/testimoni" className="text-sm text-electric-light hover:underline">
                Lihat semua →
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-xl border border-white/10 p-5">
                  <div className="mb-2 flex gap-0.5 text-neon">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="text-sm text-paper/80">&ldquo;{t.content}&rdquo;</p>
                  <p className="mt-3 text-sm font-semibold text-paper">{t.customerName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="container-cc py-20 text-center">
        <h2 className="font-heading text-3xl md:text-4xl">Perangkat Bermasalah?</h2>
        <p className="mx-auto mt-2 max-w-md text-paper/70">
          Chat langsung sama Bang Ibnu buat konsultasi gratis sebelum servis.
        </p>
        <a
          href={waLink("Halo Check Computer, saya mau konsultasi soal perangkat saya")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-neon px-8 py-3 font-semibold text-ink hover:bg-neon-dim"
        >
          Chat WhatsApp Sekarang
        </a>
      </section>
    </div>
  );
}

function ServiceCard({
  title,
  desc,
  cta,
  href,
}: {
  title: string;
  desc: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 p-6 transition hover:border-electric">
      <h3 className="font-heading text-xl tracking-wide">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-paper/70">{desc}</p>
      <Link href={href} className="mt-4 text-sm font-semibold text-neon hover:underline">
        {cta} →
      </Link>
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
