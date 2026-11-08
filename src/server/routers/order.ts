import { z } from "zod";
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
      const products = await ctx.prisma.product.findMany({
        where: { id: { in: input.items.map((i) => i.productId) } },
      });

      const total = input.items.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId)!;
        return sum + Number(product.price) * item.quantity;
      }, 0);

      return ctx.prisma.order.create({
        data: {
          userId: ctx.session.user.id,
          total,
          status: "MOCK_PAID",
          items: {
            create: input.items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
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
      where: { userId: ctx.session.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
  }),
});
