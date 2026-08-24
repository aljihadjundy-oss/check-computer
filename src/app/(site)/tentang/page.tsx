import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Cerita Check Computer, servis laptop & PC di Ciputat sejak ${SITE.since}, dipercaya ${SITE.usersServed} pengguna.`,
};

export default function TentangPage() {
  return (
    <div className="container-cc py-16">
      <h1 className="font-heading text-4xl md:text-5xl">
        Tentang <span className="text-neon">Check Computer</span>
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 text-paper/80">
          <p>
            Check Computer berdiri sejak tahun {SITE.since} di Ciputat, Tangerang Selatan. Berawal
            dari kepedulian sama masalah klasik: servis komputer yang mahal, gak transparan, dan
            bikin was-was — Check Computer hadir dengan prinsip sederhana: <strong className="text-paper">konsultasi dulu, baru fix harga.</strong>
          </p>
          <p>
            Di bawah kendali langsung {SITE.owner}, kami udah dipercaya lebih dari {SITE.usersServed}{" "}
            pengguna, dengan rating {SITE.rating.toFixed(1)} dari {SITE.reviewCount} ulasan di Google
            Maps. Sebagian besar pelanggan kami adalah mahasiswa — jadi kami paham betul soal harga
            yang harus tetep terjangkau tanpa ngorbanin kualitas kerja.
          </p>
          <p>
            Selain servis, Check Computer juga jadi tempat jual-beli laptop/PC bekas & baru,
            sampai rakit PC custom sesuai budget dan kebutuhan kamu — dari buat ngerjain tugas
            kuliah sampai gaming berat.
          </p>
          <blockquote className="border-l-2 border-neon pl-4 font-heading text-2xl tracking-wide text-neon">
            &ldquo;{SITE.tagline}&rdquo;
          </blockquote>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm text-paper/50">Owner</p>
            <p className="font-heading text-2xl">{SITE.owner}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm text-paper/50">Berdiri Sejak</p>
            <p className="font-heading text-2xl">{SITE.since}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm text-paper/50">Rating Google Maps</p>
            <p className="font-heading text-2xl text-neon">{SITE.rating.toFixed(1)} / 5.0</p>
            <p className="text-xs text-paper/50">{SITE.reviewCount} ulasan</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm text-paper/50">Instagram</p>
            <p className="font-heading text-2xl text-electric-light">{SITE.instagram}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
