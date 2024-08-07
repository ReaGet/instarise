import { useEffect, useState } from 'react'
import StatusBadge from '@/components/status-badge'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button } from '@/components/ui/button'
import ProxyInput from '@/components/proxy-input'
import { useUpdateAccountMutation } from '@/app/services/accountApi'
import type { Account } from '@/app/types'
import { Spinner } from '@/components/ui/spinner'
import { AccountInfoSchema, AccountInfoFormValues} from './schema'

interface SidebarProps {
  data: Account;
}

// TODO: уменьшить колечетсво рендеров
const AccountInfoForm = ({ data }: SidebarProps) => {
  const [updateAccount, { isLoading }] = useUpdateAccountMutation()
  const [proxy, setProxy] = useState(data.proxy || '')

  const defaultValues: AccountInfoFormValues = {
    description: data.description || ''
  }

  const form = useForm<AccountInfoFormValues>({
    resolver: valibotResolver(AccountInfoSchema),
    defaultValues
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [data]);

  function handleProxyChange(newValue: string) {
    console.log(1111, newValue)
    setProxy(newValue)
  }

  async function onSubmit(values: AccountInfoFormValues) {
    await updateAccount({ ...data, ...values, proxy }).unwrap()
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='sticky flex flex-col w-full gap-6 top-[104px]'>
        <StatusBadge status={data.status} />
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
        <ProxyInput onChange={handleProxyChange} className='flex-col' value={proxy} />
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