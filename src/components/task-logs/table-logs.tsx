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

type Props = {
  data: LogsSuccessType
}

const dataExists = (data: object = {}) => {
  return data && Object.keys(data).length > 0
}

// const taskMapper = {
//   follow: 'Подписаться',
//   posts_like: 'Пролайкано постов',
//   stories_like: 'Пролайкано сторис',
//   reels_like: 'Пролайкано рилсов',
// }

const LogsBlock = <T extends object, K extends keyof T>({ data, type }: { data: T; type: K }) => {
  const entries: [string, TaskLogType][] = Object.entries(data)
  return (
    <div className='flex flex-col py-3 _px-4 _border rounded-md'>
      {/* <h3 className='px-2 text-base font-semibold'>{type === 'people' ? 'Люди' : 'Теги'}</h3> */}

      <Table className='mt-1'>
      <TableCaption>Действия по { type === 'people' ? 'людям' : 'тегам' }</TableCaption>
      { !entries.length && (
        <TableCaption key='caption'>Пусто</TableCaption>
      )}
      <TableHeader className='text-xs'>
        <TableRow>
          <TableHead>Аккаунт</TableHead>
          <TableHead>Подписка</TableHead>
          <TableHead className='text-center'>Лайки (посты)</TableHead>
          <TableHead className='text-center'>Лайки (сторис)</TableHead>
          <TableHead className='text-center'>Лайки (рилсы)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

      { entries.map(([key, taskInfo]) => {
        if (!dataExists(taskInfo)) return <TableRow key={key}></TableRow>

        return (
          <TableRow key={key} className='text-xs'>
            <TableCell>@{key}</TableCell>
            <TableCell>{taskInfo.follow ? 'Подписано' : ''}</TableCell>
            <TableCell className='text-center'>{taskInfo.posts_like}</TableCell>
            <TableCell className='text-center'>{taskInfo.stories_like}</TableCell>
            <TableCell className='text-center'>{taskInfo.reels_like}</TableCell>
          </TableRow>
        )
      })}
      </TableBody>
    </Table>
    </div>
  )
}

const TableLogs = ({ data }: Props) => {
  const { people, hashtags } = data

  return (
    <section className='flex flex-col gap-5'>
      <h2 className='-mb-5 text-sm font-bold'>Выполнено</h2>
      { dataExists(people) && <LogsBlock data={people} type='people' /> }
      { dataExists(hashtags) && <LogsBlock data={hashtags} type='hashtags' /> }
    </section>
  )
}

export default TableLogs