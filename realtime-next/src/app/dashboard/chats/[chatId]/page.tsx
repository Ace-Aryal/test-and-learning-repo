"use client";
import { authOptions } from "@/lib/auth";
import { trpc } from "@/lib/trpc";
import { getServerSession } from "next-auth";
import { notFound, useParams } from "next/navigation";
import React from "react";

export default async function ChatPage() {
  const params = useParams<{ chatId: string }>();
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    notFound();
  }
  const [userId1, userId2] = chatId.split("--");
  if (userId1 !== session.user.id && userId2 !== session.user.id) {
    notFound();
  }
  const chatPartnerId = session.user.id === userId1 ? userId2 : userId1;
  const chatPartner = trpc.user.getUser.useQuery({
    userId: chatPartnerId,
  });
  return <div>{chatId}</div>;
}
