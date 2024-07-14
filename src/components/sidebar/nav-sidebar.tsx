import React from 'react'
import { BarChartBig, Database, MessageSquareText, Settings } from 'lucide-react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { ACCOUNT } from '@/consts'

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-2 text-sm text-muted-foreground font-semibold'>{ children }</div>
  )
}

const NavSidebar = () => {
  const { id } = useParams();

  return (
    <aside className='w-[200px] h-full py-6 pr-6 border-r'>
      <nav className='text-sm text-accent-foreground'>
        <div>
          <Heading>Общее</Heading>
          <div className='flex flex-col gap-1'>
            <NavLink className='flex items-center p-2 rounded-md hover:bg-accent [&.active]:font-bold' end to={`${ACCOUNT}/${id}`}>
              <BarChartBig className="mr-2 h-5 w-5" />
              <span>Статистика</span>
            </NavLink>
          </div>
        </div>

        <div className='mt-5'>
          <Heading>Настройки</Heading>
          <div className='flex flex-col gap-1'>
            <NavLink className='flex items-center p-2 rounded-md hover:bg-accent [&.active]:font-bold' to={`${ACCOUNT}/${id}/auto-replay`}>
              <MessageSquareText className="mr-2 h-5 w-5" />
              <span>Автоответ</span>
            </NavLink>
            <NavLink className='flex items-center p-2 rounded-md hover:bg-accent [&.active]:font-bold' to={`${ACCOUNT}/${id}/actions`}>
              <Settings className="mr-2 h-5 w-5" />
              <span>Действия</span>
            </NavLink>
            <NavLink className='flex items-center p-2 rounded-md hover:bg-accent [&.active]:font-bold' to={`${ACCOUNT}/${id}/parse`}>
              <Database className="mr-2 h-5 w-5" />
              <span>Сбор данных</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default NavSidebar