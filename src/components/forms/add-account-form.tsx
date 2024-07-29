import { useForm } from 'react-hook-form'
import { pipe, object, string, type InferOutput, minLength, ipv4 } from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ProxyInput from '../proxy-input'

const formSchema = object({
  username: pipe(string(), minLength(1, 'Заполните поле логин')),
  password: pipe(string(), minLength(1, 'Заполните поле пароль')),
  proxy: pipe(string(), ipv4('Введите корректный Прокси')),
})

export type AddAccountFormValues = InferOutput<typeof formSchema>;

const AddAccountForm = () => {
  const form = useForm<AddAccountFormValues>({
    resolver: valibotResolver(formSchema),
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