
import { object, string, type InferOutput } from 'valibot'

export const AccountInfoSchema = object({
  description: string(),
});

export type AccountInfoFormValues = InferOutput<typeof AccountInfoSchema>;