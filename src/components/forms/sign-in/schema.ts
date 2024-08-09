import { pipe, object, string, type InferOutput, minLength } from 'valibot'

export const SignInSchema = object({
  username: pipe(string(), minLength(1, 'Заполните поле логин')),
  password: pipe(string(), minLength(1, 'Заполните поле пароль')),
})

export type SignInFormValues = InferOutput<typeof SignInSchema>