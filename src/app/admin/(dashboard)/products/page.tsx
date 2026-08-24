import Link from "next/link";
import { listAllProducts } from "@/lib/actions/products";
import { PRODUCT_CATEGORY_LABEL } from "@/lib/constants";

export default async function AdminProductsPage() {
  const products = await listAllProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-3xl">Produk Toko</h1>
        <Link href="/admin/products/new" className="rounded-full bg-neon px-4 py-2 text-sm font-semibold text-ink hover:bg-neon-dim">
          + Produk Baru
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-white/5 text-paper/60">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${p.id}`} className="font-medium text-electric-light">{p.name}</Link>
                </td>
                <td className="px-4 py-3">{PRODUCT_CATEGORY_LABEL[p.category] ?? p.category}</td>
                <td className="px-4 py-3">Rp {p.price.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">{p.isActive ? "Aktif" : "Nonaktif"}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-paper/40">Belum ada produk.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
