import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = now.getTime() - past.getTime(); // difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (years > 0) {
    return rtf.format(-years, "year");
  } else if (months > 0) {
    return rtf.format(-months, "month");
  } else if (weeks > 0) {
    return rtf.format(-weeks, "week");
  } else if (days > 0) {
    return rtf.format(-days, "day");
  } else if (hours > 0) {
    return rtf.format(-hours, "hour");
  } else if (minutes > 0) {
    return rtf.format(-minutes, "minute");
  } else {
    return rtf.format(-seconds, "second");
  }
}
export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
