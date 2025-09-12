import { t } from "@/lib/trpc";

export const appRouter = t.router({
  //   posts: postsRouter,
});

export type AppRouter = typeof appRouter;
