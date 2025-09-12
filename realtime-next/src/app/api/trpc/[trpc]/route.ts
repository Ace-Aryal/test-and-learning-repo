import { appRouter } from "@/server/api/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/lib/trpc";
const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    router: appRouter,
    createContext,
    endpoint: "/api/trpc",
  });

export { handler as GET, handler as POST };
