import { object, string, type InferOutput, number } from 'valibot'

export const AutoReplySchema = object({
  text: string(),
  timeout: number(),
})

export type AutoReplyFormValues = InferOutput<typeof AutoReplySchema>;
