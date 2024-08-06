import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ProxyInput from '@/components/proxy-input'
import { AddAccountSchema, AddAccountFormValues } from './schema'
import { useState } from 'react'
import { useLoginAccountMutation } from '@/app/services/accountApi'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentUser } from '@/app/features/user/userSlice'

const AddAccountForm = () => {
  const [login, { isLoading }] = useLoginAccountMutation()
  const currentUser = useAppSelector(selectCurrentUser)
  const form = useForm<AddAccountFormValues>({
    resolver: valibotResolver(AddAccountSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [proxy, setPorxy] = useState('')

  function handleProxyChange(newValue: string) {
    setPorxy(newValue)
  }

  async function onSubmit(values: AddAccountFormValues) {
    console.log({ ...values, proxy })
    await login({
      group: currentUser!.username,
      ...values,
      proxy
    }).unwrap()
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
        <ProxyInput onChange={handleProxyChange} />
        <Button type='submit' size='lg' className='ml-auto' disabled={isLoading}>Добавить</Button>
      </form>
    </Form>
  )
}

export default AddAccountForm