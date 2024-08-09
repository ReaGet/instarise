import { ParseErrorType } from '@/app/services/reportApi'
import { Card } from '@/components/ui/card'
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
  data: ParseErrorType
}

const dataExists = (data: object = {}) => {
  return data && Object.keys(data).length > 0
}

const TabpleParseError = ({ data }: Props) => {
  const { parsing } = data

  if (!parsing) return <div className='py-5 text-sm text-center'>Нет данных</div>
  let entries = Object.entries(parsing)
  entries = entries.filter(([, data]) => dataExists(data))
  
  if (entries.length === 0) return (
    <Card className='space-y-0 p-6'>
      <div className='py-8 text-center'>Нет данных</div>
    </Card>
  )

  return (
    <section className='flex flex-col gap-5'>
      <Card className='space-y-0 p-6'>
        <Table className='mt-1'>
          { !entries.length && (
            <TableCaption key='caption'>Пусто</TableCaption>
          )}
          <TableHeader className='text-xs'>
            <TableRow>
              <TableHead className='w-[150px]'>Аккаунт</TableHead>
              <TableHead>Ошибка</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

          { entries.map(([accountName, info]) => {
            if (!dataExists(info)) return <TableRow key={accountName}></TableRow>
            const text: string = ('error' in info) ? info.error as string : 'Неизвестная ошибка'
            return (
              <TableRow key={accountName} className='text-xs'>
                <TableCell>@{accountName}</TableCell>
                <TableCell>{text}</TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </Card>
    </section>
  )
}

export default TabpleParseError