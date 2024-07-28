import { Account } from '@/app/services/accountApi';
import { cn } from '@/lib/utils';

export interface InfoBlock {
  title: string;
  value: number;
}

interface Props {
  className?: string;
  accounts: Account[];
}

const ReportBlock = ({ title, value }: { title: string, value: number }) => {
  return (
    <div className='flex flex-col gap-1 min-w-[150px] py-4 px-6 border rounded-lg'>
      <div className='text-[#d2d2d2] font-medium whitespace-nowrap'>{title}</div>
      <div className='text-3xl font-bold'>{value}</div>
    </div>
  )
}

const Report = ({ className = '', accounts = [] }: Props) => {
  let turnedOnCount = 0,
    turnedOffCount = 0,
    pausedCount = 0;

  accounts.forEach(a => {
    switch(a.status) {
      case 'working': turnedOnCount++; break;
      case 'stop': turnedOffCount++; break;
      case 'pause': pausedCount++; break;
    }
  })

  return (
    <div className={cn('flex flex-wrap gap-8', className)}>
      <ReportBlock title='Всего аккаунтов' value={accounts.length} />
      {turnedOnCount > 0 && <ReportBlock title='Включено' value={turnedOnCount} />}
      {turnedOffCount > 0 && <ReportBlock title='Отключено' value={turnedOffCount} />}
      {pausedCount > 0 && <ReportBlock title='На паузе' value={pausedCount} />}
    </div>
  )
}

export default Report