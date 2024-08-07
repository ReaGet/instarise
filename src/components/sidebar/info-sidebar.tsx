import AccountInfoForm from '@/components/forms/account-info'
import { selectAccountById } from '@/app/features/account/accountSlice'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { Spinner } from '@/components/ui/spinner'

const InfoSidebar = () => {
  const { id } = useParams();
  const account = useAppSelector(selectAccountById(id!));

  return (
    <aside className='w-[250px] lg:w-[300px] h-full py-6 pl-6 border-l'>
      {/* TODO: Добавить скелетон */}
      { !account
        ? <Spinner />
        : <AccountInfoForm data={account} accountId={id!} />
      } 
    </aside>
  )
}

export default InfoSidebar