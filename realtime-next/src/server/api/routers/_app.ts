import { addFriendRouter } from "./add-friend";
import { router } from "@/server/trpc";

export const appRouter = router({
  add: addFriendRouter,
});

export type AppRouter = typeof appRouter;
