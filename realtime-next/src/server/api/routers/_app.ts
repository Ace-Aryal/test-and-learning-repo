import { addFriendRouter } from "./add-friend";
import { router } from "@/server/trpc";
import { friendRequestsRouter } from "./friend-requests";

export const appRouter = router({
  add: addFriendRouter,
  friendRequests: friendRequestsRouter,
});

export type AppRouter = typeof appRouter;
