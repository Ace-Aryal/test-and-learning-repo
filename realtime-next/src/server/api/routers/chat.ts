import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/db";
import { publicProcedure, router } from "@/server/trpc";
import { getServerSession } from "next-auth";
import z, { ZodError } from "zod";
import { nanoid } from "nanoid";
import { pusherServer } from "@/lib/pusher";
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
        await pusherServer.trigger(`chats-channel`, "new-message", {
          senderId: user.id,
        });

        return res;
      } catch (error) {
        console.error(error);
        throw new Error(
          error instanceof Error ? error.message : "Error sending message"
        );
      }
    }),
});
