"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

export function CartButton() {
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <Link
      href="/cart"
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative")}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-semibold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
      <span className="sr-only">Cart</span>
    </Link>
  );
}
