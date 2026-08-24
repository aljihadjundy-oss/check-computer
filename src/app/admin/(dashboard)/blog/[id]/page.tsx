import { notFound, redirect } from "next/navigation";
import { getPostById, updatePost, deletePost } from "@/lib/actions/blog";
import { BlogForm } from "@/components/blog-form";

function firstImage(raw: FormDataEntryValue | null): string | undefined {
  try {
    const arr = JSON.parse(String(raw || "[]"));
    return arr[0];
  } catch {
    return undefined;
  }
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updatePost(post!.id, {
      title: String(formData.get("title")),
      excerpt: String(formData.get("excerpt") || "") || undefined,
      content: String(formData.get("content")),
      coverImage: firstImage(formData.get("coverImage")),
      author: String(formData.get("author") || "") || undefined,
      isPublished: formData.get("isPublished") === "on",
    });
    redirect("/admin/blog");
  }

  async function handleDelete() {
    "use server";
    await deletePost(post!.id);
    redirect("/admin/blog");
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-3xl">Edit Artikel</h1>
        <form action={handleDelete}>
          <button className="rounded-full border border-white/15 px-4 py-2 text-sm text-red-400 hover:border-red-400">
            Hapus Artikel
          </button>
        </form>
      </div>
      <BlogForm action={handleUpdate} initial={post} submitLabel="Simpan Perubahan" />
    </div>
  );
}
