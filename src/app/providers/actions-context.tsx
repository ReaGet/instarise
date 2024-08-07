import React, { useContext, createContext, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { usePauseAccountTaskMutation, useRemoveAccountMutation, useStartAccountTaskMutation, useStopAccountTaskMutation } from '@/app/services/accountApi';
import type { Account } from '@/app/types';

export type ActionType = 'start' | 'stop' | 'remove' | 'pause'

export interface ActionsContextType {
  onAction: (action: ActionType, accountId?: string) => void;
  setAccounts: (props: SelectedAccountsType) => void;
  isAnyAccountSelected: boolean;
  selectedAccounts: string[];
}

type SelectAccountAll = {
  type: 'all';
  accounts: Account[];
  payload: [boolean];
}

type SelectAccountSingle = {
  type: 'single';
  accounts: Account[];
  payload: [boolean, string];
}

type SelectedAccountsType = SelectAccountAll | SelectAccountSingle

export const ActionsContext = createContext<ActionsContextType | null>(null)

const ActionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [removeAccount] = useRemoveAccountMutation();
  const [startTask] = useStartAccountTaskMutation();
  const [pauseTask] = usePauseAccountTaskMutation();
  const [stopTask] = useStopAccountTaskMutation();

  const [isOpen, setIsOpen] = useState(false)
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [removeAccountIds, setRemoveAccountIds] = useState<string[]>([])

  function getAcountIds(accountId?: string): string[] {
    if (!accountId) return selectedAccounts
    return [accountId]
  }

  async function remove() {
    await stopTask(removeAccountIds).unwrap()
    await removeAccount(removeAccountIds).unwrap()
    setRemoveAccountIds([])
  }

  const context = {
    onAction: async (action: ActionType, accountId?: string) => {
      const ids = getAcountIds(accountId)

      switch(action) {
        case 'remove':
          setRemoveAccountIds(ids)
          setIsOpen(true)
        break;
        case 'start':
          await startTask(ids).unwrap()
        break;
        case 'pause':
          await pauseTask(ids).unwrap()
        break;
        case 'stop':
          await stopTask(ids).unwrap()
        break;
      }
    },
    setAccounts: ({ type, payload, accounts }: SelectedAccountsType) => {
      const [value, accountId = ""] = payload

      switch(type) {
        case 'all':
          if (value) setSelectedAccounts(accounts.map((a) => a.id))
          else setSelectedAccounts([])
        break;
        case 'single':
          if (!value) setSelectedAccounts(selectedAccounts.filter(s => s !== accountId))
          else setSelectedAccounts([...selectedAccounts, accountId])
        break;
      }
    },
    selectedAccounts,
    isAnyAccountSelected: selectedAccounts?.length > 0
  }

  return (
    <ActionsContext.Provider value={context}>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {children}
        <AlertDialogContent aria-description='Удалить аккаунт'>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы собираетесь удалить аккаунт</AlertDialogTitle>
            <AlertDialogDescription>
              Уверены? Данное действие нельзя будет отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => remove()}>Подтвердить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ActionsContext.Provider>
  )
}

export const useActionsContext = () => {
  const context = useContext(ActionsContext) as ActionsContextType
  if(!context) {
    throw new Error(
      "useActionsContext has to be used within <ActionsContext.Provider>"
    );
  }
  return context;
}

export default ActionsProvider