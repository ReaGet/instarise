import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button } from '@/components/ui/button'
import { AutoReplySchema, AutoReplyFormValues } from './schema'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'
import Interval from '@/components/forms/fields/interval'

interface AutoReplyProps {
  onSubmit: (values: AutoReplyFormValues) => void;
  data: AutoReplyFormValues;
}

// TODO: Дисейблить форму во время отправки
const AutoReplyForm = ({ onSubmit, data }: AutoReplyProps) => {
  const form = useForm<AutoReplyFormValues>({
    resolver: valibotResolver(AutoReplySchema),
    defaultValues: data,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormDescription className='-mb-2'>Входящие сообщения проверяются каждые 2 минуты</FormDescription>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Interval fromName='timeout_from' toName='timeout_to' form={form} >
          Сколько времени прошло с последнего сообщения (в секундах)
        </Interval>

        <Button type='submit' size={'lg'} className='ml-auto'>Сохранить</Button>
      </form>
    </Form>
  )
}

export default AutoReplyForm