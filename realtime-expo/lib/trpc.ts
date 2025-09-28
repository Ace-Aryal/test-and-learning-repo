import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../realtime-next/src/server/api/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";

export const trpc = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "https://your-vercel-app.vercel.app/api/trpc",
    }),
  ],
});
