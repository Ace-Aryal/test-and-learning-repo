import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/api/routers/_app";

// server/api/trpc.ts
// 🔌 This generates hooks like trpc.hello.useQuery()
export const trpc = createTRPCReact<AppRouter>();

export const createContext = async () => ({});
export type Context = Awaited<ReturnType<typeof createContext>>;
// Instantiate t once
