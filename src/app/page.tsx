import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { products, categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 px-4 py-24 sm:px-6 sm:py-32">
        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
            New arrivals
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Shop the latest
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
            Curated products across electronics, clothing, home goods, and sports.
            No real transactions — just good vibes.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/products" className={cn(buttonVariants({ size: "lg" }))}>
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/products?category=electronics"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-zinc-700 text-white hover:bg-zinc-800"
              )}
            >
              Electronics
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-bold text-zinc-900">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-6 text-center font-medium text-zinc-700 transition-all hover:border-zinc-900 hover:shadow-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900">Featured Products</h2>
          <Link href="/products" className={buttonVariants({ variant: "ghost" })}>
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
