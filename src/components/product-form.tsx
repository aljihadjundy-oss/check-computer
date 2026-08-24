import { ImageUploader } from "@/components/image-uploader";
import { PRODUCT_CATEGORY_LABEL } from "@/lib/constants";

type ProductFormValues = {
  name?: string;
  category?: string;
  price?: number;
  condition?: string;
  stock?: number;
  description?: string;
  images?: string[];
  isActive?: boolean;
};

export function ProductForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: ProductFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-xl space-y-4">
      <div>
        <label className="mb-1 block text-sm text-paper/70">Nama Produk</label>
        <input
          name="name"
          defaultValue={initial?.name}
          required
          className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-paper/70">Kategori</label>
          <select
            name="category"
            defaultValue={initial?.category ?? "laptop"}
            className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
          >
            {Object.entries(PRODUCT_CATEGORY_LABEL).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-paper/70">Kondisi</label>
          <select
            name="condition"
            defaultValue={initial?.condition ?? "bekas"}
            className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
          >
            <option value="baru">Baru</option>
            <option value="bekas">Bekas</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-paper/70">Harga (Rp)</label>
          <input
            name="price"
            type="number"
            defaultValue={initial?.price}
            required
            className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-paper/70">Stok</label>
          <input
            name="stock"
            type="number"
            defaultValue={initial?.stock ?? 1}
            required
            className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-paper/70">Deskripsi / Spesifikasi</label>
        <textarea
          name="description"
          defaultValue={initial?.description}
          rows={5}
          className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-paper/70">Foto Produk</label>
        <ImageUploader name="images" initialImages={initial?.images ?? []} />
      </div>

      {initial?.isActive !== undefined && (
        <label className="flex items-center gap-2 text-sm text-paper/70">
          <input type="checkbox" name="isActive" defaultChecked={initial.isActive} />
          Tampilkan di toko
        </label>
      )}

      <button className="rounded-full bg-neon px-6 py-2.5 font-semibold text-ink hover:bg-neon-dim">
        {submitLabel}
      </button>
    </form>
  );
}
