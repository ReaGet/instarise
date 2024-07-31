import { useEffect, useReducer } from 'react'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { FieldValues, Path, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { parse, ipv4, pipe, string } from 'valibot'
import { fetchProxyCheck } from '@/app/api/proxy';
import { Ban, Check, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProxyProps<T extends FieldValues> {
  name: Path<T>;
  disabled?: boolean;
  form: ReturnType<typeof useForm<T>>;
  className?: string;
}
const proxySchema = pipe(string(), ipv4())
const proxyCheck = (value: string) => parse(proxySchema, value)

interface ProxyState {
  status: 'initial' | 'loading' | 'valid' | 'wrong'
}

const reducer = (state: ProxyState, action: any): ProxyState => {
  switch(action.type) {
    case 'SET_STATUS':
      return { ...state, 'status': action.payload }
  }
  return state;
}

const initalState: ProxyState = {
  status: 'initial',
}

const useProxy = () => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const setStatus = (value: ProxyState['status']) => {
    dispatch({ type: 'SET_STATUS', payload: value });
  }

  const reset = () => {
    setStatus('initial');
  }


  return { state, setStatus, reset };
}

const ProxyInput = <T extends FieldValues>({ form, name, className = '' }: ProxyProps<T>) => {
  const { state, setStatus, reset } = useProxy();

  const proxyValue = form.watch(name);
  let isValidProxyValue = false;
  try {
    proxyCheck(proxyValue);
    isValidProxyValue = true;
  } catch(e) {
    isValidProxyValue = false;
  }

  useEffect(() => {
    reset();
  }, [proxyValue])

  async function checkProxy() {
    if (state.status !== 'initial') return;

    setStatus('loading');
    fetchProxyCheck(proxyValue).then((result) => {
      setStatus(result ? 'valid' : 'wrong');
    });
  }

  const CheckButtonChild = () => {
    switch(state.status) {
      case 'loading': return <Loader className='w-5 h-5' />
      case 'valid': return <Check className='w-5 h-5' />
      case 'wrong': return <Ban className='w-5 h-5' />
      default: return 'Проверить';
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <FormLabel>Прокси</FormLabel>
      <div className={cn('flex gap-2', className)}>
        <div className="w-[120px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Тип прокси" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Тип прокси</SelectLabel>
                <SelectItem value='http'>HTTP</SelectItem>
                <SelectItem value='https'>HTTPS</SelectItem>
                <SelectItem value='socks4'>Socks 4</SelectItem>
                <SelectItem value='socks5'>Socks 5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <div className='relative flex items-center'>
                  <Input {...field} className='py-4' />
                  { isValidProxyValue && (
                    <Button
                      className={cn(
                        'absolute h-7 px-2 right-2 cursor-pointer text-[0.6rem]',
                        { 'bg-green-600 hover:bg-green-700': state.status === 'valid' },
                        { 'bg-[#cb3939] hover:bg-[#b72b2b]': state.status === 'wrong' }
                      )}
                      asChild
                      onClick={checkProxy}
                    >
                      <div>
                        <CheckButtonChild />
                      </div>
                    </Button> )
                  }
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default ProxyInput