import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '../ui/input'

const formSchema = z.object({
  accountsEnabled: z.boolean(),
  accounts: z.string().min(1, {
    message: 'Поле не может быть пустым',
  }),

  masslookingEnabled: z.boolean(),
  masslookingFrom: z.number().min(1, { message: 'Значение должно быть больше 0'}),
  masslookingTo: z.number().min(1, { message: 'Значение должно быть больше 0'}),
  
  masslookingStoriesEnabled: z.boolean(),
  masslookingStoriesFrom: z.number().min(1, { message: 'Значение должно быть больше 0'}),
  masslookingStoriesTo: z.number().min(1, { message: 'Значение должно быть больше 0'}),
  
  storiesActionsEnabled: z.boolean(),
  storiesActionsFrom: z.number().min(1, { message: 'Значение должно быть больше 0'}),
  storiesActionsTo: z.number().min(1, { message: 'Значение должно быть больше 0'}),
  
  subscribitionsEnabled: z.boolean(),
  subscribitionsFrom: z.number().min(1, { message: 'Значение должно быть больше 0'}),
  subscribitionsTo: z.number().min(1, { message: 'Значение должно быть больше 0'}),
})

export type ActionsFormValues = z.infer<typeof formSchema>;

interface ActionsProps {
  onSubmit: (values: ActionsFormValues) => void;
}

const ActionsForm = ({ onSubmit }: ActionsProps) => {
  const form = useForm<ActionsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountsEnabled: false,
      accounts: '',
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

  const isControlsEnabled = !form.watch('accountsEnabled');
  const isMasslookingEnabled = form.watch('masslookingEnabled') && !isControlsEnabled;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full max-w-[500px] gap-4'>
        <FormField
          control={form.control}
          name='accountsEnabled'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch id={field.name} name={field.name} checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor={field.name}>Люди</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <div className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='masslookingEnabled'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Switch id={field.name} name={field.name} checked={field.value} onCheckedChange={field.onChange} disabled={isControlsEnabled} />
                    <Label htmlFor={field.name}>Маслукинг</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          { isMasslookingEnabled && (<div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <FormField
                control={form.control}
                name='masslookingFrom'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='w-12' placeholder='От' disabled={isControlsEnabled} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span>—</span>
              <FormField
                control={form.control}
                name='masslookingTo'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className='w-12' placeholder='До' disabled={isControlsEnabled} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>Укажите частоту выполнения задачи в секундах</FormDescription>
          </div>)}
        </div>

        <Button type='submit' size={'lg'} className='ml-auto' disabled={isControlsEnabled}>Сохранить</Button>
      </form>
    </Form>
  )
}

export default ActionsForm