import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "./add-to-cart-button";
import type { Product } from "@/lib/mock-data";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Badge variant="secondary" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="mb-1">
          <Badge variant="outline" className="text-xs text-zinc-500">
            {product.category.name}
          </Badge>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 font-medium leading-snug text-zinc-900 hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="mb-3 text-lg font-semibold text-zinc-900">
          ${product.price.toFixed(2)}
        </p>
        <AddToCartButton product={product} className="w-full" />
      </CardContent>
    </Card>
  );
}
