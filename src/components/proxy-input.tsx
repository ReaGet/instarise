import { useEffect, useReducer, useState } from 'react'
import { Input } from '@/components/ui/input'
import { FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button';
import { parse, pipe, string, minLength } from 'valibot'
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
import { useLazyCheckProxyQuery } from '@/app/services/accountApi';

interface ProxyProps {
  onChange: (newValue: string) => void;
  className?: string;
  value?: string;
  disabled?: boolean;
}
const proxySchema = pipe(string(), minLength(1))
const proxyCheck = (value: string) => parse(proxySchema, value)

interface ProxyState {
  status: 'initial' | 'loading' | 'valid' | 'wrong'
}

const reducer = (state: ProxyState, action: { type: string, payload: ProxyState['status'] }): ProxyState => {
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

export const splitProxy = (value: string): [string, string] => {
  const type = value.match(/(socks(4|5)|https?):\/\//)?.[0] || 'socks5://',
    initValue = value.split('://')?.pop() || ''
  return [type, initValue]
}

export const concatProxyWithType = (type: string, value: string = '') => {
  return !value.trim() ? '' : `${type}${value}` 
}

export const normalizeProxy = (value: string = '') => {
  return concatProxyWithType(...splitProxy(value))
}

const ProxyInput = ({ onChange, className = '', value = '', disabled = false }: ProxyProps) => {
  const { state, setStatus, reset } = useProxy()
  const [proxyValue, setProxyValue] = useState('')
  const [proxyType, setProxyType] = useState('socks5://')
  const [checkProxyRequest] = useLazyCheckProxyQuery();

  let isValidProxyValue = false;
  try {
    proxyCheck(proxyValue);
    isValidProxyValue = true;
  } catch(e) {
    isValidProxyValue = false;
  }

  useEffect(() => {
    if (value) {
      const [type, initValue] = splitProxy(value)
      setProxyType(type)
      setProxyValue(initValue)
    }
    reset()
  }, [])

  useEffect(() => {
    reset()
  }, [proxyValue, proxyType])

  async function checkProxy() {
    if (state.status !== 'initial') return;

    setStatus('loading');
    checkProxyRequest(`${proxyType}${proxyValue}`).then(({ data }) => {
      setStatus(data ? 'valid' : 'wrong');
    });
  }

  function handleProxyChange(value: string) {
    const [type, newValue] = splitProxy(value)
    setProxyType(type)
    setProxyValue(newValue)
    onChange(concatProxyWithType(proxyType, value))
  }

  function handleTypeChange(value: string) {
    setProxyType(value);
    onChange(concatProxyWithType(value, proxyValue))
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
          <Select onValueChange={(value) => handleTypeChange(value)} value={proxyType} disabled={disabled}>
            <SelectTrigger>
              <SelectValue placeholder="Тип прокси" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Тип прокси</SelectLabel>
                <SelectItem value='https://'>HTTPS</SelectItem>
                <SelectItem value='socks5://'>Socks 5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='relative flex items-center flex-1'>
          <Input className='py-4' value={proxyValue} onChange={(event) => handleProxyChange(event.target.value)} disabled={disabled} />
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
              { !disabled && (
                <div>
                  <CheckButtonChild />
                </div>
              )}
            </Button> )
          }
        </div>
      </div>
    </div>
  )
}

export default ProxyInput