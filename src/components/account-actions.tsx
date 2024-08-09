import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { ACCOUNT, ACCOUNT_ACTIONS } from '@/consts'
import { Link } from 'react-router-dom'
import { AccountStatus } from '@/app/types'
import { useActionsContext } from '@/app/providers/actions-context'

interface ActionsProps {
  accountId: string;
  status: AccountStatus;
}

const AccountActions = ({ accountId, status }: ActionsProps) => {
  const { onAction } = useActionsContext()

  const skippingActions = status === 'stopped'
    ? ['stop', 'pause']
    : status === 'paused' ? ['pause'] : ['start'];
  const filteredActions = ACCOUNT_ACTIONS.filter(a => !skippingActions.includes(a.value))
  // TODO: показывать модалку, если человек пытается запустить задачу, но конфиг пустой
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        { filteredActions.map(({value, text}) => {
          return (
            <DropdownMenuItem className='p-0' key={value}>
              <Button variant='ghost' size='sm' className='justify-start w-full' onClick={() => onAction(value, accountId)}>{text}</Button>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuItem className='p-0'>
          <Button variant='ghost' size='sm' className='justify-start w-full' asChild>
            <Link to={`${ACCOUNT}/${accountId}/auto-replay/`}>Настройки</Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountActions