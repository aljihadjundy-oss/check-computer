import {
  listAllTestimonials,
  createTestimonial,
  toggleTestimonialPublished,
  deleteTestimonial,
} from "@/lib/actions/testimonials";

async function handleCreate(formData: FormData) {
  "use server";
  await createTestimonial({
    customerName: String(formData.get("customerName")),
    rating: Number(formData.get("rating")) || 5,
    content: String(formData.get("content")),
    serviceType: String(formData.get("serviceType") || "") || undefined,
  });
}

export default async function AdminTestimonialsPage() {
  const testimonials = await listAllTestimonials();

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 font-heading text-3xl">Testimoni</h1>

      <form action={handleCreate} className="mb-8 space-y-3 rounded-xl border border-white/10 p-5">
        <p className="font-semibold">Tambah Testimoni</p>
        <input
          name="customerName"
          placeholder="Nama customer"
          required
          className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
        />
        <div className="grid grid-cols-2 gap-3">
          <select
            name="rating"
            defaultValue={5}
            className="rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} bintang</option>
            ))}
          </select>
          <input
            name="serviceType"
            placeholder="Jenis servis (opsional)"
            className="rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
          />
        </div>
        <textarea
          name="content"
          placeholder="Isi testimoni"
          required
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
        />
        <button className="rounded-full bg-neon px-4 py-2 text-sm font-semibold text-ink hover:bg-neon-dim">
          Tambah
        </button>
      </form>

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4">
            <div>
              <p className="font-semibold">{t.customerName} — {t.rating}★</p>
              <p className="text-sm text-paper/70">{t.content}</p>
              <p className="mt-1 text-xs text-paper/40">{t.isPublished ? "Tampil di web" : "Disembunyikan"}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <form action={async () => {
                "use server";
                await toggleTestimonialPublished(t.id, !t.isPublished);
              }}>
                <button className="rounded-full border border-white/15 px-3 py-1 text-xs hover:border-electric">
                  {t.isPublished ? "Sembunyikan" : "Tampilkan"}
                </button>
              </form>
              <form action={async () => {
                "use server";
                await deleteTestimonial(t.id);
              }}>
                <button className="rounded-full border border-white/15 px-3 py-1 text-xs text-red-400 hover:border-red-400">
                  Hapus
                </button>
              </form>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-paper/40">Belum ada testimoni.</p>}
      </div>
    </div>
  );
}
