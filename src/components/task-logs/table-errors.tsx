import type { LogsErrorType, TaskLogType } from '@/app/services/reportApi'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { mapHashtagErrors, mapPeopleLogs } from './utils'

type Props = {
  data: LogsErrorType
}

const dataExists = (data: object = {}) => {
  return data && Object.keys(data).length > 0
}

const LogsBlock = <T extends object, K extends keyof T>({ data, type }: { data: T; type: K }) => {
  let entries: [string, TaskLogType][] = []
  const isPeople = type === 'people'

  if (isPeople) {
    entries = mapPeopleLogs(data)
  } else {
    entries = mapHashtagErrors(data)
  }

  return (
    <div className='flex flex-col'>
      <Table className='mt-1'>
        { !entries.length && (
          <TableCaption key='caption'>Пусто</TableCaption>
        )}
        <TableHeader className='text-xs'>
          <TableRow>
            <TableHead className='w-[150px]'>{ isPeople ? 'Аккаунт' : 'Хештег' }</TableHead>
            <TableHead>Ошибка</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

        { entries.map(([key, taskInfo], i) => {
          if (!dataExists(taskInfo)) return <TableRow key={key}></TableRow>
          const text: string = ('error' in taskInfo) ? taskInfo.error as string : 'Неизвестная ошибка'
          return (
            <TableRow key={i} className='text-xs'>
              <TableCell>{isPeople ? '@' : '#' }{key}</TableCell>
              <TableCell>{text}</TableCell>
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
    </div>
  )
}

const LogsBlockCard = <T extends object, K extends keyof T>({ data, type }: { data: T; type: K }) => {
  if (!data) return null

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle>По { type === 'people' ? 'людям' : 'тегам' }</CardTitle>
      </CardHeader>
      <CardContent>
        <LogsBlock data={data} type={type} />
      </CardContent>
    </Card>
  )
}

const TableErrors = ({ data }: Props) => {
  const { people, hashtags } = data

  return (
    <section className='flex flex-col gap-5'>
      <LogsBlockCard data={people} type='people' />
      <LogsBlockCard data={hashtags} type='hashtags' />
    </section>
  )
}

export default TableErrors