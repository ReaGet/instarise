import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button } from '@/components/ui/button'
import { AutoReplySchema, AutoReplyFormValues } from './schema'

interface AutoReplyProps {
  onSubmit: (values: AutoReplyFormValues) => void;
  enabled: boolean;
}

const AutoReplyForm = ({ onSubmit, enabled }: AutoReplyProps) => {
  const form = useForm<AutoReplyFormValues>({
    resolver: valibotResolver(AutoReplySchema),
    defaultValues: {
      messages: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormDescription className='-mb-2'>Входящие сообщения проверяются каждые 2 минуты</FormDescription>
        <FormField
          control={form.control}
          name='messages'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} {...field} disabled={!enabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' size={'lg'} className='ml-auto' disabled={!enabled}>Сохранить</Button>
      </form>
    </Form>
  )
}

export default AutoReplyForm