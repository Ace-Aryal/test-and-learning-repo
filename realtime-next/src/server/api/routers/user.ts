import { fetchRedis } from "@/helpers/redis";
import { publicProcedure, router } from "@/server/trpc";
import z, { ZodError } from "zod";

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      try {
        z.object({
          userId: z.string(),
        }).parse(input);
        const user = (await fetchRedis(
          "get",
          `user:${input.userId}`
        )) as string;
        return { success: true, data: JSON.parse(user) as User };
      } catch (error) {
        throw new Error(
          error instanceof Error || error instanceof ZodError
            ? error.message
            : "Error getting user"
        );
      }
    }),
});
