import { Link, useLocation } from 'react-router-dom'
import AccountMenu from './account-menu'
import { Button } from '../ui/button'
import { BASE_URL, DASHBOARD } from '@/consts'
import { ArrowLeft } from 'lucide-react'
import AccountSwitcher from './account-switcher'

const Header = () => {
  const { pathname } = useLocation();
  const isDashboardPage = pathname === BASE_URL;
  
  return (
    <header className='sticky flex items-center gap-6 w-full h-20 px-6 top-0 bg-white z-10 border-b'>
      { !isDashboardPage && (
        <>
          <Button variant='ghost' asChild>
            <Link className='flex items-center gap-1' to={`${DASHBOARD}`}>
              <ArrowLeft className='w-4 h-4' />
              Назад
            </Link>
          </Button>
          <AccountSwitcher  />
          <div className='text-sm'>
            <div className='flex'>
              <div className='w-28'>Подписчиков:</div> 200
            </div>
            <div className='flex'>
              <div className='w-28'>Подписок:</div> 200
            </div>
          </div>
        </>
      )}
      <AccountMenu className='ml-auto' />
    </header>
  )
}

export default Header