import { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Interval from '@/components/forms/fields/interval'
import { ActionTagsSchema, ActionTagsFormValues } from './schema'

interface TagsActionsProps {
  onSubmit: (values: ActionTagsFormValues) => void;
  data: ActionTagsFormValues
}

const TagsActionsForm = ({ onSubmit, data }: TagsActionsProps) => {
  const form = useForm<ActionTagsFormValues>({
    resolver: valibotResolver(ActionTagsSchema),
    defaultValues: data,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const isControlsEnabled = !form.watch('tags');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch id={field.name} name={field.name} checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor={field.name}>Теги</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='hashtags'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} {...field} disabled={isControlsEnabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Interval fromName='timeout_from' toName='timeout_to' form={form} disabled={isControlsEnabled} />

        <FormField
          control={form.control}
          name='amount'
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

        <Button type='submit' size={'lg'} className='ml-auto'>Сохранить</Button>
      </form>
    </Form>
  )
}

export default TagsActionsForm