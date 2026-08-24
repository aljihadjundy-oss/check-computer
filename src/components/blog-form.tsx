import { ImageUploader } from "@/components/image-uploader";

type BlogFormValues = {
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  coverImage?: string | null;
  author?: string | null;
  isPublished?: boolean | null;
};

export function BlogForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: BlogFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div>
        <label className="mb-1 block text-sm text-paper/70">Judul</label>
        <input
          name="title"
          defaultValue={initial?.title ?? undefined}
          required
          className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-paper/70">Ringkasan Singkat (opsional)</label>
        <input
          name="excerpt"
          defaultValue={initial?.excerpt ?? undefined}
          className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-paper/70">Cover Image</label>
        <ImageUploader name="coverImage" initialImages={initial?.coverImage ? [initial.coverImage] : []} />
      </div>

      <div>
        <label className="mb-1 block text-sm text-paper/70">Konten (Markdown)</label>
        <textarea
          name="content"
          defaultValue={initial?.content ?? undefined}
          required
          rows={16}
          className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 font-mono text-sm outline-none focus:border-electric"
        />
        <p className="mt-1 text-xs text-paper/40">
          Pakai format Markdown: **bold**, *italic*, ## Heading, - list, dst.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm text-paper/70">Penulis</label>
        <input
          name="author"
          defaultValue={initial?.author || "Check Computer"}
          className="w-full rounded-lg border border-white/10 bg-graphite/40 px-3 py-2 text-sm outline-none focus:border-electric"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-paper/70">
        <input type="checkbox" name="isPublished" defaultChecked={initial?.isPublished ?? false} />
        Publish artikel ini
      </label>

      <button className="rounded-full bg-neon px-6 py-2.5 font-semibold text-ink hover:bg-neon-dim">
        {submitLabel}
      </button>
    </form>
  );
}
