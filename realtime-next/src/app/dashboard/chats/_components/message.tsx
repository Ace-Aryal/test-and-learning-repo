"use client";
import { ChatSkeleton } from "@/components/skeletons/chat-skeletons";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { format, isToday } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
interface MessagesProps {
  inititalMessages: Message[];
  currentUser: User | undefined;
  friendImage: string | undefined;
}
export default function Messages({
  inititalMessages,
  currentUser,
  friendImage,
}: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);

    if (isToday(date)) {
      return format(date, "hh:mm a"); // e.g. 02:45 PM
    }

    return format(date, "dd/MM/yyyy, hh:mm a"); // e.g. 20/09/2025, 02:45 PM
  };
  useEffect(() => {
    setMessages(inititalMessages);
  }, [inititalMessages]);
  if (!currentUser || !messages) {
    return (
      <div className="flex-1 h-full flex justify-start items-end">
        <ChatSkeleton />
      </div>
    );
  }
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-1 p-3 overflow-y-auto scrollabar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch max-h-screen  "
    >
      <div ref={scrollDownRef} />
      {messages.map((message, index) => {
        const isCurrentUserMessage = message.senderId === currentUser.id;
        const hasNextMessageFromSameuser = messages[index - 1]
          ? messages[index - 1].senderId === messages[index].senderId
          : false;
        // since the array is reversed do opposite math here
        const secondsDifference = messages[index - 1]
          ? messages[index - 1].timestamp - messages[index].timestamp
          : Infinity;
        const shouldNotDisplayDateAndTime =
          secondsDifference / 1000 < 60 && hasNextMessageFromSameuser;
        console.log(shouldNotDisplayDateAndTime, secondsDifference / 1000);
        return (
          <div className="chat-message" key={message.id + message.timestamp}>
            <div
              className={cn("flex items-end mb-3", {
                "justify-end": isCurrentUserMessage,
                "mb-0": shouldNotDisplayDateAndTime,
                "flex-row-reverse justify-start ":
                  !shouldNotDisplayDateAndTime && isCurrentUserMessage,
              })}
            >
              {!shouldNotDisplayDateAndTime && (
                <Image
                  width={50}
                  height={50}
                  alt="profile-picture"
                  className="h-8 w-8 mb-6 rounded-full"
                  src={
                    isCurrentUserMessage
                      ? currentUser.image ?? "/pfp.png"
                      : friendImage ?? "/pfp.png"
                  }
                />
              )}
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUserMessage,
                    "order-2 items-start": !isCurrentUserMessage,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-flex", {
                    "bg-primary text-white": isCurrentUserMessage,
                    "bg-secondary text-white": !isCurrentUserMessage,
                    "mx-8": shouldNotDisplayDateAndTime,
                    "rounded-br-none ":
                      isCurrentUserMessage && !shouldNotDisplayDateAndTime,
                    "rounded-bl-none ":
                      !hasNextMessageFromSameuser && !isCurrentUserMessage,
                  })}
                >
                  {message.text}{" "}
                </span>
                {!shouldNotDisplayDateAndTime && (
                  <span className="ml-2 text-xs text-gray-400">
                    {formatTimestamp(message.timestamp)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
