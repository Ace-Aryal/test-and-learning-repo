import { cn } from "@/lib/utils";
import React from "react";

export const Logo = ({
  className,
  color = "white",
}: {
  color?: "white" | "black";
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "text-3xl font-[custom-medium] text-white uppercase tracking-wide transition-colors drop-shadow-lg",
        {
          "text-foreground ": color === "black",
          "text-background": color === "white",
        },
        className
      )}
    >
      ZENITH
    </div>
  );
};
