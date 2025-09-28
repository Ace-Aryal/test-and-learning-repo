// apps/web/src/utils/trpc.ts
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@monorepo/api";

/**
 * 1. Define the tRPC React hooks
 * We use createTRPCReact instead of createTRPCNext (which is for the Pages Router)
 */
export const trpc = createTRPCReact<AppRouter>();

function getBaseUrl() {
  // Logic remains the same: empty string for browser, environment variables for Vercel/local
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * 2. Define the client configuration for the server/client
 * Note: This function will be used by our custom provider.
 */
export const createClient = () =>
  createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
  });

// The usage of this file in the Next.js app will be through a custom component (TRPCProvider)
// which handles the QueryClient setup.
