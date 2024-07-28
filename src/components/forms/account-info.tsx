import { useEffect } from 'react'
import StatusBadge from '@/components/status-badge';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import ProxyInput from '../proxy-input';
import { Account, useUpdateAccountMutation } from '@/app/services/accountApi';
import { Spinner } from '../ui/spinner';

const formSchema = z.object({
  description: z.string(),
  proxy: z.string().min(1, {
    message: "Заполните поле Прокси"
  }).ip({
    message: "Введите корректный Прокси"
  }),
});

type AccountInfoFormValues = z.infer<typeof formSchema>;

interface SidebarProps {
  data: Account;
}

// TODO: уменьшить колечетсво рендеров
const AccountInfoForm = ({ data }: SidebarProps) => {
  const [updateAccount, { isLoading }] = useUpdateAccountMutation()

  const form = useForm<AccountInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  async function onSubmit(values: AccountInfoFormValues) {
    await updateAccount({ ...data, ...values }).unwrap()
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
            </FormItem>
          )}
        />
        <ProxyInput form={form} name='proxy' />
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