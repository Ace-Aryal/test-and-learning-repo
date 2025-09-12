import { z } from "zod";
export const addFriendSchema = z.object({
  email: z.email("Invalid email format"),
});

export type TaddFriendSchema = z.infer<typeof addFriendSchema>;
