import SignIn from '../../components/forms/sign-in'

const Page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 w-screen h-screen px-6'>
      <h1 className='text-2xl font-semibold'>Авторизация</h1>
      <SignIn />
    </div>
  )
}

export default Page