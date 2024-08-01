import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Interval from '@/components/forms/fields/interval'
import Toggler from '@/components/forms/fields/toggler'
import Amount from '@/components/forms/fields/amount'
import { useEffect } from 'react'
import { ActionAccountsSchema, ActionAccountsFormValues } from './schema'

interface AccountsActionsProps {
  onSubmit: (values: ActionAccountsFormValues) => void;
  data: ActionAccountsFormValues;
  disabled: boolean;
}

const AccountsActionsForm = ({ onSubmit, data, disabled }: AccountsActionsProps) => {
  const form = useForm<ActionAccountsFormValues>({
    resolver: valibotResolver(ActionAccountsSchema),
    defaultValues: data,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const isControlsDisabled = !form.watch('people') || disabled;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-6'>
        <FormField
          control={form.control}
          name='people'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch id={field.name} name={field.name} checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                  <Label htmlFor={field.name}>Люди</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='users'
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

        <Button type='submit' size={'lg'} className='ml-auto' disabled={disabled}>Сохранить</Button>
      </form>
    </Form>
  )
}

export default AccountsActionsForm