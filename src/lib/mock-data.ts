export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: Category;
  categoryId: string;
};

export const categories: Category[] = [
  { id: "cat-1", name: "Electronics", slug: "electronics" },
  { id: "cat-2", name: "Clothing", slug: "clothing" },
  { id: "cat-3", name: "Home & Garden", slug: "home-garden" },
  { id: "cat-4", name: "Sports", slug: "sports" },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Wireless Noise-Cancelling Headphones",
    slug: "wireless-headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Perfect for travel, work, or just enjoying your music without interruptions.",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
    ],
    stock: 42,
    categoryId: "cat-1",
    category: categories[0],
  },
  {
    id: "prod-2",
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    description:
      "Compact 75% layout mechanical keyboard with Cherry MX switches, RGB backlighting, and a durable aluminium frame. Tactile feedback for a satisfying typing experience.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    ],
    stock: 18,
    categoryId: "cat-1",
    category: categories[0],
  },
  {
    id: "prod-3",
    name: "4K Webcam",
    slug: "4k-webcam",
    description:
      "Ultra-HD 4K webcam with auto-focus, built-in noise-cancelling microphone, and wide-angle lens. Look sharp in every video call.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?w=600&q=80",
    ],
    stock: 0,
    categoryId: "cat-1",
    category: categories[0],
  },
  {
    id: "prod-4",
    name: "Classic White Tee",
    slug: "classic-white-tee",
    description:
      "100% organic cotton crew-neck t-shirt. Soft, breathable, and ethically sourced. A wardrobe staple in a timeless white.",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    ],
    stock: 120,
    categoryId: "cat-2",
    category: categories[1],
  },
  {
    id: "prod-5",
    name: "Slim Fit Chinos",
    slug: "slim-fit-chinos",
    description:
      "Versatile slim-fit chinos in stretch cotton. Dress them up or keep it casual — they work with everything.",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    ],
    stock: 55,
    categoryId: "cat-2",
    category: categories[1],
  },
  {
    id: "prod-6",
    name: "Ceramic Pour-Over Set",
    slug: "ceramic-pour-over",
    description:
      "Hand-crafted ceramic pour-over coffee dripper with matching mug. Makes a perfectly balanced cup every morning.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    ],
    stock: 30,
    categoryId: "cat-3",
    category: categories[2],
  },
  {
    id: "prod-7",
    name: "Bamboo Cutting Board",
    slug: "bamboo-cutting-board",
    description:
      "Extra-large bamboo cutting board with juice groove and non-slip feet. Naturally antimicrobial and eco-friendly.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
    stock: 75,
    categoryId: "cat-3",
    category: categories[2],
  },
  {
    id: "prod-8",
    name: "Yoga Mat Pro",
    slug: "yoga-mat-pro",
    description:
      "6mm thick non-slip yoga mat with alignment lines. Made from eco-friendly TPE material. Includes carry strap.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1601925228208-bf7e03e7c9a4?w=600&q=80",
    ],
    stock: 40,
    categoryId: "cat-4",
    category: categories[3],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category.slug === slug);
}
