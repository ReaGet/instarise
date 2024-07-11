import { Link, useRouteError } from 'react-router-dom'
import { Button } from '../components/ui/button';
import { DASHBOARD } from '../consts';

interface IError {
  statusText: string;
  message: string;
} 

const ErrorPage = () => {
  const error = useRouteError() as IError;
  console.log(error)
  return (
    <div className='flex flex-col items-center justify-center gap-12 w-screen h-screen px-6 text-primary'>
      <h1 className='text-5xl font-bold'>Oops!</h1>
      <div className='flex items-center gap-6'>
        <span>Sorry, an unexpected error has occurred.</span>
        <div className='bg-secondary w-[1px] h-12'></div>
        <span>{error.statusText || error.message}</span>
      </div>
      <Button asChild size={'lg'}>
        <Link to={DASHBOARD}>Go Home</Link>
      </Button>
    </div>
  )
}

export default ErrorPage