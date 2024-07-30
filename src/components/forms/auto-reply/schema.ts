import { pipe, object, string, type InferOutput, minLength } from 'valibot'

export const AutoReplySchema = object({
  messages: pipe(string(), minLength(1, 'Поле не может быть пустым'))
})

export type AutoReplyFormValues = InferOutput<typeof AutoReplySchema>;
