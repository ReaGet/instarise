import type { AccountConfig } from '@/app/types'

export const mapConfigValues = <T extends AccountConfig[K], K extends keyof AccountConfig>(obj: T): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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