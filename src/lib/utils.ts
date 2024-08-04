import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toFormData = (data: Record<string, any>) => {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return formData
}