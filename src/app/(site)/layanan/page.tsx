import type { Metadata } from "next";
import Link from "next/link";
import { DEVICE_TYPES, waLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Layanan",
  description: "Servis laptop, PC, iPhone & MacBook, jual-beli unit bekas/baru, dan rakit PC custom di Ciputat.",
};

export default function LayananPage() {
  return (
    <div className="container-cc py-16">
      <h1 className="font-heading text-4xl md:text-5xl">Layanan Kami</h1>
      <p className="mt-3 max-w-xl text-paper/70">
        Tiga layanan utama yang kami tawarkan, dari servis sampai bangun PC dari nol.
      </p>

      <div className="mt-12 space-y-14">
        <section id="servis" className="scroll-mt-24">
          <h2 className="font-heading text-3xl text-neon">01. Servis Laptop, PC, iPhone & MacBook</h2>
          <p className="mt-3 max-w-2xl text-paper/75">
            Kami tangani {DEVICE_TYPES.join(", ")} — dari masalah ringan (baterai boros, layar
            rusak, overheat) sampai berat (motherboard, data recovery). Prinsip kami: diagnosis
            dulu, kasih tau estimasi biaya, baru dikerjain setelah kamu setuju. Progress servis
            bisa kamu lacak sendiri lewat kode tracking.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/booking" className="rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-ink hover:bg-neon-dim">
              Booking Servis
            </Link>
            <Link href="/tracking" className="rounded-full border border-electric px-5 py-2.5 text-sm font-semibold text-electric-light hover:bg-electric hover:text-ink">
              Lacak Servis
            </Link>
          </div>
        </section>

        <section id="jual-beli" className="scroll-mt-24">
          <h2 className="font-heading text-3xl text-neon">02. Jual-Beli Laptop/PC</h2>
          <p className="mt-3 max-w-2xl text-paper/75">
            Cari laptop/PC bekas berkualitas dengan harga ramah kantong mahasiswa, atau unit baru
            dengan garansi resmi. Kami juga terima jual/tukar tambah unit lama kamu.
          </p>
          <Link href="/toko" className="mt-5 inline-block rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-ink hover:bg-neon-dim">
            Lihat Toko Online
          </Link>
        </section>

        <section id="rakit" className="scroll-mt-24">
          <h2 className="font-heading text-3xl text-neon">03. Rakit PC Custom</h2>
          <p className="mt-3 max-w-2xl text-paper/75">
            Mau rakit PC sesuai budget & kebutuhan — buat kuliah, kerja, atau gaming? Konsultasi
            gratis soal spek yang paling pas buat kamu sebelum belanja komponen.
          </p>
          <a
            href={waLink("Halo Check Computer, saya mau konsultasi rakit PC custom")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full border border-electric px-5 py-2.5 text-sm font-semibold text-electric-light hover:bg-electric hover:text-ink"
          >
            Konsultasi via WhatsApp
          </a>
        </section>
      </div>
    </div>
  );
}
