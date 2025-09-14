"use client";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addFriendSchema,
  TaddFriendSchema,
} from "@/lib/validations/add-friend";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
type AddFriendButtonProps = {};
export default function AddFriendButton({}: AddFriendButtonProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaddFriendSchema>({
    resolver: zodResolver(addFriendSchema),
  });
  const addMutation = trpc.add.addFriend.useMutation();
  const addFriend = (formData: TaddFriendSchema) => {
    addMutation.mutate(
      { emailToAdd: formData.email },
      {
        onSuccess: () => {
          toast.success("Friend request sent");
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(addFriend)} className="max-w-sm">
      <label htmlFor="email" className="block text-sm font-medium leading-6 ">
        Add friend by email
      </label>
      <div className="mt-2 flex gap-4">
        <Input
          error={errors.email?.message}
          {...register("email", {})}
          placeholder="dipesh@example.com"
          id="email"
        />
        <Button isLoading={addMutation.isPending} size={"sm"} className="px-4">
          Add
        </Button>
      </div>
    </form>
  );
}
