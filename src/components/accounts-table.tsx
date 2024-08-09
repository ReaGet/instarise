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
import AccountActions from '@/components/account-actions'
import StatusBadge from '@/components/status-badge'
import { Link } from 'react-router-dom'
import { ACCOUNT } from '@/consts'
import type { Account } from '@/app/types'
import { useActionsContext } from '@/app/providers/actions-context'

interface Props {
  accounts: Account[]
}

const AccountsTable = ({ accounts = [] }: Props) => {
  const { selectedAccounts, setAccounts } = useActionsContext()

  function toggleAllCheckbox(value: boolean) {
    setAccounts({
      type: 'all',
      accounts,
      payload: [value]
    })
  }

  function toggleCheckbox(value: boolean, id: string) {
    setAccounts({
      type: 'single',
      accounts,
      payload: [value, id]
    })
  }
  
  // TODO: если прокси стал невалидным, нужно в таблице и внутри показать, что он таков
  // TODO: Редактирование инфы в самой таблице
  return (
    <Table className='mt-8'>
      { accounts.length === 0 && (
        <TableCaption key='caption'>Вы еще не добавили аккунты</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className='w-16'>
            <Checkbox
              checked={selectedAccounts.length === accounts.length && accounts.length > 0}
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
                  checked={selectedAccounts.indexOf(a.id) > -1}
                  onCheckedChange={(value) => toggleCheckbox(Boolean(value), a.id)}
                />
              </TableCell>
              <TableCell className='font-bold'>
                <Link to={`${ACCOUNT}/${a.id}`}>{a.username}</Link>
              </TableCell>
              <TableCell>
                {a.description}
              </TableCell>
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