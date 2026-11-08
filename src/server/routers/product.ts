import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc";

export const productRouter = router({
  list: publicProcedure
    .input(z.object({ categorySlug: z.string().optional() }).optional())
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: input?.categorySlug
          ? { category: { slug: input.categorySlug } }
          : undefined,
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findUniqueOrThrow({
        where: { slug: input.slug },
        include: { category: true },
      });
    }),

  categories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
});
