import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function saveParsedJson<T>(json: string, defaultValue: T) {
  try {
    const parsed = JSON.parse(json) as T;
    return parsed;
  } catch (error) {
    return defaultValue;
  }
}

export function capitalizeWords(str: string) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
