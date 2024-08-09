import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toFormData = (data: Record<string, any>) => {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return formData
}

export const arrayToString = (array: string[]) => {
  return array.join(',').split(/[,|\n\r|\r|\n]/).filter(Boolean).join('\n')
}

export const stringToArray = (text: string) => {
  return text.split(/[,|\n\r|\r|\n]/).filter(Boolean).map(t => t.trim())
}