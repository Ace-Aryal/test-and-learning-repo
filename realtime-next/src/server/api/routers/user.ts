import { fetchRedis } from "@/helpers/redis";
import { publicProcedure, router } from "@/server/trpc";
import z from "zod";

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      try {
        z.object({
          userId: z.string(),
        }).parse(input);
        const user = await fetchRedis("get", `user:${input.userId}`);
        return { success: true, data: user };
      } catch (error) {
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Error in getting user",
        };
      }
    }),
});
