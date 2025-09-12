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
type AddFriendButtonProps = {};
export default function AddFriendButton({}: AddFriendButtonProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaddFriendSchema>({
    resolver: zodResolver(addFriendSchema),
  });
  const addFriend = async (formData: TaddFriendSchema) => {
    console.log(formData);
    try {
      //   const validationRes = addFriendSchema.safeParse(formData);
      //   if (validationRes.error) {
      //     throw new Error(validationRes.error.message);
      //   }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Error sending friend request";
      toast.error(errorMessage);
    }
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
          placeholder="you@example.com"
          id="email"
        />
        <Button size={"sm"} className="px-4">
          Add
        </Button>
      </div>
    </form>
  );
}
