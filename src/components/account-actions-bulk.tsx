import { useActionsContext, ActionType } from '@/app/providers/actions-context'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'

const AccountBulkActions = () => {
  const { onAction, selectedAccounts } = useActionsContext()
  const [currentAction, setCurrentAction] = useState('')

  return (
    <div className='flex items-center gap-3'>
      <Select onValueChange={setCurrentAction} value={currentAction}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите действие" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Действия</SelectLabel>
            <SelectItem value='start'>Включить</SelectItem>
            <SelectItem value='stop'>Отключить</SelectItem>
            <SelectItem value='pause'>Пауза</SelectItem>
            <SelectItem value='remove'>Удалить</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button size='sm' onClick={() => onAction(currentAction as ActionType)} disabled={selectedAccounts.length === 0 || currentAction === ''}>Применить</Button>
    </div>
  )
}

export default AccountBulkActions