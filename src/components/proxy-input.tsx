import React, { forwardRef, useEffect, useReducer, useState } from 'react'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { FieldValues, Path, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { fetchProxyCheck } from '@/app/api/proxy';
import { Ban, Check, CircleX, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProxyProps<T extends FieldValues> {
  name: Path<T>;
  disabled?: boolean;
  form: ReturnType<typeof useForm<T>>;
}

const proxyCheck = z.string().ip();

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

const ProxyInput = <T extends FieldValues>({ form, name }: ProxyProps<T>) => {
  const { state, setStatus, reset } = useProxy();

  const proxyValue = form.watch(name);
  let isValidProxyValue = false;
  try {
    proxyCheck.parse(proxyValue);
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
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Прокси</FormLabel>
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
  )
}

export default ProxyInput