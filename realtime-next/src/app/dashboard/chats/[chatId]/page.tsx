"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ChatPage() {
  const params = useParams<{ chatId: string }>();
  const { chatId } = params;
  const session = useSession();
  const [userId1, setUserId1] = useState("");
  const [userId2, setUserId2] = useState("");
  const [chatPartnerId, setChatPartnerId] = useState("");
  const { data: chatPartner, isSuccess } = trpc.user.getUser.useQuery({
    userId: chatPartnerId,
  });
  useEffect(() => {
    console.log(session, "session");
    if (session.status !== "loading" && session.status === "unauthenticated") {
      notFound();
    }
    const [userId1, userId2] = chatId.split("--");
    if (session.status === "authenticated") {
      if (
        userId1 !== session.data.user.id &&
        userId2 !== session.data.user.id
      ) {
        notFound();
      }
      const chatPartnerId =
        session.data.user.id === userId1 ? userId2 : userId1;
      setUserId1(userId1);
      setUserId2(userId2);
      setChatPartnerId(chatPartnerId);
    }
  }, [session.status]);
  return (
    <div className="flex w-full flex-col flex-1 justify-center -mt-8">
      <section
        id="chat-header"
        className="flex items-center px-4 border-b border-gray-700  "
      >
        {isSuccess && chatPartner.data ? (
          <div className="flex items-center ">
            <Image
              alt={chatPartner?.data.name}
              width={100}
              height={100}
              className="h-12 w-12 p-2 rounded-full"
              src={chatPartner?.data.image || "/pfp.png"}
            />
            <div className="space-y-0 flex flex-col gap-0">
              <p className="leading-4 text-sm font-semibold ">
                {chatPartner?.data.name || "User"}
              </p>
              <p className="text-xs font-medium  text-gray-400 leading-4">
                {chatPartner?.data.email || "user@example.com"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-1 flex flex-col gap-0">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
