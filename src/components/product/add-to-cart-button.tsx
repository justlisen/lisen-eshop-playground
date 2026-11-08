"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/lib/mock-data";

type Props = {
  product: Product;
  className?: string;
};

export function AddToCartButton({ product, className }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  if (product.stock === 0) {
    return (
      <Button disabled variant="outline" className={className}>
        Out of Stock
      </Button>
    );
  }

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success("Added to cart", {
      description: product.name,
    });
  }

  return (
    <Button onClick={handleAdd} className={className}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
