import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  messages: z.string().min(1, {
    message: 'Поле не может быть пустым',
  })
})

export type AutoReplyFormValues = z.infer<typeof formSchema>;

interface AutoReplyProps {
  onSubmit: (values: AutoReplyFormValues) => void;
  enabled: boolean;
}

const AutoReplyForm = ({ onSubmit, enabled }: AutoReplyProps) => {
  const form = useForm<AutoReplyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messages: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
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