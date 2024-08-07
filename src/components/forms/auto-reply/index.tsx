import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button } from '@/components/ui/button'
import { AutoReplySchema, AutoReplyFormValues } from './schema'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'
import { handleNumberValue } from '../fields/utils'

interface AutoReplyProps {
  onSubmit: (values: AutoReplyFormValues) => void;
  data: AutoReplyFormValues;
  isLoading: boolean;
}

// TODO: Дисейблить форму во время отправки
const AutoReplyForm = ({ onSubmit, data, isLoading }: AutoReplyProps) => {
  const form = useForm<AutoReplyFormValues>({
    resolver: valibotResolver(AutoReplySchema),
    defaultValues: data,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  function handleSubmit(values: AutoReplyFormValues) {
    if (!values.text.length) {
      form.setError('text', {
        message: 'Поле не может быть пустым',
      })
      return
    }
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormDescription className='-mb-2'>Входящие сообщения проверяются каждые 2 минуты</FormDescription>

        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} {...field} placeholder='{ Сообщение1 | Сообщени2 | Сообщение3 }'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='timeout'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Количество часов</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(handleNumberValue(e.target.value))}
                  min='1'
                  type='number'
                  className='w-24'
                  placeholder='1'
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Сколько часов прошло с последнего сообщения</FormDescription>
            </FormItem>
          )}
        />

        <Button type='submit' size={'lg'} className='ml-auto' disabled={isLoading}>
          { isLoading
            ? <Spinner className='w-6 h-6 text-white' />
            : 'Сохранить'
          }
        </Button>
      </form>
    </Form>
  )
}

export default AutoReplyForm