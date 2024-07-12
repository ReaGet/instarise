import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils';
import React from 'react'

type Status = 'working' | 'stop';

interface Props {
  status: Status
  children?: React.ReactNode
}

const variants = {
  working: {
    text: 'Работает',
    color: 'text-green-600'
  },
  stop: {
    text: 'Отключен',
    color: 'text-primary'
  }
}

const StatusBadge = (props: Props) => {
  const { text, color } = variants[props.status] || {};
  return (
    <div className='flex'>
      <Badge variant='outline' className={cn('flex items-center gap-2 px-4 py-2', color)}>
        <div className='w-2 h-2 rounded-full bg-current'></div>
        <span>{text}</span>
      </Badge>
    </div>
  )
}

export default StatusBadge