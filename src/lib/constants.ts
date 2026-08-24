export const SITE = {
  name: "Check Computer",
  tagline: "Service Puas, Harga Pas",
  description:
    "Servis laptop, PC, iPhone & MacBook di Ciputat, Tangerang Selatan. Terpercaya sejak 2015, 1000+ pengguna, rating 5,0 dari 92 ulasan Google Maps.",
  phoneDisplay: "0897-3958-236",
  phoneWa: "6289739958236",
  instagram: "@checkcomputer",
  instagramUrl: "https://instagram.com/checkcomputer",
  owner: "Bang Ibnu",
  address: "Jl. Semanggi II No.16b, Cemp. Putih, Kec. Ciputat Tim., Kota Tangerang Selatan, Banten 15412",
  addressShort: "Ciputat, Tangerang Selatan",
  hours: "Setiap hari, 09.00–21.00 WIB",
  rating: 5.0,
  reviewCount: 92,
  since: 2015,
  usersServed: "1000+",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Jl.+Semanggi+II+No.16b,+Cemp.+Putih,+Kec.+Ciputat+Tim.,+Kota+Tangerang+Selatan,+Banten+15412&output=embed",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jl.+Semanggi+II+No.16b+Cemp+Putih+Ciputat+Timur+Tangerang+Selatan",
};

export function waLink(message?: string) {
  const base = `https://wa.me/${SITE.phoneWa}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const DEVICE_TYPES = ["Laptop", "PC", "iPhone", "MacBook"] as const;

export const ORDER_STATUS_LABEL: Record<string, string> = {
  diterima: "Diterima",
  diagnosis: "Diagnosis",
  menunggu_konfirmasi: "Menunggu Konfirmasi Customer",
  dikerjakan: "Sedang Dikerjakan",
  quality_check: "Quality Check",
  selesai: "Siap Diambil / Selesai",
  dibatalkan: "Dibatalkan",
};

export const ORDER_STATUS_STEPS = [
  "diterima",
  "diagnosis",
  "menunggu_konfirmasi",
  "dikerjakan",
  "quality_check",
  "selesai",
] as const;

export const PRODUCT_CATEGORY_LABEL: Record<string, string> = {
  laptop: "Laptop",
  pc: "PC",
  aksesoris: "Aksesoris",
  rakit_pc: "Rakit PC Custom",
};

export const PRODUCT_ORDER_STATUS_LABEL: Record<string, string> = {
  menunggu_pembayaran: "Menunggu Pembayaran",
  dibayar: "Dibayar",
  dikirim: "Dikirim",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  pending: "Menunggu Konfirmasi",
  confirmed: "Dikonfirmasi",
  cancelled: "Dibatalkan",
};
