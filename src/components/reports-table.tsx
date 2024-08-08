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
import { AccountStatus } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'

interface Props {
  reports: Report[]
}

const Status: Record<AccountStatus, string> = {
  working: 'Работает',
  paused: 'Пауза',
  finished: 'Завершен',
  stopped: 'Отключен',
}

const ActionTypeMapper = {
  action: 'Действие',
  parsing: 'Сбор данных',
}

const ReportProgress = ({ text, isError }: { text: string, isError: boolean}) => {
  if (!text) return null

  return (
    <div className='flex items-center gap-1'>
      { text }
      { isError && (
        <Button variant='ghost' size='sm' className='w-7 h-7 p-0'>
          <Info className='w-4 h-4 text-red-500' />
        </Button>
      )}
    </div>
  )
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
          <TableRow key={r.id} className='text-xs'>
            <TableCell>{format(r.time_start)}</TableCell>
            <TableCell>{ActionTypeMapper[r.action_type]}</TableCell>
            <TableCell>
              <div className='flex flex-col gap-[0.1rem]'>
                <ReportProgress text={r.progress_people} isError={r.is_error_people} />
                <ReportProgress text={r.progress_hashtags} isError={r.is_error_hashtags} />
              </div>
            </TableCell>
            <TableCell className='text-right'>
              { Status[r.status] }
              { r.status === 'finished' && (
                <span className='ml-2'>({ format(r.time_end) })</span>
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