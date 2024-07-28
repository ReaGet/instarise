import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Report } from '@/app/services/reportApi'
import { useDateFormatter } from '@/hooks/useDateFormatter'
import StatusBadge from './status-badge'
import { AccountStatus } from '@/app/types'

interface Props {
  reports: Report[]
}

const Status: Record<AccountStatus, string> = {
  working: 'Работает',
  pause: 'Пауза',
  finish: 'Завершен',
  stop: 'Отключен',
}

const ReportsTable = ({ reports = [] }: Props) => {
  const format = useDateFormatter();
  return (
    <Table className='mt-8'>
      { !reports.length && (
        <TableCaption key='caption'>Вы еще не создали задачи</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className='w-[200px]'>Время и дата начала</TableHead>
          <TableHead className='w-[200px]'>Тип задачи</TableHead>
          <TableHead>Прогресс</TableHead>
          <TableHead className='text-right'>Статус задачи</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

      { reports.map((r) => {
        return (
          <TableRow key={r.id}>
            <TableCell className='text-xs'>{format(r.time_start)}</TableCell>
            <TableCell className='font-bold'>{r.action_type}</TableCell>
            <TableCell>{r.progress}</TableCell>
            <TableCell className='text-right'>
              { Status[r.status] }
              { r.status === 'finish' && (
                <span className='ml-2 text-xs'>({ format(r.time_end) })</span>
              ) }
            </TableCell>
          </TableRow>
        )
      })}
        
      </TableBody>
    </Table>
  )
}

export default ReportsTable