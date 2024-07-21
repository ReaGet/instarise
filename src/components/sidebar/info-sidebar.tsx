import React from 'react'
import StatusBadge from '@/components/status-badge';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import ProxyInput from '../proxy-input';

const formSchema = z.object({
  description: z.string(),
  proxy: z.string().min(1, {
    message: "Заполните поле Прокси"
  }).ip({
    message: "Введите корректный Прокси"
  }),
});

type AccountInfoFormValues = z.infer<typeof formSchema>;

const InfoSidebar = () => {
  const form = useForm<AccountInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      proxy: '',
    }
  });

  function onSubmit(values: AccountInfoFormValues) {
    console.log(values)
  }

  return (
    <aside className='w-[200px] lg:w-[250px] h-full py-6 pl-6 border-l'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='sticky flex flex-col w-full gap-6 top-[104px]'>
          <StatusBadge status='working' />
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
          <Button type='submit' size='sm' className='ml-auto'>Сохранить</Button>
        </form>
      </Form>
    </aside>
  )
}

export default InfoSidebar