import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { ACCOUNT, ACCOUNT_ACTIONS } from '@/consts'
import { Link } from 'react-router-dom'
import { AccountStatus } from '@/app/types'
import { useState } from 'react'
import { useDeleteAccountMutation } from '@/app/services/accountApi'

interface ActionsProps {
  accountId: string;
  status: AccountStatus
}

const AccountActions = ({ accountId, status }: ActionsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteAccount] = useDeleteAccountMutation()

  const skippingActions = status === 'stop'
    ? ['stop', 'pause']
    : status === 'pause' ? ['pause'] : ['start'];
  const filteredActions = ACCOUNT_ACTIONS.filter(a => !skippingActions.includes(a.value))

  async function handleAccountDelete() {
    await deleteAccount(accountId).unwrap()
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
                <Button variant='ghost' size='sm' className='justify-start w-full'>{text}</Button>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuItem className='p-0'>
            <AlertDialogTrigger asChild>
              <Button variant='ghost' size='sm' className='justify-start w-full'>Удалить</Button>
            </AlertDialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem className='p-0'>
            <Button variant='ghost' size='sm' className='justify-start w-full' asChild>
              <Link to={`${ACCOUNT}/${accountId}/auto-replay/`}>Настройки</Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent aria-description='Удалить аккаунт'>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы собираетесь удалить аккаунт</AlertDialogTitle>
          <AlertDialogDescription>
            Уверены? Данное действие нельзя будет отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleAccountDelete}>Подтвердить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AccountActions