import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link, useParams } from 'react-router-dom'
import { ACCOUNT } from '@/consts'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/app/hooks'
import { selectAccounts } from '@/app/features/account/accountSlice'

const accounts = [
  { id: '1123', name: '@_rea_m_' },
  { id: '312', name: '@landing' },
  { id: '12', name: '@pause' },
  { id: '43', name: '@queue' },
]

const AccountSwitcher = () => {
  const { id } = useParams();
  const accounts = useAppSelector(selectAccounts);

  const currentAccount = accounts.find(a => a.id === id) || accounts[0];
  const filteredAccounts = accounts.filter(a => a.id !== currentAccount.id);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {currentAccount?.username || 'Название аккаунта'}
          <ChevronDown className='w-4 h-4 ml-2'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {filteredAccounts.map((a) => {
          return (
            <DropdownMenuItem key={a.id} className='hover:bg-accent cursor-pointer' asChild>
              <Link to={`${ACCOUNT}/${a.id}`} className='w-full'>{a.username}</Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountSwitcher