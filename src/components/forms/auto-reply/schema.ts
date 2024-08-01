import { pipe, object, string, type InferOutput, minLength, boolean, number } from 'valibot'

export const AutoReplySchema = object({
  text: pipe(string(), minLength(1, 'Поле не может быть пустым')),
  timeout_from: number(),
  timeout_to: number(),
})

export type AutoReplyFormValues = InferOutput<typeof AutoReplySchema>;
