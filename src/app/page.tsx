import Layout from './layout'
import AccountList from '@/components/account-list'
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
import { AccountListItem } from '@/types'

const accounts: AccountListItem[] = [
  { id: '1123', name: '@_rea_m_', description: 'Praesentium maiores eius suscipit nihil quas natus laborum soluta quam temporibus cupiditate fuga.', proxy: '192.168.0.110', status: 'working' },
  { id: '312', name: '@landing', description: 'Come description', proxy: '132.111.101.5', status: 'stop' },
];

const HomePage = () => {
  return (
    <Layout>
      <main className='w-full'>
        <div>HomePage</div>
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
          <AccountList data={accounts} />
        </div>
      </main>
    </Layout>
  )
}

export default HomePage