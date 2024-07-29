import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { FieldValues, Path, useForm } from 'react-hook-form';

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
            <Input type='number' {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={disabled} className='max-w-[200px]' />
          </FormControl>
          <FormMessage />
          <FormDescription>Глубина выполнения</FormDescription>
        </FormItem>
      )}
    />
  )
}

export default Amount