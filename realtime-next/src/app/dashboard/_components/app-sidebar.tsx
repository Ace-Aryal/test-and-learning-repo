"use client";
import Button from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { pusherClient } from "@/lib/pusher";
import { trpc } from "@/lib/trpc";
import { cn, constructChatHref, truncate } from "@/lib/utils";
import { Clock, LogOut, UserPlus, Users, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UrlObject } from "url";

export function AppSidebar() {
  const session = useSession();
  const pathname = usePathname();

  const router = useRouter();
  // const [unseenMessages, setUnseenMessages] = useState<string[]>([]);
  const {
    data: friendRequestsCount,
    isError,
    isLoading,
    isSuccess,
  } = trpc.friendRequests.getMyFriendRequestsCount.useQuery();
  const friends = trpc.add.getFriends.useQuery();
  useEffect(() => {
    if (!isLoading && isError) {
      toast.error("Error getting friend requests");
    }
  }, [isError]);

  // useEffect(() => {
  //   const channel = pusherClient.subscribe(`chats-channel`);
  //   channel.bind("new-message", (data: { senderId: string }) => {
  //     console.log(data, unseenMessages, "data");
  //     setUnseenMessages((prev) => [...prev, data.senderId]);
  //   });
  //   return () => channel.unsubscribe();
  // }, []);
  const user = session?.data?.user;

  return (
    <Sidebar className="">
      <SidebarHeader className="flex flex-row justify-between items-center px-2">
        <h2 className="text-lg font-semibold tracking-tight text-bold text-primary">
          ACE<span className="text-foreground">CHATS</span>
        </h2>
      </SidebarHeader>
      <SidebarContent className="py-4  ">
        <SidebarGroup>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              className={cn("p-0", {
                "bg-zinc-800": pathname === "/dashboard",
              })}
            >
              <Link
                href={"/dashboard"}
                className="text-sm flex gap-2 items-center w-full px-2 py-1"
              >
                <Clock className="h-4 w-4 " /> Recents
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-gray-400 px-0">
            Overview
          </SidebarGroupLabel>
          <SidebarMenu className="mt-1 space-y-0.5">
            <SidebarMenuItem className="">
              <SidebarMenuButton
                className={cn("p-0", {
                  "bg-zinc-800": pathname === "/dashboard/add",
                })}
              >
                <Link
                  href={"/dashboard/add"}
                  className="text-sm flex gap-2 items-center w-full px-2 py-1"
                >
                  <UserPlus className="h-4 w-4 " /> Add Friend
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn("p-0", {
                  "bg-zinc-800": pathname === "/dashboard/requests",
                })}
              >
                <Link
                  href={"/dashboard/requests"}
                  className="text-sm flex gap-2 items-center w-full px-2 py-1 relative"
                >
                  <Users className="h-4 w-4 " />
                  Friend Requests{" "}
                  {isSuccess && friendRequestsCount > 0 && (
                    <div className="  h-4 w-4 text-xs  self-end bg-primary rounded-full flex justify-center items-center">
                      <p>{friendRequestsCount || "0"}</p>
                    </div>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="">
          <SidebarGroupLabel className="text-xs text-gray-400 px-0 ">
            Chats
          </SidebarGroupLabel>
          <SidebarMenu>
            {friends.data?.success && session.data?.user && user
              ? friends.data.data.length > 0
                ? friends.data.data.sort().map(({ name, id, image }) => {
                    const isActive = pathname.split("/")[3]?.includes(id);

                    return (
                      <Link
                        key={id}
                        href={
                          `/dashboard/chats/${constructChatHref(
                            user.id,
                            id
                          )}` as __next_route_internal_types__.RouteImpl<`/dashboard/chats/${string}`>
                        }
                      >
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className={cn("p-0 px-2 cursor-pointer", {
                              "bg-zinc-800": isActive,
                            })}
                          >
                            <div className="flex gap-2 items-center">
                              <img
                                className="h-5 w-5 rounded-full"
                                src={image || "/pfp.png"}
                              />
                              {name}
                              {/* {!!unseenMessagesCount && (
                                <p className="  h-4 w-4 text-xs  self-end bg-primary rounded-full flex justify-center items-center">
                                  {unseenMessagesCount}
                                </p>
                              )} */}
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </Link>
                    );
                  })
                : "You have no friends"
              : friends.isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SidebarMenuButton className="" key={index}>
                    {" "}
                    <Skeleton className="h-7 w-full" />
                  </SidebarMenuButton>
                ))
              : "Error fetching friends"}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-between items-center gap-3">
          <div className="flex-2">
            <img
              src={session.data?.user?.image ?? "/pfp.png"}
              className="w-full min-w-7 aspect-square rounded-full"
            />
          </div>
          <div className="flex-4">
            <p className=" text-sm font-medium ">
              {truncate(session.data?.user?.name ?? "User", 15)}
            </p>
            <p className="text-xs text-gray-300 font-medium">
              {truncate(session.data?.user?.email ?? "user@example.com", 30)}
            </p>
          </div>
          <div className="flex-1">
            <Button
              onClick={() => signOut({ redirect: true })}
              className=" rounded-lg p-2   hover:bg-zinc-800 "
              variant={"ghost"}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
