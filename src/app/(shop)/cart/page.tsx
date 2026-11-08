"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-zinc-300" />
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">Your cart is empty</h1>
        <p className="mb-8 text-zinc-500">Add some products to get started.</p>
        <Link href="/products" className={buttonVariants()}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-medium text-zinc-900 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 hover:border-zinc-400"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 hover:border-zinc-400"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="font-semibold text-zinc-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="mt-2 text-sm text-zinc-400 hover:text-red-500"
          >
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Order Summary</h2>
          <Separator className="mb-4" />

          <div className="mb-2 flex justify-between text-sm text-zinc-600">
            <span>Subtotal</span>
            <span>${total().toFixed(2)}</span>
          </div>
          <div className="mb-2 flex justify-between text-sm text-zinc-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="mb-2 flex justify-between text-sm text-zinc-600">
            <span>Tax</span>
            <span>${(total() * 0.1).toFixed(2)}</span>
          </div>

          <Separator className="my-4" />

          <div className="mb-6 flex justify-between font-semibold text-zinc-900">
            <span>Total</span>
            <span>${(total() * 1.1).toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className={cn(buttonVariants({ size: "lg" }), "w-full justify-center")}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
