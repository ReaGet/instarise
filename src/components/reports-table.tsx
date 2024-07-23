import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReportsTableItem } from '@/app/types'

interface Props {
  reports: ReportsTableItem[]
}

const ReportsTable = ({ reports = [] }: Props) => {
  return (
    <Table className='mt-8'>
      { !reports.length && (
        <TableCaption key='caption'>Вы еще не создали задачи</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className='w-[300px]'>Время и дата начала</TableHead>
          <TableHead className='w-[200px]'>Тип задачи</TableHead>
          <TableHead>Прогресс</TableHead>
          <TableHead>Статус задачи</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

      { reports.map((r) => {
        return (
          <TableRow key={r.id}>
            <TableCell>{r.createdAt}</TableCell>
            <TableCell className='font-bold'>{r.taskType}</TableCell>
            <TableCell>{r.progress}</TableCell>
            <TableCell>{r.taskStatus}</TableCell>
          </TableRow>
        )
      })}
        
      </TableBody>
    </Table>
  )
}

export default ReportsTable