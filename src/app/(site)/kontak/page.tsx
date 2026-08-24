import type { Metadata } from "next";
import { SITE, waLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontak & Lokasi",
  description: `Kunjungi Check Computer di ${SITE.address}. Buka ${SITE.hours}.`,
};

export default function KontakPage() {
  return (
    <div className="container-cc py-16">
      <h1 className="font-heading text-4xl md:text-5xl">Kontak & Lokasi</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <InfoBlock label="Alamat">
            <p>{SITE.address}</p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm text-electric-light hover:underline"
            >
              Buka di Google Maps →
            </a>
          </InfoBlock>

          <InfoBlock label="Jam Operasional">
            <p>{SITE.hours}</p>
          </InfoBlock>

          <InfoBlock label="WhatsApp">
            <p>{SITE.phoneDisplay}</p>
          </InfoBlock>

          <InfoBlock label="Instagram">
            <p>{SITE.instagram}</p>
          </InfoBlock>

          <a
            href={waLink("Halo Check Computer, saya mau tanya-tanya")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-neon px-6 py-3 font-semibold text-ink hover:bg-neon-dim"
          >
            Chat WhatsApp Sekarang
          </a>
        </div>

        <div className="h-80 overflow-hidden rounded-2xl border border-white/10 lg:h-auto">
          <iframe
            src={SITE.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Check Computer"
          />
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-neon">{label}</p>
      <div className="mt-1 text-paper/80">{children}</div>
    </div>
  );
}
