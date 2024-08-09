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
import { ChevronRight, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ACCOUNT } from '@/consts'

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

const ReportProgress = ({ text, isError, data }: { text: string, isError: boolean, data: Report }) => {
  if (!text) return null
  const isCanSeeLogs = ['finished', 'paused'].includes(data.status)
  const link = data.action_type === 'parsing' ? 'parse' : 'logs'

  return (
    <div className='flex items-center gap-1'>
      { text }
      { isError && (
        <Button variant='ghost' size='sm' className='shrink-0 w-7 h-7 p-0' asChild>
          { isCanSeeLogs
            ? (
              <Link to={`${ACCOUNT}/${data.client_id}/${link}/${data.id}#errors`}>
                <Info className='w-4 h-4 text-red-500' />
              </Link>
            ) : <div><Info className='w-4 h-4 text-red-500' /></div>
          }
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
          <TableHead className='w-[180px]'>Время и дата начала</TableHead>
          <TableHead className='w-[100px]'>Тип задачи</TableHead>
          <TableHead>Прогресс</TableHead>
          <TableHead className='text-right'>Статус задачи</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

      { reports.map((r) => {
        const link = r.action_type === 'parsing' ? 'parse' : 'logs'

        return (
          <TableRow key={r.id} className='text-xs'>
            <TableCell>{format(r.time_start)}</TableCell>
            <TableCell>{ActionTypeMapper[r.action_type]}</TableCell>
            <TableCell>
              <div className='flex flex-col'>
                <ReportProgress text={r.progress_people} isError={r.is_error_people} data={r} />
                <ReportProgress text={r.progress_hashtags} isError={r.is_error_hashtags} data={r} />
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center justify-end'>
                { Status[r.status] }
                { r.status === 'finished' && (
                  <span className='ml-2'>({ format(r.time_end) })</span>
                ) }
                { ['finished', 'paused'].includes(r.status) && (
                  <Button variant='ghost' size='sm' className='shrink-0 w-7 h-7 p-0 ml-1' asChild>
                    <Link to={`${ACCOUNT}/${r.client_id}/${link}/${r.id}`}>
                      <ChevronRight className='w-4 h-4' />
                    </Link>
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        )
      })}
      </TableBody>
    </Table>
  )
}

export default ReportsTable