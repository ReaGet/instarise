import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { pipe, object, number, string, type InferOutput, minLength } from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Interval from './fields/interval'
import { Input } from '../ui/input'

const formSchema = object({
  tags: pipe(string(), minLength(1, 'Поле не может быть пустым')),

  posts_amount: number('Значение должно быть больше 0'),
  timeout_form: number('Значение должно быть больше 0'),
  timeout_to: number('Значение должно быть больше 0'),
})

export type TagsActionsFormValues = InferOutput<typeof formSchema>;

interface TagsActionsProps {
  onSubmit: (values: TagsActionsFormValues) => void;
  enabled: boolean
}

const TagsActionsForm = ({ onSubmit, enabled }: TagsActionsProps) => {
  const form = useForm<TagsActionsFormValues>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      tags: '',
      posts_amount: 10,
      timeout_form: 1,
      timeout_to: 2,
    },
  });

  const isControlsEnabled = !enabled;

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
        <Interval fromName='timeout_form' toName='timeout_to' form={form} disabled={isControlsEnabled} />
        <FormField
          control={form.control}
          name='posts_amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Глубина выполнения</FormLabel>
              <FormControl>
                <Input type='number' {...field} disabled={isControlsEnabled} className='max-w-[200px]' />
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

export default TagsActionsForm