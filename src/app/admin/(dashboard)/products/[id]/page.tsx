import { notFound, redirect } from "next/navigation";
import { getProductById, updateProduct, deleteProduct } from "@/lib/actions/products";
import { ProductForm } from "@/components/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));
  if (!product) notFound();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateProduct(product!.id, {
      name: String(formData.get("name")),
      category: String(formData.get("category")),
      price: Number(formData.get("price")),
      condition: String(formData.get("condition")),
      stock: Number(formData.get("stock")),
      description: String(formData.get("description") || ""),
      images: JSON.parse(String(formData.get("images") || "[]")),
      isActive: formData.get("isActive") === "on",
    });
    redirect("/admin/products");
  }

  async function handleDelete() {
    "use server";
    await deleteProduct(product!.id);
    redirect("/admin/products");
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-3xl">Edit Produk</h1>
        <form action={handleDelete}>
          <button className="rounded-full border border-white/15 px-4 py-2 text-sm text-red-400 hover:border-red-400">
            Hapus Produk
          </button>
        </form>
      </div>
      <ProductForm action={handleUpdate} initial={product} submitLabel="Simpan Perubahan" />
    </div>
  );
}
