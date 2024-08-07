import NavSidebar from '@/components/sidebar/nav-sidebar'
import InfoSidebar from '@/components/sidebar/info-sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { selectIsAuthenticated } from '@/app/features/user/userSlice'
import { SIGNIN } from '@/consts'

const AccountLayout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={SIGNIN} />
  }

  return (
    <>
      <NavSidebar />
      <main className='flex flex-col flex-1 gap-10 p-6'>
        <Outlet />
      </main>
      <InfoSidebar />
    </>
  )
}

export default AccountLayout