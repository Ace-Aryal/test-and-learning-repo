"use client";
import React from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { open } = useSidebar();
  return (
    <div className="flex  w-full flex-1">
      <AppSidebar />
      <div className="relative flex-1 w-full">
        <div className="sticky lg:hidden top-0 inset-x-0 border-b py-2 border-gray-800 backdrop-blur bg-transparent w-full px-2 sm:px-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary">
            ACE<span className="text-white">CHATS</span>
          </h2>
          <SidebarTrigger
            className="h-full w-auto"
            triggerIcon={<Menu className="h-6 w-6" />}
          />
        </div>
        <div className=" lg:pt-8">{children}</div>
      </div>
    </div>
  );
}
