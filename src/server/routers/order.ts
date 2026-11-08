import { z } from "zod";
import type { Product } from "@prisma/client";
import { router, protectedProcedure } from "@/server/trpc";

export const orderRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({ productId: z.string(), quantity: z.number().min(1) })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dbProducts: Product[] = await ctx.prisma.product.findMany({
        where: { id: { in: input.items.map((i) => i.productId) } },
      });

      const orderTotal = input.items.reduce((sum, item) => {
        const product = dbProducts.find((p) => p.id === item.productId)!;
        return sum + Number(product.price) * item.quantity;
      }, 0);

      return ctx.prisma.order.create({
        data: {
          userId: ctx.session.user.id!,
          total: orderTotal,
          status: "MOCK_PAID",
          items: {
            create: input.items.map((item) => {
              const product = dbProducts.find((p) => p.id === item.productId)!;
              return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
              };
            }),
          },
        },
        include: { items: { include: { product: true } } },
      });
    }),

  myOrders: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany({
      where: { userId: ctx.session.user.id! },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
  }),
});
