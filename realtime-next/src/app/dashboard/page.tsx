"use client";
import { trpc } from "@/lib/trpc";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data, isLoading, isError, isSuccess } =
    trpc.chats.getDashboardChatMessages.useQuery();
  return (
    <div className="pt-4 px-2  sm:pt-8">
      <h1 className="font-bold text-4xl sm:text-5xl mb-8">Recent Chats</h1>
      {isLoading && <div>Loading...</div>}
      {isError ||
        (isSuccess && !data && <div>Error fetching latest chats</div>)}
      {data?.map((friend) => (
        <ChatPreview key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

interface ChatPreviewProps {
  friend: {
    name: string;
    email: string;
    image: string;
    id: string;
    lastMessage: {
      chatId: string;
      senderId: string;
      receiverId: string;
      text: string;
      id: string;
      timestamp: number;
    };
  };
}

function ChatPreview({ friend }: ChatPreviewProps) {
  return (
    <Link
      href={`/dashboard/chats/${friend.lastMessage.chatId}`}
      className={cn(
        "flex items-center justify-between w-full",
        "p-3 rounded-xl border border-border",
        "bg-background hover:bg-muted transition-colors",
        "gap-3"
      )}
    >
      {/* Left: Avatar + Name + Last message */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {friend.image ? (
            <Image
              src={friend.image}
              alt={friend.name}
              width={48}
              height={48}
              className="h-12 w-12 object-cover"
            />
          ) : (
            <span className="text-lg font-semibold text-primary">
              {friend.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-primary truncate">
            {friend.name}
          </span>
          <span className="text-sm">
            {friend.lastMessage.receiverId === friend.id ? "You: " : ""}
            <span className="text-sm text-muted-foreground truncate">
              {friend.lastMessage.text}
            </span>
          </span>
        </div>
      </div>

      {/* Right: Chevron */}
      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
    </Link>
  );
}
