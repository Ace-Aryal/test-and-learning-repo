import { addFriendRouter } from "./add-friend";
import { router } from "@/server/trpc";
import { friendRequestsRouter } from "./friend-requests";
import { userRouter } from "./user";

export const appRouter = router({
  add: addFriendRouter,
  friendRequests: friendRequestsRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
