import { Link, useRouteError } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { DASHBOARD } from '@/consts';

interface IError {
  statusText: string;
  message: string;
} 

const ErrorPage = () => {
  const error = useRouteError() as IError;
  console.log(error)
  return (
    <main className='flex items-center justify-center w-screen h-screen px-6'>
      <div className='flex flex-col items-start justify-center gap-12 text-primary'>
        <h1 className='text-5xl font-bold'>Oops!</h1>
        <div className='flex flex-col items-start gap-3 pl-8 py-2 border-l text-sm'>
          <span>Sorry, an unexpected error has occurred.</span>
          <span className='text-foreground'>{error.statusText || error.message}</span>
        </div>
        <Button asChild size={'lg'}>
          <Link to={DASHBOARD}>Go Home</Link>
        </Button>
      </div>
    </main>
  )
}

export default ErrorPage