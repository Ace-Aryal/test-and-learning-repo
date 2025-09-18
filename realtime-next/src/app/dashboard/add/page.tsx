import React from "react";
import AddFriendButton from "./_components/add-friend-button";

export default function AddFriendPage() {
  return (
    <div className="pt-4 px-2  sm:pt-8">
      <h1 className="font-bold text-4xl sm:text-5xl mb-8">Add a friend</h1>
      <AddFriendButton />
    </div>
  );
}
