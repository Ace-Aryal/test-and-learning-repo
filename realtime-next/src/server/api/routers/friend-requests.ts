import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { publicProcedure, router } from "@/server/trpc";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
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
      console.log(friendRequestsIDs, "friendRequestsIDs");
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

        const hasFriendRequest = (await fetchRedis(
          "sismember",
          `user:${currentUser.id}:incoming_friend_requests`,
          input.senderId
        )) as 0 | 1;

        if (!hasFriendRequest) {
          throw new Error("You have no friend request from this user");
        }
        const multi = redis.multi();

        // 1️⃣ Add the sender to the current user's friends set
        multi.sadd(`user:${currentUser.id}:friends`, input.senderId);
        multi.sadd(`user:${input.senderId}:friends`, currentUser.id);

        // 2️⃣ Remove the friend request
        multi.srem(
          `user:${currentUser.id}:incoming_friend_requests`,
          input.senderId
        );

        // Execute both atomically
        const acceptRes = await multi.exec();
        if (!acceptRes.length) {
          throw new Error("Failed to accept friend request");
        }
        pusherServer.trigger(
          `user-${currentUser.id}-incoming_friend_requests`,
          "remove-friend-request",
          {
            senderId: input.senderId,
          }
        );
        return { success: true, data: acceptRes };
      } catch (error) {
        throw new Error(
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Error accepting friend request"
        );
      }
    }),
  rejectFriendRequest: publicProcedure
    .input(z.object({ senderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
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
        const hasFriendRequest = await fetchRedis(
          "sismember",
          `user:${currentUser.id}:incoming_friend_requests`,
          input.senderId
        );
        if (!hasFriendRequest) {
          throw new Error("You have no friend request from this user");
        }
        const rejectRes = await redis.srem(
          `user:${currentUser.id}:incoming_friend_requests`,
          input.senderId
        );
        pusherServer.trigger(
          `user-${currentUser.id}-incoming_friend_requests`,
          "remove-friend-request",
          {
            senderId: input.senderId,
          }
        );
        return { success: true, data: rejectRes };
      } catch (error) {
        throw new Error(
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Error rejecting friend request"
        );
      }
    }),
});
