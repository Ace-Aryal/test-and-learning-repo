"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
// src/providers/trpc-provider.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ReactNode, useState } from "react";
import { trpc } from "@/lib/trpc";
import { SidebarProvider } from "../ui/sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc", // 👈 Your Next.js tRPC route
        }),
      ],
    })
  );

  return (
    <SidebarProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </SidebarProvider>
  );
}
