import type { AccountConfig } from "@/app/services/accountApi";

export const mapConfigValues = <T extends AccountConfig[K], K extends keyof AccountConfig>(obj: T): T => {
  const result: any = {};
  let key: keyof T;
  for (key in obj) {
    const value = obj[key];
    if (typeof value === 'number') {
      result[key] = value < 1 ? 1 : value;
    } else {
      result[key] = value;
    }
  }
  return result as T;
}