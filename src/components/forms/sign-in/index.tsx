import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLoginMutation } from '@/app/services/userApi'
import { Link, useNavigate } from 'react-router-dom'
import { DASHBOARD, SIGNUP } from '@/consts'
import { SignInSchema, SignInFormValues } from './schema'
import { ErrorRepsonseType } from '@/app/types'
import { useHandleError } from '@/hooks/useHandleError'

const SignInForm = () => {

  const form = useForm<SignInFormValues>({
    resolver: valibotResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const toast = useHandleError()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await login(values).unwrap()
      
      navigate(DASHBOARD)
    } catch(error) {
      // TODO: решить вопрос с тайпскриптом
      const { status, data = {} } = error as ErrorRepsonseType
      if (typeof data === 'object' && 'detail' in data && Array.isArray(data.detail)) {
        data!.detail?.forEach((d: any) => {
          const [_, field] = d.loc as [string, keyof SignInFormValues]
          form.setError(field, {
            message: 'Поле заполнено неверно'
          })
        })
      }
      if (status !== 422) toast()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-[500px] space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input {...field} type='password' disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between'>
          <Link to={SIGNUP} className='text-sm hover:underline'>Нет аккаунта?</Link>
          <Button type='submit' size={'lg'} className='float-right' disabled={isLoading}>Войти</Button>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm