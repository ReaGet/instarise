import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils';
import React from 'react';
import type { Status } from '@/types';

interface Props {
  status: Status
  children?: React.ReactNode
}

type Variants = {
  [K in Status]: {
    text: string
    color: string
  }
}

const variants: Variants = {
  working: {
    text: 'Работает',
    color: 'text-green-600'
  },
  stop: {
    text: 'Отключен',
    color: 'text-gray-400'
  },
  pause: {
    text: 'Пауза',
    color: 'text-orange-400'
  },
  queue: {
    text: 'В очереди',
    color: 'text-primary'
  }
}

const StatusBadge = (props: Props) => {
  const { text, color } = variants[props.status] || {};
  return (
    <div className='flex'>
      <Badge variant='outline' className={cn('flex items-center gap-2 px-4 py-2 border-current', color)}>
        <div className='w-2 h-2 rounded-full bg-current'></div>
        <span className='whitespace-nowrap'>{text}</span>
      </Badge>
    </div>
  )
}

export default StatusBadge