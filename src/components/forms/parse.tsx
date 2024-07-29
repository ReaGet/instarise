import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { pipe, boolean, object, string, type InferOutput, minLength, transform, minValue } from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Toggler from './fields/toggler'
import Amount from './fields/amount'

const numberValidation = pipe(
  string(),
  transform((v) => Number(v)),
  minValue(1, 'Значение должно быть больше 0')
);


const formSchema = object({
  users: pipe(string(), minLength(1, 'Поле не может быть пустым')),

  subscribers: boolean(),
  subscribers_amount: numberValidation,
  subscribings: boolean(),
  subscribings_amount: numberValidation,
})

export type ParseFormValues = InferOutput<typeof formSchema>;

interface ParseProps {
  onSubmit: (values: ParseFormValues) => void;
  enabled: boolean
}

const ParseForm = ({ onSubmit, enabled }: ParseProps) => {
  const form = useForm<ParseFormValues>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      users: '',
      subscribers: false,
      subscribers_amount: 10,
      subscribings: false,
      subscribings_amount: 10,
    },
  });

  const isControlsEnabled = !enabled;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
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
        
        <Toggler title='Подписчики' name='subscribers' form={form} disabled={isControlsEnabled}>
          <Amount name='subscribers_amount' form={form} disabled={isControlsEnabled} />
        </Toggler>

        <Toggler title='Подписки' name='subscribings' form={form} disabled={isControlsEnabled}>
          <Amount name='subscribings_amount' form={form} disabled={isControlsEnabled} />
        </Toggler>

        <Button type='submit' size={'lg'} className='ml-auto' disabled={isControlsEnabled}>Сохранить</Button>
      </form>
    </Form>
  )
}

export default ParseForm