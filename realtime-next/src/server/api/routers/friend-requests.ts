import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { publicProcedure, router } from "@/server/trpc";
import { getServerSession, User } from "next-auth";
import z, { string, ZodError } from "zod";

export const friendRequestsRouter = router({
  getMyFriendRequests: publicProcedure.query(async ({ ctx }) => {
    try {
      // same authorization headers for auth from mobile and expo
      const session = await getServerSession(authOptions);
      if (!session || !session.user.id) {
        throw new Error("Unauthorizeed");
      }
      const friendRequestsIDs = (await fetchRedis(
        "smembers",
        `user:${session.user.id}:incoming_friend_requests`
      )) as String[];
      const friendRequests = await Promise.all(
        friendRequestsIDs.map(async (id) => {
          try {
            const friend = await fetchRedis("get", `user:${id}`);
            if (typeof friend !== "string") {
              return null;
            }
            return JSON.parse(friend);
          } catch {
            return null;
          }
        })
      );
      return friendRequests.filter(
        (friendRequest) => friendRequest !== null
      ) as User[];
    } catch (error) {
      console.error(error);
      throw new Error(
        error instanceof Error || error instanceof ZodError
          ? error.message
          : "Error getting friend requests"
      );
    }
  }),
  getMyFriendRequestsCount: publicProcedure.query(async ({ ctx }) => {
    try {
      // same authorization headers for auth from mobile and expo
      const session = await getServerSession(authOptions);
      console.log(session, "session");
      if (!session || !session.user.id) {
        throw new Error("Unauthorizeed");
      }
      const friendRequestsCount = (await fetchRedis(
        "scard",
        `user:${session.user.id}:incoming_friend_requests`
      )) as number;
      return friendRequestsCount;
    } catch (error) {
      console.error(error);
      throw new Error(
        error instanceof Error || error instanceof ZodError
          ? error.message
          : "Error getting friend requests"
      );
    }
  }),
  acceptFriendRequest: publicProcedure
    .input(z.object({ senderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("input: iam here");
      try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
          throw new Error("Unauthorizeed");
        }
        const currentUser = session.user;
        // validate input on server
        z.object({
          senderId: string(),
        }).parse(input);
        const isAlreadyFriends = (await fetchRedis(
          "sismember",
          `user:${currentUser.id}:friends`,
          input.senderId
        )) as 0 | 1;
        if (isAlreadyFriends !== 0) {
          throw new Error("You are already friend with the user");
        }
      } catch (error) {
        throw new Error(
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Error accepting friend request"
        );
      }
    }),
});
