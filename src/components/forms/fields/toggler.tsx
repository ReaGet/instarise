import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import type { FieldValues, Path, useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface TogglerProps<T extends FieldValues> {
  title: string;
  children?: React.ReactNode;
  name: Path<T>;
  disabled?: boolean;
  form: ReturnType<typeof useForm<T>>;
}

const Toggler = <T extends FieldValues>({ title, form, disabled, name, children }: TogglerProps<T>) => {
  const isEnabled = form.watch(name) && !disabled;
  return (
    <div className='flex flex-col gap-4'>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center gap-2">
                <Switch id={field.name} name={field.name} checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
                <Label htmlFor={field.name}>{title} </Label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      { isEnabled && children }
    </div>
  )
}


export default Toggler