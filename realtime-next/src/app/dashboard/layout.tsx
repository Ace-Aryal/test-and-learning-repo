// better way for sth like these toast notification is to use context provider
"use client";
import React, { useEffect } from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { usePathname } from "next/navigation";
import { showMessageToast } from "@/lib/notification-toast";
type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = useSession();
  const pathname = usePathname();
  useEffect(() => {
    if (session.status !== "authenticated") return;

    const newMessageChannel = pusherClient.subscribe(
      `user-${session.data?.user.id}-new_message`
    );

    const handleNewMessage = (
      data: Message & {
        chatId: string;
        senderName: string;
        senderImage: string;
      }
    ) => {
      if (!pathname.includes(data.chatId)) {
        showMessageToast({
          message: data.text,
          name: data.senderName,
          imageUrl: data.senderImage,
          chatId: data.chatId,
        });
      }
    };

    newMessageChannel.bind("new-message", handleNewMessage);

    return () => {
      newMessageChannel.unbind("new-message", handleNewMessage);
      pusherClient.unsubscribe(`user-${session.data?.user.id}-new_message`);
    };
  }, [session.status, session.data?.user.id, pathname]);

  return (
    <div className="flex  w-full flex-1">
      <AppSidebar />
      <div className="relative flex-1 w-full">
        <div className="fixed lg:hidden top-0 inset-x-0 border-b h-12 py-2 border-gray-800 backdrop-blur-3xl bg-zinc-950 lg:bg-transparent z-10   w-full px-2 sm:px-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary">
            <Link href="/dashboard">
              ACE<span className="text-white">CHATS</span>
            </Link>
          </h2>
          <SidebarTrigger
            className="h-full w-auto"
            triggerIcon={<Menu className="h-6 w-6" />}
          />
        </div>
        <div className="pt-12 lg:pt-0 h-full lg:mt-0 ">{children}</div>
      </div>
    </div>
  );
}
