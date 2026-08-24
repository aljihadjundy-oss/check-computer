import { redirect } from "next/navigation";
import { createPost } from "@/lib/actions/blog";
import { BlogForm } from "@/components/blog-form";

function firstImage(raw: FormDataEntryValue | null): string | undefined {
  try {
    const arr = JSON.parse(String(raw || "[]"));
    return arr[0];
  } catch {
    return undefined;
  }
}

async function handleCreate(formData: FormData) {
  "use server";
  await createPost({
    title: String(formData.get("title")),
    excerpt: String(formData.get("excerpt") || "") || undefined,
    content: String(formData.get("content")),
    coverImage: firstImage(formData.get("coverImage")),
    author: String(formData.get("author") || "") || undefined,
    isPublished: formData.get("isPublished") === "on",
  });
  redirect("/admin/blog");
}

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">Artikel Baru</h1>
      <BlogForm action={handleCreate} submitLabel="Simpan Artikel" />
    </div>
  );
}
