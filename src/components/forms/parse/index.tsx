import { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Toggler from '@/components/forms/fields/toggler'
import Amount from '@/components/forms/fields/amount'
import { ParseSchema, ParseFormValues } from './schema'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'

interface ParseProps {
  onSubmit: (values: ParseFormValues) => void;
  data: ParseFormValues;
  disabled: boolean;
  isLoading: boolean;
}

const ParseForm = ({ onSubmit, data, disabled, isLoading }: ParseProps) => {
  const form = useForm<ParseFormValues>({
    resolver: valibotResolver(ParseSchema),
    defaultValues: data,
  });
  
  useEffect(() => {
    form.reset(data);
  }, [data]);

  const isControlsDisabled = !form.watch('parsing') || disabled;

  function handleSubmit(values: ParseFormValues) {
    if (values.parsing && !values.users.length) {
      form.setError('users', {
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
          name='parsing'
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
        
        <Toggler title='Подписчики' name='followers' form={form} disabled={isControlsDisabled}>
          <Amount name='followers_amount' form={form} disabled={isControlsDisabled} />
        </Toggler>

        <Toggler title='Подписки' name='followings' form={form} disabled={isControlsDisabled}>
          <Amount name='followings_amount' form={form} disabled={isControlsDisabled} />
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

export default ParseForm