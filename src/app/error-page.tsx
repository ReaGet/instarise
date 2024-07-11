import { useRouteError } from 'react-router-dom'

interface IError {
  statusText: string;
  message: string;
} 

const ErrorPage = () => {
  const error = useRouteError() as IError;
  console.log(error)
  return (
    <div className='flex flex-col items-center justify-center gap-12 w-screen h-screen px-6 text-3xl'>
      <h1 className='text-7xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='text-gray-500'>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage