"use client";

import React from "react";
import { trpc } from "@/lib/trpc";
import { Check, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import { toast } from "sonner";

export default function FriendRequestPage() {
  const {
    isLoading,
    isError,
    data: friendRequests,
  } = trpc.friendRequests.getMyFriendRequests.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-4">
        Something went wrong while fetching friend requests.
      </div>
    );
  }

  if (!friendRequests || friendRequests.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        You have no friend requests.
      </div>
    );
  }
  console.log(friendRequests, "requests");
  return (
    <div className="px-1  mt-2 space-y-2">
      <h1 className="font-bold text-4xl sm:text-5xl mb-8">Friend Requests</h1>
      <div className="space-y-1">
        {[...friendRequests].map((request, index) => (
          <FriendRequstRow key={request.id} request={request} index={index} />
        ))}
      </div>
    </div>
  );
}

function FriendRequstRow({
  index,
  request,
}: {
  index: number;
  request: {
    id: string;
    emiail?: string | null;
    name?: string | null;
    image?: string | null;
  };
}) {
  const utils = trpc.useUtils();

  const { mutate: accept, isPending: isAccepting } =
    trpc.friendRequests.acceptFriendRequest.useMutation({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        utils.friendRequests.getMyFriendRequests.invalidate();
        utils.friendRequests.getMyFriendRequestsCount.invalidate();
        // also invalidate chat list later
        toast.success("Friend request accepted");
      },
    });
  const { mutate: reject, isPending: isRejecting } =
    trpc.friendRequests.rejectFriendRequest.useMutation({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        // also invalidate chat list later
        utils.friendRequests.getMyFriendRequests.invalidate();
        utils.friendRequests.getMyFriendRequestsCount.invalidate();

        toast.success("Friend request rejected");
      },
    });
  return (
    <div
      key={index}
      className="flex px-2 items-center shadow-xs  justify-between p-1  rounded-lg shadow-primary/60 max-w-md"
    >
      <div className="flex items-center space-x-3">
        <img
          src={request.image ?? "/pfp.png"}
          alt={request.name ?? "friend request pfp"}
          className="w-9 h-9 sm:h-7 sm:w-7  rounded-full object-cover"
        />
        <span className="font-medium sm:text-sm">{request.name}</span>
      </div>
      <div className="flex space-x-2 text-sm">
        <Button
          isLoading={isAccepting}
          onClick={() => accept({ senderId: request.id })}
          className="h-8 p-0 sm:h-6 rounded-full aspect-square "
        >
          <Check className="rounded-full h-6 w-6 p-1" />
        </Button>
        <Button
          isLoading={isRejecting}
          onClick={() => reject({ senderId: request.id })}
          className="bg-destructive p-0 aspect-square h-8 sm:h-6  rounded-full hover:bg-destructive/90"
        >
          <X className="rounded-full h-6 w-6 p-1" />
        </Button>
      </div>
    </div>
  );
}
