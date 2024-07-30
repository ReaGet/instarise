import { pipe, object, string, type InferOutput, minLength, ipv4 } from 'valibot'

export const AddAccountSchema = object({
  username: pipe(string(), minLength(1, 'Заполните поле логин')),
  password: pipe(string(), minLength(1, 'Заполните поле пароль')),
  proxy: pipe(string(), ipv4('Введите корректный Прокси')),
})

export type AddAccountFormValues = InferOutput<typeof AddAccountSchema>;
