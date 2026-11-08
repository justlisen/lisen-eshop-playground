import Link from "next/link";
import { auth } from "@/lib/auth";
import { CartButton } from "./cart-button";
import { AuthButton } from "./auth-button";
import { categories } from "@/lib/mock-data";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-900"
        >
          eshop<span className="text-zinc-400">.</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/products"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <CartButton />
          <AuthButton user={session?.user} />
        </div>
      </div>
    </header>
  );
}
