import AccountsTable from '@/components/accounts-table'
import AddAccount from '@/components/dialogs/add-account'
import Report from '@/components/report'
import { useAppSelector } from '@/app/hooks'
import { selectAccounts } from '@/app/features/account/accountSlice'
import AccountBulkActions from '@/components/account-actions-bulk'
import ActionsProvider from '@/app/providers/actions-context'


const HomePage = () => {
  const accounts = useAppSelector(selectAccounts);
  
  return (
    <ActionsProvider>
      <main className='w-full'>
        <Report className='mt-20' accounts={accounts} />
        <div className='mt-20'>
          <h1 className='text-2xl font-bold'>Аккаунты</h1>
          <div className='flex items-center justify-between mt-8'>
            <AccountBulkActions />
            <AddAccount />
          </div>
          <AccountsTable accounts={accounts} />
        </div>
      </main>
    </ActionsProvider>
  )
}

export default HomePage