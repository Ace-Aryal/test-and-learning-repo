import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/db";
import { addFriendSchema } from "@/lib/validations/add-friend";
import { publicProcedure, router } from "@/server/trpc";
import { getServerSession } from "next-auth";
import { z, ZodError } from "zod";

export const addFriendRouter = router({
  addFriend: publicProcedure
    .input(z.object({ emailToAdd: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // validate input
        const result = addFriendSchema.safeParse({ email: input.emailToAdd });
        if (!result.success) {
          throw new Error(result.error.message);
        }
        // get added user id
        const RESTResponse = await fetch(
          `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${input.emailToAdd}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
            },
            cache: "no-store",
          }
        );
        const data = (await RESTResponse.json()) as { result: string | null };
        // get own session
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
          throw new Error("Unauthorized");
        }
        if (!data.result) {
          throw new Error("Cant find the account");
        }
        if (data.result === session.user.id) {
          throw new Error("You can't add yourself yourself a friend request");
        }
        const idToAdd = data.result;
        // check redis db if already added
        const isAlredayAdded = (await fetchRedis(
          "sismember",
          `user:${idToAdd}:incoming_friend_requests`,
          session.user.id
        )) as 0 | 1;
        const isAlreadyOnMyRequest = await fetchRedis(
          "sismember",
          `user:${session.user.id}:incoming_friend_requests`,
          idToAdd
        );
        if (isAlreadyOnMyRequest) {
          throw new Error("Friend request is already in your inbox");
        }
        if (isAlredayAdded) {
          throw new Error("Friend request already sent");
        }
        // check redis db if already friend
        const isAlreadyFriends = (await fetchRedis(
          "sismember",
          `user:${session.user.id}:friends`,
          idToAdd
        )) as 0 | 1;

        if (isAlreadyFriends) {
          throw new Error("You are already friend with the user");
        }
        // finally send friend request add to set
        const res = await redis.sadd(
          `user:${idToAdd}:incoming_friend_requests`,
          session.user.id
        );
        if (!(res > 0)) {
          throw new Error("Failed to send request");
        }
        return { success: true, data: res };
      } catch (error) {
        throw new Error(
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Error adding friend request"
        );
      }
    }),
  getFriends: publicProcedure.query(async ({ ctx }) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user.id) {
        throw new Error("Unauthorizeed");
      }
      const friendsIds = (await fetchRedis(
        "smembers",
        `user:${session.user.id}:friends`
      )) as string[];
      const friends = await Promise.all(
        friendsIds.map(async (friendId) => {
          const friend = (await fetchRedis(
            "get",
            `user:${friendId}`
          )) as string;
          const parsedFriend = JSON.parse(friend) as User;
          return parsedFriend;
        })
      );
      return { success: true, data: friends };
    } catch (error) {
      throw new Error(
        error instanceof Error || error instanceof ZodError
          ? error.message
          : "Error getting friends"
      );
    }
  }),
});
