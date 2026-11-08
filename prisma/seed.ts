import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("Seeding database...");

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "electronics" },
      update: {},
      create: { name: "Electronics", slug: "electronics" },
    }),
    prisma.category.upsert({
      where: { slug: "clothing" },
      update: {},
      create: { name: "Clothing", slug: "clothing" },
    }),
    prisma.category.upsert({
      where: { slug: "home-garden" },
      update: {},
      create: { name: "Home & Garden", slug: "home-garden" },
    }),
    prisma.category.upsert({
      where: { slug: "sports" },
      update: {},
      create: { name: "Sports", slug: "sports" },
    }),
  ]);

  const [electronics, clothing, homeGarden, sports] = categories;
  console.log(`✓ ${categories.length} categories`);

  // Products
  const productData = [
    {
      name: "Wireless Noise-Cancelling Headphones",
      slug: "wireless-headphones",
      description:
        "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.",
      price: 299.99,
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"],
      stock: 42,
      categoryId: electronics.id,
    },
    {
      name: "Mechanical Keyboard",
      slug: "mechanical-keyboard",
      description:
        "Compact 75% layout mechanical keyboard with Cherry MX switches, RGB backlighting, and aluminium frame.",
      price: 149.99,
      images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80"],
      stock: 18,
      categoryId: electronics.id,
    },
    {
      name: "4K Webcam",
      slug: "4k-webcam",
      description:
        "Ultra-HD 4K webcam with auto-focus, built-in noise-cancelling microphone, and wide-angle lens.",
      price: 89.99,
      images: ["https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?w=600&q=80"],
      stock: 0,
      categoryId: electronics.id,
    },
    {
      name: "Classic White Tee",
      slug: "classic-white-tee",
      description:
        "100% organic cotton crew-neck t-shirt. Soft, breathable, and ethically sourced.",
      price: 29.99,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"],
      stock: 120,
      categoryId: clothing.id,
    },
    {
      name: "Slim Fit Chinos",
      slug: "slim-fit-chinos",
      description:
        "Versatile slim-fit chinos in stretch cotton. Dress them up or keep it casual.",
      price: 69.99,
      images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80"],
      stock: 55,
      categoryId: clothing.id,
    },
    {
      name: "Ceramic Pour-Over Set",
      slug: "ceramic-pour-over",
      description:
        "Hand-crafted ceramic pour-over coffee dripper with matching mug.",
      price: 49.99,
      images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"],
      stock: 30,
      categoryId: homeGarden.id,
    },
    {
      name: "Bamboo Cutting Board",
      slug: "bamboo-cutting-board",
      description:
        "Extra-large bamboo cutting board with juice groove and non-slip feet.",
      price: 39.99,
      images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"],
      stock: 75,
      categoryId: homeGarden.id,
    },
    {
      name: "Yoga Mat Pro",
      slug: "yoga-mat-pro",
      description:
        "6mm thick non-slip yoga mat with alignment lines. Made from eco-friendly TPE material.",
      price: 59.99,
      images: ["https://images.unsplash.com/photo-1601925228208-bf7e03e7c9a4?w=600&q=80"],
      stock: 40,
      categoryId: sports.id,
    },
  ];

  for (const data of productData) {
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
  }

  console.log(`✓ ${productData.length} products`);
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
