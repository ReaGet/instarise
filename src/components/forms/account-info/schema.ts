
import { object, string, pipe, ipv4, type InferOutput } from 'valibot'

export const AccountInfoSchema = object({
  description: string(),
  proxy: pipe(string(), ipv4('Введите корректный Прокси')),
});

export type AccountInfoFormValues = InferOutput<typeof AccountInfoSchema>;