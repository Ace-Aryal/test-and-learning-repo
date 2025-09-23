"use client";

import { toast } from "sonner";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function showMessageToast({
  name,
  message,
  imageUrl,
  chatId,
}: {
  name: string;
  message: string;
  imageUrl?: string;
  chatId: string;
}) {
  toast.custom((t) => (
    <Link href={`/dashboard/chats/${chatId}`}>
      <div
        className={cn(
          "flex items-start gap-3 w-full max-w-sm rounded-2xl shadow-lg",
          "bg-background text-foreground border border-border p-3"
        )}
      >
        {/* Profile Image */}
        <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-primary">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Name + Message */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-primary">{name}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {message}
          </p>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => toast.dismiss(t)}
          className="ml-2 text-muted-foreground hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </Link>
  ));
}
