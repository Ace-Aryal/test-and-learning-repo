import { addFriendRouter } from "./add-friend";
import { router } from "@/server/trpc";
import { friendRequestsRouter } from "./friend-requests";
import { userRouter } from "./user";
import { chatRouter } from "./chat";

export const appRouter = router({
  add: addFriendRouter,
  friendRequests: friendRequestsRouter,
  user: userRouter,
  chats: chatRouter,
});

export type AppRouter = typeof appRouter;
