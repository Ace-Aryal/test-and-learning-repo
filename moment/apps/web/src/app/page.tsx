// apps/web/src/app/page.tsx (Example)
"use client";
import { trpc } from "../utils/trpc";

export default function Home() {
  // Type-safe query using the shared API!
  const helloQuery = trpc.greetings.useQuery();

  return (
    <main>
      <h1>Next.js + tRPC + Monorepo</h1>
      {helloQuery.isLoading ? (
        <p>Loading...</p>
      ) : helloQuery.error ? (
        <p>Error: {helloQuery.error.message}</p>
      ) : (
        <p>Greeting: **{helloQuery.data}**</p>
      )}
    </main>
  );
}
