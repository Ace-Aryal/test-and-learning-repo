import { clsx } from "clsx";
import { twMerge } from "tw-merge";

// Merge clsx + tailwind-merge into one helper
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}
