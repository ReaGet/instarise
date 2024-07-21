import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ProxyInput from '../proxy-input'

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Заполните поле логин"
  }),
  password: z.string().min(1, {
    message: "Заполните поле пароль"
  }),
  proxy: z.string().min(1, {
    message: "Заполните поле Прокси"
  }).ip({
    message: "Введите корректный Прокси"
  }),
})

export type AddAccountFormValues = z.infer<typeof formSchema>;

const AddAccountForm = () => {
  const form = useForm<AddAccountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      proxy: "",
    },
  })

  function onSubmit(values: AddAccountFormValues) {
    console.log(values)
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
                <Input {...field} />
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
                <Input {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ProxyInput form={form} name='proxy' />
        <Button type='submit' size='lg' className='ml-auto'>Добавить</Button>
      </form>
    </Form>
  )
}

export default AddAccountForm