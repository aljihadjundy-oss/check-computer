import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/actions/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? post.content.slice(0, 155),
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.isPublished) notFound();

  return (
    <article className="container-cc max-w-2xl py-16">
      <p className="text-xs text-paper/40">
        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
        {" · "}{post.author}
      </p>
      <h1 className="mt-2 font-heading text-4xl leading-tight md:text-5xl">{post.title}</h1>

      {post.coverImage && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <div className="prose prose-invert mt-8 max-w-none prose-headings:font-heading prose-a:text-neon">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
