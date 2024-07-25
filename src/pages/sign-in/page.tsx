import SignInForm from '@/components/forms/sign-in-form'
import { useAuthGuard } from '@/hooks/useAuthGuard';

const Page = () => {
  useAuthGuard();

  return (
    <div className='flex flex-col items-center justify-center gap-10 w-screen h-screen px-6'>
      <h1 className='text-2xl font-semibold'>Авторизация</h1>
      <SignInForm />
    </div>
  )
}

export default Page