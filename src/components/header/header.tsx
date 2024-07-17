import { Link, useLocation, useParams } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AccountMenu from './account-menu'
import { Button } from '../ui/button'
import { ACCOUNT, BASE_URL, DASHBOARD } from '@/consts'
import { ArrowLeft, ChevronDown } from 'lucide-react'

const accounts = [
  { id: '1123', name: '@_rea_m_' },
  { id: '312', name: '@landing' },
  { id: '12', name: '@pause' },
  { id: '43', name: '@queue' },
]

const Header = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isDashboardPage = pathname === BASE_URL;
  
  const currentAccount = accounts.find(a => a.id === id) || accounts[0];
  const filteredAccounts = accounts.filter(a => a.id !== currentAccount.id);
  return (
    <header className='flex items-center gap-6 w-full h-20 border-b px-6'>
      { !isDashboardPage && (
        <>
          <Button variant='ghost' asChild>
            <Link className='flex items-center gap-1' to={`${DASHBOARD}`}>
              <ArrowLeft className='w-4 h-4' />
              Назад
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                {currentAccount.name}
                <ChevronDown className='w-4 h-4 ml-2'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              {filteredAccounts.map((a) => {
                return (
                  <DropdownMenuItem key={a.id}>
                    <Link to={`${ACCOUNT}/${a.id}`}>{a.name}</Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
      <AccountMenu className='ml-auto' />
    </header>
  )
}

export default Header