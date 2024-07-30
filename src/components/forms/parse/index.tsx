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

interface ParseProps {
  onSubmit: (values: ParseFormValues) => void;
  data: ParseFormValues
}

const ParseForm = ({ onSubmit, data }: ParseProps) => {
  const form = useForm<ParseFormValues>({
    resolver: valibotResolver(ParseSchema),
    defaultValues: data,
  });
  
  useEffect(() => {
    form.reset(data);
  }, [data]);

  const isControlsEnabled = !form.watch('parsing');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormField
          control={form.control}
          name='parsing'
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
          name='users'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} {...field} disabled={isControlsEnabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Toggler title='Подписчики' name='followers' form={form} disabled={isControlsEnabled}>
          <Amount name='followers_amount' form={form} disabled={isControlsEnabled} />
        </Toggler>

        <Toggler title='Подписки' name='followings' form={form} disabled={isControlsEnabled}>
          <Amount name='followings_amount' form={form} disabled={isControlsEnabled} />
        </Toggler>

        <Button type='submit' size={'lg'} className='ml-auto'>Сохранить</Button>
      </form>
    </Form>
  )
}

export default ParseForm