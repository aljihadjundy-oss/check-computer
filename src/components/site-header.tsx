"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan" },
  { href: "/toko", label: "Toko" },
  { href: "/blog", label: "Blog" },
  { href: "/testimoni", label: "Testimoni" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="container-cc flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-2xl tracking-wide text-paper">
          CHECK<span className="text-neon">.</span>COMPUTER
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-paper/80 transition hover:text-neon"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/keranjang" className="relative text-paper/80 hover:text-neon" aria-label="Keranjang">
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neon text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/tracking"
            className="rounded-full border border-electric px-4 py-2 text-sm font-semibold text-electric-light transition hover:bg-electric hover:text-ink"
          >
            Lacak Servis
          </Link>
          <Link
            href="/booking"
            className="rounded-full bg-neon px-4 py-2 text-sm font-semibold text-ink transition hover:bg-neon-dim"
          >
            Booking
          </Link>
        </div>

        <button
          aria-label="Buka menu"
          className="text-paper lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <nav className="container-cc flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 text-paper/85 hover:bg-white/5 hover:text-neon"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 px-2 pb-2">
              <Link
                href="/tracking"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-electric px-4 py-2 text-center text-sm font-semibold text-electric-light"
              >
                Lacak Servis
              </Link>
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-neon px-4 py-2 text-center text-sm font-semibold text-ink"
              >
                Booking
              </Link>
            </div>
            <Link
              href="/keranjang"
              onClick={() => setOpen(false)}
              className="mx-2 mb-2 rounded-full border border-white/15 px-4 py-2 text-center text-sm text-paper/80"
            >
              Keranjang {count > 0 ? `(${count})` : ""}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}
