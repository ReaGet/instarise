import Layout from './layout'
import AccountsTable from '@/components/accounts-table'
import AddAccount from '@/components/dialogs/add-account'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { ACCOUNT_ACTIONS } from '@/consts'
import Report, { InfoBlock } from '@/components/report'
import { useAppSelector } from '@/app/hooks'
import { selectAccounts } from '@/app/features/account/accountSlice'

const accountsInfo: InfoBlock[] = [
  { title: 'Всего аккаунтов', value: 1_000_000 },
  { title: 'Включено', value: 6 },
  { title: 'Отключено', value: 2 },
  { title: 'На паузе', value: 7 },
]

const HomePage = () => {
  const accounts = useAppSelector(selectAccounts);

  return (
    <main className='w-full'>
      <Report className='mt-20' data={accountsInfo} />
      <div className='mt-20'>
        <h1 className='text-2xl font-bold'>Аккаунты</h1>
        <div className='flex items-center justify-between mt-8'>
          <div className='flex items-center gap-6'>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выберите действие" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Действия</SelectLabel>
                  { ACCOUNT_ACTIONS.map(({ value, text }) => {
                    return <SelectItem value={value} key={value}>{text}</SelectItem>
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button size='sm'>Применить</Button>
          </div>
          <AddAccount />
        </div>
        <AccountsTable accounts={accounts} />
      </div>
    </main>
  )
}

export default HomePage