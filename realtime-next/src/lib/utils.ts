import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(string: string, maxLength: number) {
  return string.length > maxLength
    ? string.slice(0, maxLength + 1) + "..."
    : string.slice(0, maxLength + 1);
}

export const constructChatHref = (id1: string, id2: string) => {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds.join("--")}`;
};
