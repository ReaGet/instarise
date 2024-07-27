import NavSidebar from '@/components/sidebar/nav-sidebar'
import InfoSidebar from '@/components/sidebar/info-sidebar'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { selectIsAuthenticated } from '@/app/features/user/userSlice'
import { SIGNIN } from '@/consts'
import { selectAccountById } from '@/app/features/account/accountSlice'

const AccountLayout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={SIGNIN} />
  }

  const { id } = useParams();
  const account = useAppSelector(selectAccountById(id!));

  return (
    <>
      <NavSidebar />
      <main className='flex flex-col flex-1 gap-10 p-6'>
        <Outlet />
      </main>
      <InfoSidebar data={account} />
    </>
  )
}

export default AccountLayout