import React from 'react'
import StatusBadge from '../status-badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

interface BlockProps {
  children: React.ReactNode;
  heading: string;
}

function InfoBlock({ children, heading }: BlockProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-base text-primary font-bold'>{ heading }</div>
      <div>{ children }</div>
    </div>
  )
}

const InfoSidebar = () => {
  return (
    <aside className='flex flex-col gap-6 w-[200px] lg:w-[300px] h-full py-6 pl-6 border-l'>
      <InfoBlock heading='Статус аккаунта'>
        <StatusBadge status='working' />
      </InfoBlock>
      <InfoBlock heading='Описание'>
        <Textarea rows={4} />
      </InfoBlock>
      <InfoBlock heading='Прокси'>
        <Input />
      </InfoBlock>
    </aside>
  )
}

export default InfoSidebar