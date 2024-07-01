import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function generateRandomIntegerId(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getFormatedDate(customTimestamp: number) {
  return format(new Date(customTimestamp * 1000), "MMM d, yyyy");
}

export function getDaysFromSeconds(seconds?: number) {
  if (!seconds) {
    return 0;
  }
  return (seconds / 86400).toFixed();
}

export function getDaysToTimeString(days?: number) {
  if (!days) {
    return "day";
  }
  if (days >= 360) {
    return "Yeary";
  }
  if (days <= 31) {
    return "Day";
  }
  if (days > 31) {
    return "Monthly";
  }
}

export function calculateDaysFromMonths(months: number) {
  return months * 30;
}
