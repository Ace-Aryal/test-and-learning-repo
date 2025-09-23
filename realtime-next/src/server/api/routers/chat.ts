import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/db";
import { publicProcedure, router } from "@/server/trpc";
import { getServerSession } from "next-auth";
import z, { ZodError } from "zod";
import { nanoid } from "nanoid";
import { pusherServer } from "@/lib/pusher";
import { fetchRedis } from "@/helpers/redis";
import { constructChatHref } from "@/lib/utils";
export const chatRouter = router({
  getInitialChatMessages: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input }) => {
      try {
        z.object({
          chatId: z.string(),
        }).parse(input);
        // chat id is senderId, receiver id that is our id .construtChatID
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
          throw new Error("Unauthorizeed");
        }
        const chat = (await redis.zrange(
          `chat:${input.chatId}:messages`,
          0,
          -1
        )) as Message[];
        console.log(chat, "chat");
        const chatMessages = chat.reverse();
        const validate = z
          .array(
            z.object({
              id: z.string(),
              senderId: z.string(),

              receiverId: z.string(),
              text: z.string(),
              timestamp: z.number(),
            })
          )
          .safeParse(chatMessages);
        return chatMessages;
      } catch (error) {
        console.error(error, "error");
        throw new Error(
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Error getting initial chat messages"
        );
      }
    }),
  sendMessage: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
        receiverId: z.string(),
        text: z.string().max(5000),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
          throw new Error("Unauthorizeed");
        }
        const user = session.user;
        const chatId = input.chatId;
        const [user1Id, user2Id] = chatId.split("--");
        if (user1Id !== user.id && user2Id !== user.id) {
          throw new Error("Unauthorized, malicious request incoming");
        }
        const isUserFriend = await redis.sismember(
          `user:${user.id}:friends`,
          input.receiverId
        );
        if (!isUserFriend) throw new Error("You are not friends with the user");
        const timestamp = Date.now();
        const message: Message = {
          ...input,
          timestamp,
          senderId: user.id,
          id: nanoid(),
        };
        const res = await redis.zadd(`chat:${chatId}:messages`, {
          score: timestamp,
          member: JSON.stringify(message),
        });
        if (!res) {
          throw new Error("Failed to send message");
        }
        await pusherServer.trigger(
          `chat-channel-${chatId}`,
          "new-message",
          message
        );

        await pusherServer.trigger(
          `user-${input.receiverId}-new_message`,
          "new-message",
          { ...message, senderName: user.name, senderImage: user.image }
        );

        return res;
      } catch (error) {
        console.error(error);
        throw new Error(
          error instanceof Error ? error.message : "Error sending message"
        );
      }
    }),
  getDashboardChatMessages: publicProcedure.query(async ({ ctx }) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user.id) {
        throw new Error("Unauthorizeed");
      }
      const friends = await redis.smembers(`user:${session.user.id}:friends`);
      const friendsWithThierLastMessages = await Promise.all(
        friends.map(async (friendId) => {
          try {
            const friend = (await fetchRedis(
              "get",
              `user:${friendId}`
            )) as string;
            const friendParsed = JSON.parse(friend) as User;
            const lastMessage = (await fetchRedis(
              "zrange",
              `chat:${constructChatHref(session.user.id, friendId)}:messages`,
              -1,
              -1
            )) as string[];
            return {
              ...friendParsed,
              lastMessage: JSON.parse(lastMessage[0]) as Message,
            };
          } catch (error) {
            console.error(error);
            return null;
          }
        })
      );
      console.log(friendsWithThierLastMessages, "friendsWithThierLastMessages");
      return friendsWithThierLastMessages
        .filter((friend) => friend !== null)
        .sort(
          (a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp
        ) as (User & { lastMessage: Message & { chatId: string } })[];
    } catch (error) {
      throw new Error("Error getting  chat messages");
    }
  }),
});
