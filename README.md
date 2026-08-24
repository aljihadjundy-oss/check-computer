# Check Computer

Website full-stack untuk Check Computer — jasa servis laptop/PC/iPhone/MacBook, jual-beli unit, dan rakit PC custom di Ciputat, Tangerang Selatan.

**"Service Puas, Harga Pas"**

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Database:** Cloudflare D1 (SQLite) via Drizzle ORM
- **Storage:** Cloudflare R2 (foto produk, cover blog)
- **Auth:** Sesi admin sederhana (1 akun, password + signed cookie via `jose`) — bukan full auth provider karena cuma butuh 1 role
- **Styling:** Tailwind CSS v4
- **Hosting/Deploy:** Cloudflare Workers (via `@opennextjs/cloudflare`)

## Fitur

1. **Company Profile** — Home, Tentang, Layanan, Testimoni, Kontak & Lokasi
2. **Tracking Servis** — publik lacak status via kode tracking (`/tracking`), admin kelola order & update status (`/admin/orders`)
3. **Booking Online** — form booking publik (`/booking`), admin konfirmasi & convert ke order (`/admin/bookings`)
4. **Toko Online** — katalog, cart (localStorage), checkout manual transfer (`/toko`, `/keranjang`), admin CRUD produk + kelola order toko
5. **Blog/CMS** — artikel edukasi (`/blog`), admin CRUD dengan Markdown (`/admin/blog`)

## Setup Lokal

```bash
npm install
cp .dev.vars.example .dev.vars   # isi SESSION_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD_HASH
```

Generate password hash admin:

```bash
node -e "console.log(require('bcryptjs').hashSync('PASSWORD_KAMU', 10))"
```

Jalankan dev server dengan binding Cloudflare lokal (D1 + R2 disimulasikan lewat Miniflare):

```bash
npm run build
npx wrangler dev
```

## Database (Cloudflare D1)

Schema didefinisikan di `src/lib/db/schema.ts`. Migration SQL ada di `drizzle/`.

```bash
# generate migration baru setelah ubah schema
npx drizzle-kit generate

# apply ke D1 lokal
npx wrangler d1 execute check-computer-db --local --file=drizzle/0000_xxx.sql

# apply ke D1 production (setelah create database beneran)
npx wrangler d1 execute check-computer-db --remote --file=drizzle/0000_xxx.sql
```

## Deploy ke Cloudflare (langkah setup infra)

1. **Buat D1 database:**
   ```bash
   npx wrangler d1 create check-computer-db
   ```
   Copy `database_id` yang muncul ke `wrangler.jsonc` (ganti `REPLACE_WITH_D1_DATABASE_ID`).

2. **Buat R2 bucket:**
   ```bash
   npx wrangler r2 bucket create check-computer-media
   ```
   Aktifkan public access / custom domain untuk bucket ini di Cloudflare dashboard, lalu catat public URL-nya.

3. **Apply migration ke D1 remote:**
   ```bash
   npx wrangler d1 execute check-computer-db --remote --file=drizzle/0000_sticky_boomerang.sql
   ```

4. **Set secrets production:**
   ```bash
   npx wrangler secret put SESSION_SECRET
   npx wrangler secret put ADMIN_USERNAME
   npx wrangler secret put ADMIN_PASSWORD_HASH
   ```

5. **Set `R2_PUBLIC_URL` di `wrangler.jsonc`** (`vars`) sesuai public URL bucket R2 dari langkah 2, dan update `next.config.ts` `R2_PUBLIC_HOSTNAME` env kalau perlu untuk Next/Image.

6. **Deploy:**
   ```bash
   npm run deploy
   ```

## Catatan Desain

- Warna: Ink `#1A1A1A`, Paper `#F5F5F5`, Graphite `#3D3D3D` + aksen Electric Blue `#2F7DFF` & Neon Green `#39FF8A` (estimasi, sesuaikan kalau brand guide sudah fix hex-nya).
- Font: Bebas Neue (heading), Inter (body).
- Domain masih default `*.workers.dev` / custom domain Cloudflare — belum ada hardcode domain permanen, tinggal sambungin custom domain nanti di Cloudflare dashboard.
- Notifikasi WA otomatis & payment gateway sengaja belum diimplementasi (lihat prompt awal project) — struktur data (`orders`, `product_orders`) sudah siap buat extend ke sana belakangan.
