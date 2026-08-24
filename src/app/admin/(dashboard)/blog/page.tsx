import Link from "next/link";
import { listAllPosts } from "@/lib/actions/blog";

export default async function AdminBlogPage() {
  const posts = await listAllPosts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-3xl">Blog</h1>
        <Link href="/admin/blog/new" className="rounded-full bg-neon px-4 py-2 text-sm font-semibold text-ink hover:bg-neon-dim">
          + Artikel Baru
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/admin/blog/${p.id}`}
            className="flex items-center justify-between rounded-xl border border-white/10 p-4 hover:border-electric"
          >
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-paper/40">
                {p.isPublished ? "Published" : "Draft"} · {new Date(p.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-paper/40">Belum ada artikel.</p>}
      </div>
    </div>
  );
}
