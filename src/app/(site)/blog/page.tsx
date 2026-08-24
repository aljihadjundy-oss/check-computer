import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listPublishedPosts } from "@/lib/actions/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips & edukasi seputar perawatan laptop, PC, iPhone, dan MacBook dari Check Computer.",
};

export default async function BlogPage() {
  const posts = await listPublishedPosts();

  return (
    <div className="container-cc py-16">
      <h1 className="font-heading text-4xl md:text-5xl">Blog</h1>
      <p className="mt-3 max-w-xl text-paper/70">Tips & edukasi seputar perangkat kamu.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/10 transition hover:border-electric"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-graphite/40">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-paper/20">Check Computer</div>
              )}
            </div>
            <div className="flex-1 p-5">
              <p className="text-xs text-paper/40">
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
              </p>
              <h2 className="mt-1 font-heading text-xl tracking-wide">{post.title}</h2>
              {post.excerpt && <p className="mt-2 text-sm text-paper/70">{post.excerpt}</p>}
            </div>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-paper/40">Belum ada artikel.</p>}
      </div>
    </div>
  );
}
