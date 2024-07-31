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

export type ActionType = 'start' | 'stop' | 'remove' | 'pause'

export interface ActionsContextType {
  onAction: (action: ActionType) => void;
  setAccounts: (accountsIds: string[]) => void;
  isAnyAccountSelected: boolean;
}

export const ActionsContext = createContext<ActionsContextType | null>(null)

const ActionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

  const context = {
    onAction: (action: ActionType) => {
      if(action === 'remove') {
        setIsOpen(true)
      }
    },
    setAccounts: (accountIds: string[]) => {
      setSelectedAccounts(accountIds);
    },
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
            <AlertDialogAction>Подтвердить</AlertDialogAction>
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