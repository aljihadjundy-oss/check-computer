import Link from "next/link";
import { SITE, waLink } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink">
      <div className="container-cc grid gap-10 py-14 lg:grid-cols-4">
        <div>
          <p className="font-heading text-2xl text-paper">
            CHECK<span className="text-neon">.</span>COMPUTER
          </p>
          <p className="mt-3 max-w-xs text-sm text-paper/60">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-electric-light">{SITE.instagram}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neon">Layanan</p>
          <ul className="space-y-2 text-sm text-paper/70">
            <li><Link href="/layanan#servis" className="hover:text-neon">Servis Laptop, PC, iPhone & MacBook</Link></li>
            <li><Link href="/toko" className="hover:text-neon">Jual-Beli Laptop/PC</Link></li>
            <li><Link href="/layanan#rakit" className="hover:text-neon">Rakit PC Custom</Link></li>
            <li><Link href="/tracking" className="hover:text-neon">Lacak Status Servis</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neon">Navigasi</p>
          <ul className="space-y-2 text-sm text-paper/70">
            <li><Link href="/tentang" className="hover:text-neon">Tentang Kami</Link></li>
            <li><Link href="/blog" className="hover:text-neon">Blog</Link></li>
            <li><Link href="/testimoni" className="hover:text-neon">Testimoni</Link></li>
            <li><Link href="/booking" className="hover:text-neon">Booking Servis</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-neon">Kontak & Lokasi</p>
          <p className="text-sm text-paper/70">{SITE.address}</p>
          <p className="mt-2 text-sm text-paper/70">{SITE.hours}</p>
          <a
            href={waLink("Halo Check Computer, saya mau tanya-tanya")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-neon px-4 py-2 text-sm font-semibold text-ink hover:bg-neon-dim"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-cc text-center text-xs text-paper/50">
          © {new Date().getFullYear()} Check Computer — Ciputat, Tangerang Selatan. Servis Puas, Harga Pas.
        </p>
      </div>
    </footer>
  );
}
