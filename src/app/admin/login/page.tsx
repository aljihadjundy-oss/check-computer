export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-graphite/40 p-8">
        <p className="font-heading text-3xl text-paper">
          CHECK<span className="text-neon">.</span>COMPUTER
        </p>
        <p className="mt-1 text-sm text-paper/60">Admin Dashboard</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            Username atau password salah.
          </p>
        )}

        <form action="/api/admin/login" method="POST" className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-paper/70">Username</label>
            <input
              name="username"
              required
              className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-paper outline-none focus:border-electric"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-paper/70">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-white/10 bg-ink px-3 py-2 text-paper outline-none focus:border-electric"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-neon py-2 font-semibold text-ink transition hover:bg-neon-dim"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
