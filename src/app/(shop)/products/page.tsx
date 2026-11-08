import { ProductCard } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";
import { products, categories, getProductsByCategory } from "@/lib/mock-data";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const activeCategory = categories.find((c) => c.slug === category);
  const displayed = activeCategory
    ? getProductsByCategory(activeCategory.slug)
    : products;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900">
          {activeCategory ? activeCategory.name : "All Products"}
        </h1>
        <p className="text-zinc-500">{displayed.length} products</p>
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/products">
          <Badge
            variant={!activeCategory ? "default" : "outline"}
            className="cursor-pointer px-3 py-1 text-sm"
          >
            All
          </Badge>
        </Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/products?category=${cat.slug}`}>
            <Badge
              variant={activeCategory?.id === cat.id ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-sm"
            >
              {cat.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Grid */}
      {displayed.length === 0 ? (
        <p className="py-24 text-center text-zinc-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
