// apps/web/src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
// Import your types
import { appRouter, type RouterContext } from "@monorepo/api";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    // Ensure the return value matches the type RouterContext
    createContext: (): RouterContext => ({}),
  });

export { handler as GET, handler as POST };
