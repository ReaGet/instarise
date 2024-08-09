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
import Toggler from '../fields/toggler'
import Amount from '../fields/amount'
import { Spinner } from '@/components/ui/spinner'
import { handleNumberValue } from '../fields/utils'

interface TagsActionsProps {
  onSubmit: (values: ActionTagsFormValues) => void;
  data: ActionTagsFormValues
  disabled: boolean;
  isLoading: boolean;
}

const TagsActionsForm = ({ onSubmit, data, disabled, isLoading }: TagsActionsProps) => {
  const form = useForm<ActionTagsFormValues>({
    resolver: valibotResolver(ActionTagsSchema),
    defaultValues: data,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const isControlsDisabled = !form.watch('tags') || disabled;

  function handleSubmit(values: ActionTagsFormValues) {
    if (values.tags && !values.hashtags.length) {
      form.setError('hashtags', {
        message: 'Поле не может быть пустым',
      })
      return
    }
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch id={field.name} name={field.name} checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
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
                <Textarea rows={8} {...field} disabled={isControlsDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Interval fromName='timeout_from' toName='timeout_to' form={form} disabled={isControlsDisabled} />

        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Глубина выполнения</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field} onChange={(e) => field.onChange(handleNumberValue(e.target.value))}
                  disabled={isControlsDisabled}
                  className='max-w-[200px]'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Toggler title='Подписаться по списку' name='follow' form={form} disabled={isControlsDisabled} />

        <Toggler title='Пролайкать посты' name='posts_like' form={form} disabled={isControlsDisabled}>
          <Interval fromName='posts_timeout_from' toName='posts_timeout_to' form={form} disabled={isControlsDisabled} />
          <Amount name='posts_amount' form={form} disabled={isControlsDisabled} />
        </Toggler>

        <Toggler title='Сторис' name='stories_like' form={form} disabled={isControlsDisabled}>
          <Interval fromName='stories_timeout_from' toName='stories_timeout_to' form={form} disabled={isControlsDisabled} />
          <Amount name='stories_amount' form={form} disabled={isControlsDisabled} />
        </Toggler>

        <Toggler title='Поставить лайк на рилсы' name='reels_like' form={form} disabled={isControlsDisabled}>
          <Interval fromName='reels_timeout_from' toName='reels_timeout_to' form={form} disabled={isControlsDisabled} />
          <Amount name='reels_amount' form={form} disabled={isControlsDisabled} />
        </Toggler>

        <Button type='submit' size={'lg'} className='ml-auto' disabled={disabled || isLoading}>
          { isLoading
            ? <Spinner className='w-6 h-6 text-white' />
            : 'Сохранить'
          }
        </Button>
      </form>
    </Form>
  )
}

export default TagsActionsForm