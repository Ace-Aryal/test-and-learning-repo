// apps/mobile/src/utils/trpc.tsx (Example)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import React, { useState } from "react";
import type { AppRouter } from "@monorepo/api";

// Set this to your Next.js backend URL (localhost for dev, real URL for production)
const TRPC_ENDPOINT = "http://192.168.1.XXX:3000/api/trpc"; // **Replace with your machine's local IP!**

export const trpc = createTRPCReact<AppRouter>();

export const TRPCProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: TRPC_ENDPOINT,
          // Mobile apps require the platform to be 'browser' for tRPC to work
          fetch: (input, init) =>
            fetch(input, { ...init, platform: "browser" } as any),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
