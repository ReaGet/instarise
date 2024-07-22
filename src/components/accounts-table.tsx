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
import { useState } from 'react'

interface Props {
  accounts: AccountsTableItem[]
}

const AccountsTable = ({ accounts = [] }: Props) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  function toggleAllCheckbox(value: boolean | string) {
    if (value) setSelectedRows(accounts.map((a) => a.id));
    else setSelectedRows([]);
  }

  function toggleCheckbox(value: boolean | string, id: string) {
    if (!value) setSelectedRows(selectedRows.filter(s => s !== id));
    else setSelectedRows([...selectedRows, id])
  }
  
  return (
    <Table className='mt-8'>
      { !accounts.length && (
        <TableCaption key='caption'>Вы еще не добавили аккунты</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className='w-16'>
            <Checkbox
              checked={selectedRows.length === accounts.length}
              onCheckedChange={toggleAllCheckbox}
            />
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
              <TableCell>
                <Checkbox
                  checked={selectedRows.indexOf(a.id) > -1}
                  onCheckedChange={(value) => toggleCheckbox(value, a.id)}
                />
              </TableCell>
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