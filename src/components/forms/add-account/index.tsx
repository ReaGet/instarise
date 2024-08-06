import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ProxyInput from '@/components/proxy-input'
import { AddAccountSchema, AddAccountFormValues } from './schema'

const AddAccountForm = () => {
  const form = useForm<AddAccountFormValues>({
    resolver: valibotResolver(AddAccountSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  let proxy = ''

  function handleProxyChange(newValue: string) {
    proxy = newValue
  }

  function onSubmit(values: AddAccountFormValues) {
    console.log({ ...values, proxy })
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
        <ProxyInput onChange={handleProxyChange} />
        <Button type='submit' size='lg' className='ml-auto'>Добавить</Button>
      </form>
    </Form>
  )
}

export default AddAccountForm