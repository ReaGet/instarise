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

const AccountActions = ({ accountId }: { accountId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        { ACCOUNT_ACTIONS.map(({value, text}) => {
          return (
            <DropdownMenuItem className='p-0' key={value}>
              <Button variant='ghost' size='sm' className='justify-start w-full'>{text}</Button>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuItem className='p-0'>
          <Button variant='ghost' size='sm' className='justify-start w-full' asChild>
            <Link to={`${ACCOUNT}/${accountId}`}>Настройки</Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountActions