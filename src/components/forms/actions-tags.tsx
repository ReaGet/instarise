import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import ControlsBlock from './controls-block'

const formSchema = z.object({
  tags: z.string().min(1, {
    message: 'Поле не может быть пустым',
  }),

  masslookingEnabled: z.boolean(),
  masslookingFrom: z.coerce.number().min(1, { message: 'Значение должно быть больше 0'}),
  masslookingTo: z.coerce.number().min(1, { message: 'Значение должно быть больше 0'}),
  
  masslookingStoriesEnabled: z.boolean(),
  masslookingStoriesFrom: z.coerce.number().min(1, { message: 'Значение должно быть больше 0'}),
  masslookingStoriesTo: z.coerce.number().min(1, { message: 'Значение должно быть больше 0'}),
  
  storiesActionsEnabled: z.boolean(),
  storiesActionsFrom: z.coerce.number().min(1, { message: 'Значение должно быть больше 0'}),
  storiesActionsTo: z.coerce.number().min(1, { message: 'Значение должно быть больше 0'}),
  
  subscribitionsEnabled: z.boolean(),
  subscribitionsFrom: z.coerce.number().min(1, { message: 'Значение должно быть больше 0'}),
  subscribitionsTo: z.coerce.number().min(1, { message: 'Значение должно быть больше 0'}),
})

export type TagsActionsFormValues = z.infer<typeof formSchema>;

interface TagsActionsProps {
  onSubmit: (values: TagsActionsFormValues) => void;
  enabled: boolean
}

const TagsActionsForm = ({ onSubmit, enabled }: TagsActionsProps) => {
  const form = useForm<TagsActionsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: '',
      masslookingEnabled: false,
      masslookingFrom: 1,
      masslookingTo: 2,
      masslookingStoriesEnabled: false,
      masslookingStoriesFrom: 1,
      masslookingStoriesTo: 2,
      storiesActionsEnabled: false,
      storiesActionsFrom: 1,
      storiesActionsTo: 2,
      subscribitionsEnabled: false,
      subscribitionsFrom: 1,
      subscribitionsTo: 2,
    },
  });

  const isControlsEnabled = !enabled;
  const isMasslookingEnabled = form.watch('masslookingEnabled') && !isControlsEnabled;
  const masslookingStoriesEnabled = form.watch('masslookingStoriesEnabled') && !isControlsEnabled;
  const storiesActionsEnabled = form.watch('storiesActionsEnabled') && !isControlsEnabled;
  const subscribitionsEnabled = form.watch('subscribitionsEnabled') && !isControlsEnabled;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} {...field} disabled={isControlsEnabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ControlsBlock
          title='Маслукинг'
          checkboxName='masslookingEnabled'
          fromName='masslookingFrom'
          toName='masslookingTo'
          isFormEnabled={isControlsEnabled}
          form={form}
          isControlsEnabled={isMasslookingEnabled}
        />
        <ControlsBlock
          title='Масслайкинг сторис'
          checkboxName='masslookingStoriesEnabled'
          fromName='masslookingStoriesFrom'
          toName='masslookingStoriesTo'
          isFormEnabled={isControlsEnabled}
          form={form}
          isControlsEnabled={masslookingStoriesEnabled}
        />
        <ControlsBlock
          title='Нажатие на реакции сторис'
          checkboxName='storiesActionsEnabled'
          fromName='storiesActionsFrom'
          toName='storiesActionsTo'
          isFormEnabled={isControlsEnabled}
          form={form}
          isControlsEnabled={storiesActionsEnabled}
        />
        <ControlsBlock
          title='Подписка на аккаунты'
          checkboxName='subscribitionsEnabled'
          fromName='subscribitionsFrom'
          toName='subscribitionsTo'
          isFormEnabled={isControlsEnabled}
          form={form}
          isControlsEnabled={subscribitionsEnabled}
        />

        <Button type='submit' size={'lg'} className='ml-auto' disabled={isControlsEnabled}>Сохранить</Button>
      </form>
    </Form>
  )
}

export default TagsActionsForm