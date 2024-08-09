import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { FieldValues, Path, useForm } from 'react-hook-form';
import { handleNumberValue } from './utils';

interface IntervalProps<T extends FieldValues> {
  fromName: Path<T>;
  toName: Path<T>;
  disabled?: boolean;
  form: ReturnType<typeof useForm<T>>;
  children?: React.ReactNode;
}

const Interval = <T extends FieldValues>({ form, disabled, fromName, toName, children }: IntervalProps<T>) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <FormField
          control={form.control}
          name={fromName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(handleNumberValue(e.target.value))}
                  min='1'
                  type='number'
                  className='w-24'
                  placeholder='От'
                  disabled={disabled}
                />
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
                <Input
                  {...field}
                  onChange={(e) => field.onChange(handleNumberValue(e.target.value))}
                  min='1'
                  type='number'
                  className='w-24'
                  placeholder='До'
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription>{ children || 'Частота выполнения задачи в секундах' }</FormDescription>
    </div>
  )
}

export default Interval