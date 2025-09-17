import { redis } from "@/lib/db";
import { publicProcedure, router } from "@/server/trpc";
import z from "zod";

export const chatRouter = router({
  getInitialChatMessages: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input }) => {
      try {
        z.object({
          chatId: z.string(),
        }).parse(input);
        // const chat = await redis.zrange();
      } catch (error) {
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Error in getting user",
        };
      }
    }),
});
