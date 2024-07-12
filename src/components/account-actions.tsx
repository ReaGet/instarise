import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { ACCOUNT_ACTIONS } from '@/consts'

const AccountActions = () => {
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountActions