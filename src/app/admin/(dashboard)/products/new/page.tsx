import { redirect } from "next/navigation";
import { createProduct } from "@/lib/actions/products";
import { ProductForm } from "@/components/product-form";

async function handleCreate(formData: FormData) {
  "use server";
  await createProduct({
    name: String(formData.get("name")),
    category: String(formData.get("category")),
    price: Number(formData.get("price")),
    condition: String(formData.get("condition")),
    stock: Number(formData.get("stock")),
    description: String(formData.get("description") || ""),
    images: JSON.parse(String(formData.get("images") || "[]")),
  });
  redirect("/admin/products");
}

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">Produk Baru</h1>
      <ProductForm action={handleCreate} submitLabel="Simpan Produk" />
    </div>
  );
}
