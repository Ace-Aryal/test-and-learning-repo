"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      {/* --- Mobile (smaller number of skeletons) --- */}
      <div className="flex flex-col gap-4 sm:hidden">
        <IncomingMessage />
        <OutgoingMessage />
        <IncomingMessage />
      </div>

      {/* --- Desktop (more skeletons) --- */}
      <div className="hidden sm:flex flex-col gap-4">
        <IncomingMessage />
        <OutgoingMessage />
        <IncomingMessage />
        <OutgoingMessage />
        <IncomingMessage />
        <OutgoingMessage />
      </div>
    </div>
  );
}

function IncomingMessage() {
  return (
    <div className="flex items-start gap-2">
      <Skeleton className="h-8 w-8 rounded-full" /> {/* avatar */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

function OutgoingMessage() {
  return (
    <div className="flex items-start gap-2 justify-end">
      <div className="flex flex-col gap-2 items-end">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full" /> {/* avatar */}
    </div>
  );
}

export function ChatInputSkeleton() {
  return (
    <div className="p-4 ">
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
