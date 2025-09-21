// app/api/message/route.ts
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { message } = await req.json();

  const res = await pusherServer.trigger("chat-channel", "new-message", {
    text: message,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
