import Header from '@/components/header/header'
import Container from '@/components/container'
import { Navigate, Outlet } from 'react-router-dom';
import { SIGNIN } from '@/consts';
import { useAppSelector } from '@/app/hooks';
import { selectIsAuthenticated } from '@/app/features/user/userSlice';
import { useGetAllAccountsQuery } from '@/app/services/accountApi';
import { useGetAllGroupsQuery } from '@/app/services/groupApi';

const MainLayout = () => {
  useGetAllAccountsQuery()
  useGetAllGroupsQuery()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) return <Navigate to={SIGNIN} />

  return (
    <>
      <Header />
      <Container className='flex h-full'>
        <Outlet />
      </Container>
    </>
  )
}

export default MainLayout