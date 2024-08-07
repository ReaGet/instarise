import { useEffect, useState } from 'react'
import StatusBadge from '@/components/status-badge'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button } from '@/components/ui/button'
import ProxyInput from '@/components/proxy-input'
import { useUpdateAccountInfoMutation } from '@/app/services/accountApi'
import type { Account } from '@/app/types'
import { Spinner } from '@/components/ui/spinner'
import { AccountInfoSchema, AccountInfoFormValues} from './schema'
// TODO: полностью перекинуть логику с прокси в proxy-input
// Сейчас если прокси не редактировали и нажали сохранить, на бэк отправится только протокол
import { normalizeProxy } from '@/components/proxy-input'

interface SidebarProps {
  account: Account;
}

// TODO: уменьшить колечетсво рендеров
const AccountInfoForm = ({ account }: SidebarProps) => {
  const [updateDetails, { isLoading }] = useUpdateAccountInfoMutation()
  const [proxy, setProxy] = useState(account.proxy || '')

  const defaultValues: AccountInfoFormValues = {
    description: account.description || ''
  }

  const form = useForm<AccountInfoFormValues>({
    resolver: valibotResolver(AccountInfoSchema),
    defaultValues
  });

  useEffect(() => {
    form.reset(defaultValues)
  }, [account])

  function handleProxyChange(newValue: string) {
    setProxy(newValue)
  }

  async function onSubmit(values: AccountInfoFormValues) {
    await updateDetails({
      accountId: account.id,
      details: {
        ...values,
        proxy: normalizeProxy(proxy)
      }
    }).unwrap()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='sticky flex flex-col w-full gap-6 top-[104px]'>
        <StatusBadge status={account.status} />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ProxyInput onChange={handleProxyChange} className='flex-col' value={proxy} disabled={account.status === 'working'} />
        <Button type='submit' size='sm' className='ml-auto w-24' disabled={isLoading}>
          { isLoading
            ? <Spinner className='w-6 h-6 text-white' />
            : 'Сохранить'
          }
        </Button>
      </form>
    </Form>
  )
}

export default AccountInfoForm