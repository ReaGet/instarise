import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { FieldValues, Path, useForm } from 'react-hook-form';

interface IntervalProps<T extends FieldValues> {
  fromName: Path<T>;
  toName: Path<T>;
  disabled?: boolean;
  form: ReturnType<typeof useForm<T>>;
}

const Interval = <T extends FieldValues>({ form, disabled, fromName, toName }: IntervalProps<T>) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <FormField
          control={form.control}
          name={fromName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type='number' className='w-24' placeholder='От' disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span>—</span>
        <FormField
          control={form.control}
          name={toName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type='number' className='w-24' placeholder='До' disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription>Частота выполнения задачи в секундах</FormDescription>
    </div>
  )
}

export default Interval