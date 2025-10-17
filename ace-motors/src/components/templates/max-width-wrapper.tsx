import { cn } from "@/lib/utils";
import React from "react";

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-5xl mx-auto overflow-clip", className)}>
      {children}
    </div>
  );
};
