import { LogsSuccessType, TaskLogType } from '@/app/services/reportApi'
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
import { mapHashtagLogs, mapPeopleLogs } from './utils'

type Props = {
  data: LogsSuccessType
}

const dataExists = (data: object = {}) => {
  return data && Object.keys(data).length > 0
}

const LogsBlock = <T extends object, K extends keyof T>({ data, type }: { data: T; type: K }) => {
  let entries: [string, TaskLogType][] = []
  const isPeople = type === 'people'

  if (isPeople) {
    entries = mapPeopleLogs(data)
    console.log('people', entries)
  } else {
    entries = mapHashtagLogs(data)
  }

  return (
    <div className='flex flex-col'>
      <Table className='mt-1'>
        { !entries.length && (
          <TableCaption key='caption'>Пусто</TableCaption>
        )}
        <TableHeader className='text-xs'>
          <TableRow>
            <TableHead>{ isPeople ? 'Аккаунт' : 'Хештег' }</TableHead>
            <TableHead>Подписка</TableHead>
            <TableHead className='text-center'>Лайки (посты)</TableHead>
            <TableHead className='text-center'>Лайки (сторис)</TableHead>
            <TableHead className='text-center'>Лайки (рилсы)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

        { entries.map(([key, taskInfo], i) => {
          if (!dataExists(taskInfo)) return <TableRow key={key}></TableRow>

          return (
            <TableRow key={i} className='text-xs'>
              <TableCell>{isPeople ? '@' : '#' }{key}</TableCell>
              <TableCell>{taskInfo.follow}</TableCell>
              <TableCell className='text-center'>{taskInfo.posts_like}</TableCell>
              <TableCell className='text-center'>{taskInfo?.stories_like}</TableCell>
              <TableCell className='text-center'>{taskInfo.reels_like}</TableCell>
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

const TableLogs = ({ data }: Props) => {
  const { people, hashtags } = data

  return (
    <section className='flex flex-col gap-5'>
      <LogsBlockCard data={people} type='people' />
      <LogsBlockCard data={hashtags} type='hashtags' />
    </section>
  )
}

export default TableLogs