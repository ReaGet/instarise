import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ProxyInput from '@/components/proxy-input'
import { AddAccountSchema, AddAccountFormValues } from './schema'
import { useEffect, useState } from 'react'
import { useLoginAccountMutation } from '@/app/services/accountApi'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentUser, UserType } from '@/app/features/user/userSlice'
import { selectGroupId } from '@/app/features/account/accountSlice'
import { useCreateGroupMutation } from '@/app/services/groupApi'
import { ErrorRepsonseType } from '@/app/types'
import { useHandleError } from '@/hooks/useHandleError'
import { normalizeProxy } from '@/components/proxy-input'

// TODO: выводить сообщение, если аккаунт, который мы хотим добавить, уже существиет у другого пользователя
const AddAccountForm = ({ onAccountAdded }: { onAccountAdded: () => void }) => {
  const [login, { isLoading }] = useLoginAccountMutation()
  const currentUser = useAppSelector(selectCurrentUser) || {} as UserType
  const groupId = useAppSelector(selectGroupId)
  const [createGroup, { isLoading: isCreateGroupLoading }] = useCreateGroupMutation()
  const [proxy, setProxy] = useState('')
  const toast = useHandleError()

  const form = useForm<AddAccountFormValues>({
    resolver: valibotResolver(AddAccountSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  useEffect(() => {
    if (!groupId && currentUser?.id && !isCreateGroupLoading) {
      createGroup(currentUser!.id)
    }
  }, [])


  function handleProxyChange(newValue: string) {
    setProxy(newValue)
  }

  async function onSubmit(values: AddAccountFormValues) {
    try {
      await login({
        group: groupId,
        ...values,
        proxy: normalizeProxy(proxy),
      }).unwrap()
      onAccountAdded()
    } catch(error) {
      // TODO: добавить обработку ошибок
      const { status } = error as ErrorRepsonseType
      if (status === 500 || status === 'FETCH_ERROR') {
        toast()
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
        <ProxyInput onChange={handleProxyChange} />
        <Button type='submit' size='lg' className='ml-auto' disabled={isLoading}>Добавить</Button>
      </form>
    </Form>
  )
}

export default AddAccountForm