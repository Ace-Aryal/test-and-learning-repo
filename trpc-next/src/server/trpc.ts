import { initTRPC } from "@trpc/server";
import superjson from "superjson";

// Context ⇒ user, headers, database आदि यहाँ pass हुन्छ
export const createTRPCContext = () => ({});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

// base helper
export const router = t.router;
export const publicProcedure = t.procedure;
