import { logout } from '@/app/features/user/userSlice';
import { useAppDispatch } from '@/app/hooks'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BASE_URL, SIGNIN } from '@/consts';
import { LogOut, User2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const AccountMenu = ({ className }: { className: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate(`${SIGNIN}`);
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <div className='flex items-center justify-center w-12 h-12 rounded-full bg-secondary'>
          <User2 />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut width={16} height={16} />
            <span className='ml-2'>Выйти</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountMenu