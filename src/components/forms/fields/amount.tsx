import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { FieldValues, Path, useForm } from 'react-hook-form';
import { handleNumberValue } from './utils';

interface AmountProps<T extends FieldValues> {
  name: Path<T>;
  disabled?: boolean;
  form: ReturnType<typeof useForm<T>>;
}

const Amount = <T extends FieldValues>({ form, disabled, name }: AmountProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              onChange={(e) => field.onChange(handleNumberValue(e.target.value))}
              min={1}
              type='number'
              disabled={disabled}
              className='max-w-[200px]'
            />
          </FormControl>
          <FormMessage />
          <FormDescription>Глубина выполнения</FormDescription>
        </FormItem>
      )}
    />
  )
}

export default Amount