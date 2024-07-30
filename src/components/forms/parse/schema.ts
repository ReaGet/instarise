import { pipe, boolean, object, string, type InferOutput, minLength, transform, minValue } from 'valibot'

const numberValidation = pipe(
  string(),
  transform((v) => Number(v)),
  minValue(1, 'Значение должно быть больше 0')
);


export const ParseSchema = object({
  users: pipe(string(), minLength(1, 'Поле не может быть пустым')),

  subscribers: boolean(),
  subscribers_amount: numberValidation,
  subscribings: boolean(),
  subscribings_amount: numberValidation,
})

export type ParseFormValues = InferOutput<typeof ParseSchema>;
