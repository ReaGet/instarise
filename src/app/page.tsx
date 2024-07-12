import React from 'react';
import Layout from './layout'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import AccountList from '@/components/account-list'
import { ACCOUNT_ACTIONS } from '@/consts'

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
            <Button size='sm'>Добавить аккаунт</Button>
          </div>
          <AccountList />
        </div>
      </main>
    </Layout>
  )
}

export default HomePage