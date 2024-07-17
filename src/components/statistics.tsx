import { cn } from '@/lib/utils';

interface Props {
  className: string;
}

const Statistics = (props: Props) => {
  return (
    <div className={cn('flex gap-8', props.className)}>
      <div className='flex flex-col gap-1 min-w-[150px] py-4 px-6 border rounded-lg'>
        <div className='text-[#d2d2d2] font-medium'>Всего аккаунтов</div>
        <div className='text-3xl font-bold'>15</div>
      </div>

      <div className='flex flex-col gap-1 min-w-[150px] py-4 px-6 border rounded-lg'>
        <div className='text-[#d2d2d2] font-medium'>В работе</div>
        <div className='text-3xl font-bold'>7</div>
      </div>

      <div className='flex flex-col gap-1 min-w-[150px] py-4 px-6 border rounded-lg'>
        <div className='text-[#d2d2d2] font-medium'>Завершили работу</div>
        <div className='text-3xl font-bold'>8</div>
      </div>
    </div>
  )
}

export default Statistics