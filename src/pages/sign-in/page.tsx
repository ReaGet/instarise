import { selectIsAuthenticated } from '@/app/features/user/userSlice';
import { useAppSelector } from '@/app/hooks';
import SignInForm from '@/components/forms/sign-in'
import { DASHBOARD } from '@/consts';
import { Navigate } from 'react-router-dom';

const Page = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={DASHBOARD} />
  }

  return (
    <div className='flex flex-col items-center justify-center gap-10 w-screen h-screen px-6'>
      <h1 className='text-2xl font-semibold'>Авторизация</h1>
      <SignInForm />
    </div>
  )
}

export default Page