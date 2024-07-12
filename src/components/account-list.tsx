import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import AccountActions from './account-actions'
import StatusBadge from '@/components/status-badge'
import { AccountListItem } from '@/types'

interface Props {
  data: AccountListItem[]
}

const AccountList = (props: Props) => {
  return (
    <Table className='mt-8'>
      { !props.data?.length && (
        <TableCaption key='caption'>Вы еще не добавили аккунты</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className='w-16'>
            <Checkbox />
          </TableHead>
          <TableHead className='w-[200px]'>Название</TableHead>
          <TableHead className='w-[600px]'>Описание</TableHead>
          <TableHead>Прокси</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className='text-right'>Действие</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { props.data?.map((item) => {
          return (
            <TableRow key={item.id}>
              <TableCell><Checkbox /></TableCell>
              <TableCell className='font-bold'>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.proxy}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell className='text-right'>
                <AccountActions />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default AccountList