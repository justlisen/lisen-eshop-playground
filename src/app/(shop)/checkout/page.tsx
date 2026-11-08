"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";

type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay — mock checkout
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    setConfirmed(true);
    setLoading(false);
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">Order confirmed!</h1>
        <p className="mb-2 text-zinc-500">
          This is a mock checkout — no real payment was taken.
        </p>
        <p className="mb-8 text-sm text-zinc-400">
          Order status: <span className="font-medium text-zinc-700">MOCK_PAID</span>
        </p>
        <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-3">
          {/* Shipping */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-zinc-900">Shipping Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={form.address} onChange={handleChange} required placeholder="123 Main St" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={form.city} onChange={handleChange} required placeholder="San Francisco" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" name="zip" value={form.zip} onChange={handleChange} required placeholder="94103" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="font-semibold text-zinc-900">Payment</h2>
              <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                Mock — no real charge
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" name="cardNumber" value={form.cardNumber} onChange={handleChange} required placeholder="4242 4242 4242 4242" maxLength={19} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/YY" maxLength={5} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" value={form.cvv} onChange={handleChange} required placeholder="123" maxLength={4} />
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Processing..." : `Pay $${(total() * 1.1).toFixed(2)}`}
          </Button>
        </form>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-zinc-200 bg-white p-6 lg:col-span-2">
          <h2 className="mb-4 font-semibold text-zinc-900">Order Summary</h2>
          <Separator className="mb-4" />
          <div className="space-y-3 text-sm">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-zinc-600">
                <span>
                  {item.name}{" "}
                  <span className="text-zinc-400">× {item.quantity}</span>
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-sm text-zinc-600">
            <span>Subtotal</span>
            <span>${total().toFixed(2)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm text-zinc-600">
            <span>Tax (10%)</span>
            <span>${(total() * 0.1).toFixed(2)}</span>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between font-semibold text-zinc-900">
            <span>Total</span>
            <span>${(total() * 1.1).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
