import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSignupMutation } from '@/app/services/userApi'
import { Link, useNavigate } from 'react-router-dom'
import { SIGNIN } from '@/consts'
import { SignUpSchema, SignUpFormValues } from './schema'
import { ErrorRepsonseType } from '@/app/types'

const SignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: valibotResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const navigate = useNavigate()
  const [signup, { isLoading }] = useSignupMutation()

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await signup(values).unwrap()
      navigate(SIGNIN)
    } catch(error) {
      // TODO: сделать обработчик ошибок
      const { status } = error as ErrorRepsonseType
      if (status === 409) {
        form.setError('username', {
          message: 'Пользователь уже зарегистрирован'
        })
      }
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
          <Link to={SIGNIN} className='text-sm hover:underline'>Есть аккаунт?</Link>
          <Button type='submit' size={'lg'} className='float-right' disabled={isLoading}>Зарегистрироваться</Button>
        </div>
      </form>
    </Form>
  )
}

export default SignUpForm