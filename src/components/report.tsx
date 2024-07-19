import { cn } from '@/lib/utils';

export interface InfoBlock {
  title: string;
  value: number;
}

interface Props {
  className?: string;
  data: InfoBlock[];
}

const Report = ({ className = '', data = [] }: Props) => {
  return (
    <div className={cn('flex flex-wrap gap-8', className)}>
      { data.map(({ title, value }) => {
        return (
          <div className='flex flex-col gap-1 min-w-[150px] py-4 px-6 border rounded-lg' key={title}>
            <div className='text-[#d2d2d2] font-medium whitespace-nowrap'>{title}</div>
            <div className='text-3xl font-bold'>{value}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Report