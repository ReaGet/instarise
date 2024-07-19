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
import { AccountsTableItem } from '@/types'
import { Link } from 'react-router-dom'
import { ACCOUNT } from '@/consts'

interface Props {
  accounts: AccountsTableItem[]
}

const AccountsTable = ({ accounts = [] }: Props) => {
  return (
    <Table className='mt-8'>
      { !accounts.length && (
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
        { accounts.map((a) => {
          return (
            <TableRow key={a.id}>
              <TableCell><Checkbox /></TableCell>
              <TableCell className='font-bold'>
                <Link to={`${ACCOUNT}/${a.id}`}>{a.name}</Link>
              </TableCell>
              <TableCell>{a.description}</TableCell>
              <TableCell>{a.proxy}</TableCell>
              <TableCell>
                <StatusBadge status={a.status} />
              </TableCell>
              <TableCell className='text-right'>
                <AccountActions accountId={a.id} status={a.status} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default AccountsTable