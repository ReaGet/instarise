import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLoginMutation } from '@/app/services/userApi'
import { useNavigate } from 'react-router-dom'
import { DASHBOARD } from '@/consts'

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Заполните поле логин"
  }),
  password: z.string().min(1, {
    message: "Заполните поле пароль"
  }),
})

type SignInFormValues = z.infer<typeof formSchema>

const SignInForm = () => {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await login(values).unwrap()
      navigate(DASHBOARD)
    } catch(err) {
      console.log(err);
      navigate(DASHBOARD)
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
        <Button type='submit' size={'lg'} className='float-right' disabled={isLoading}>Войти</Button>
      </form>
    </Form>
  )
}

export default SignInForm