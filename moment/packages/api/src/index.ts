// packages/api/src/index.ts
import { initTRPC } from "@trpc/server";
import { z } from "zod";

// 1. Define the Context type (or a utility function to create it)
export type RouterContext = {};

// 2. Pass the Context type to initTRPC
const t = initTRPC.context<RouterContext>().create(); // 👈 Fix here

// Base router for all procedures
export const appRouter = t.router({
  greetings: t.procedure.query(() => "Hello from tRPC"),
});

export type AppRouter = typeof appRouter;
// ... (rest of the file)
