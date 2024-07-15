import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import type { FieldValues, Path } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '../ui/input'

interface ControlsBlockProps<T extends FieldValues> {
  title: string;
  checkboxName: Path<T>;
  fromName: Path<T>;
  toName: Path<T>;
  isFormEnabled: boolean;
  isControlsEnabled: boolean;
  form: ReturnType<typeof useForm<T>>
}

function ControlsBlock<T extends FieldValues>({ title, checkboxName, fromName, toName, isFormEnabled, isControlsEnabled, form }: ControlsBlockProps<T>) {
  return (
    <div className='flex flex-col gap-4'>
      <FormField
        control={form.control}
        name={checkboxName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center gap-2">
                <Switch id={field.name} name={field.name} checked={field.value} onCheckedChange={field.onChange} disabled={isFormEnabled} />
                <Label htmlFor={field.name}>{title}</Label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      { isControlsEnabled && (<div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3'>
          <FormField
            control={form.control}
            name={fromName}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type='number' className='w-24' placeholder='От' disabled={isFormEnabled} />
                </FormControl>
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
                  <Input {...field} type='number' className='w-24' placeholder='До' disabled={isFormEnabled} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormDescription>Укажите частоту выполнения задачи в секундах</FormDescription>
      </div>)}
    </div>
  )
}

export default ControlsBlock