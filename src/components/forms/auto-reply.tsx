import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const formSchema = z.object({
  enabled: z.boolean(),
  messages: z.string().min(1, {
    message: 'Поле не может быть пустым',
  })
})

export type AutoReplyFormValues = z.infer<typeof formSchema>;

interface AutoReplyProps {
  onSubmit: (values: AutoReplyFormValues) => void;
}

const AutoReplyForm = ({ onSubmit }: AutoReplyProps) => {
  const form = useForm<AutoReplyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // TODO:  возможно enabled сделать переменной state
      enabled: false,
      messages: "",
    },
  });

  const isControlsEnabled = !form.watch('enabled');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormField
          control={form.control}
          name='enabled'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch id={field.name} name={field.name} checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor={field.name}>Сообщения</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='messages'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} {...field} disabled={isControlsEnabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' size={'lg'} className='ml-auto' disabled={isControlsEnabled}>Сохранить</Button>
      </form>
    </Form>
  )
}

export default AutoReplyForm