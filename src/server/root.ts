import { router } from "@/server/trpc";
import { productRouter } from "@/server/routers/product";
import { orderRouter } from "@/server/routers/order";

export const appRouter = router({
  product: productRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
