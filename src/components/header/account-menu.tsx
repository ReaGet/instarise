import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut, User2 } from 'lucide-react'

const AccountMenu = ({ className }: { className: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <div className='flex items-center justify-center w-12 h-12 rounded-full bg-secondary'>
          <User2 />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <LogOut width={16} height={16} />
            <span className='ml-2'>Выйти</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountMenu