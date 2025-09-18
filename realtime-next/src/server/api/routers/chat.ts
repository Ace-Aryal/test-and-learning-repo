import { redis } from "@/lib/db";
import { publicProcedure, router } from "@/server/trpc";
import z, { ZodError } from "zod";

export const chatRouter = router({
  getInitialChatMessages: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input }) => {
      try {
        z.object({
          chatId: z.string(),
        }).parse(input);

        const chat = (await redis.zrange(
          `user:${input.chatId}:messages`,
          0,
          -1
        )) as string[];
        const chatMessages = chat
          .map((message) => JSON.parse(message))
          .reverse() as Message[];
        z.array(
          z.object({
            id: z.string(),
            senderId: z.string(),
            receiverId: z.string(),
            text: z.string(),
            timestamp: z.number(),
          })
        ).parse(chatMessages);
        return { success: true, data: chatMessages };
      } catch (error) {
        throw new Error(
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Error getting initial chat messages"
        );
      }
    }),
});
