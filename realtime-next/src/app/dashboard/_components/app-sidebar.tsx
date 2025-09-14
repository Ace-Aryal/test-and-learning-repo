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
import { trpc } from "@/lib/trpc";
import { cn, truncate } from "@/lib/utils";
import { LogOut, UserPlus, Users, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function AppSidebar() {
  const session = useSession();
  const pathname = usePathname();
  const {
    data: friendRequestsCount,
    isError,
    isLoading,
    isSuccess,
  } = trpc.friendRequests.getMyFriendRequestsCount.useQuery();
  useEffect(() => {
    if (!isLoading && isError) {
      toast.error("Error getting friend requests");
    }
  }, [isError]);
  return (
    <Sidebar className="">
      <SidebarHeader className="flex flex-row justify-between items-center px-2">
        <h2 className="text-lg font-semibold tracking-tight text-bold text-primary">
          ACE<span className="text-foreground">CHATS</span>
        </h2>
        <SidebarTrigger
          triggerIcon={<X />}
          className="hover:bg-zinc-800 hidden lg:inline-flex"
        />
      </SidebarHeader>
      <SidebarContent className="py-4  ">
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
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-between items-center gap-3">
          <div className="flex-1">
            <img
              src={session.data?.user?.image ?? "/pfp.png"}
              className="w-full aspect-square rounded-full"
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
              className="py-0 px-0 rounded-full p-3 hover:bg-zinc-800 "
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
