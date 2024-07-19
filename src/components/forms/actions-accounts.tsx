import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import Interval from './fields/interval'
import Toggler from './fields/toggler'
import Amount from './fields/amount'

const numberValidation = z.coerce.number().min(1, { message: 'Значение должно быть больше 0'});

const formSchema = z.object({
  accounts: z.string().min(1, {
    message: 'Поле не может быть пустым',
  }),
  timeout_form: numberValidation,
  timeout_to: numberValidation,
  follow: z.boolean(),
  // Posts
  posts_like: z.boolean(),
  posts_timeout_form: numberValidation,
  posts_timeout_to: numberValidation,
  posts_amount: numberValidation,
  // Stories
  stories_like: z.boolean(),
  stories_timeout_form: numberValidation,
  stories_timeout_to: numberValidation,
  stories_amount: numberValidation,
  // Reels
  reels_like: z.boolean(),
  reels_timeout_form: numberValidation,
  reels_timeout_to: numberValidation,
  reels_amount: numberValidation,
})

export type AccountsActionsFormValues = z.infer<typeof formSchema>;

interface AccountsActionsProps {
  onSubmit: (values: AccountsActionsFormValues) => void;
  enabled: boolean
}

const AccountsActionsForm = ({ onSubmit, enabled }: AccountsActionsProps) => {
  const form = useForm<AccountsActionsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accounts: '',
      timeout_form: 1,
      timeout_to: 2,
      follow: false,
      // Posts
      posts_like: false,
      posts_timeout_form: 1,
      posts_timeout_to: 1,
      posts_amount: 30,
      // Stories
      stories_like: false,
      stories_timeout_form: 1,
      stories_timeout_to: 1,
      stories_amount: 30,
      // Reels
      reels_like: false,
      reels_timeout_form: 1,
      reels_timeout_to: 1,
      reels_amount: 30,
    },
  });

  const isControlsEnabled = !enabled;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-6'>
        <FormField
          control={form.control}
          name='accounts'
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
        
        <Toggler title='Подписаться по списку' name='follow' form={form} disabled={isControlsEnabled} />

        <Toggler title='Пролайкать посты' name='posts_like' form={form} disabled={isControlsEnabled}>
          <Interval fromName='posts_timeout_form' toName='posts_timeout_to' form={form} disabled={isControlsEnabled} />
          <Amount name='posts_amount' form={form} disabled={isControlsEnabled} />
        </Toggler>

        <Toggler title='Сторис' name='stories_like' form={form} disabled={isControlsEnabled}>
          <Interval fromName='stories_timeout_form' toName='stories_timeout_to' form={form} disabled={isControlsEnabled} />
          <Amount name='stories_amount' form={form} disabled={isControlsEnabled} />
        </Toggler>

        <Toggler title='Поставить лайк на рилсы' name='reels_like' form={form} disabled={isControlsEnabled}>
          <Interval fromName='reels_timeout_form' toName='reels_timeout_to' form={form} disabled={isControlsEnabled} />
          <Amount name='reels_amount' form={form} disabled={isControlsEnabled} />
        </Toggler>

        <Button type='submit' size={'lg'} className='ml-auto' disabled={isControlsEnabled}>Сохранить</Button>
      </form>
    </Form>
  )
}

export default AccountsActionsForm