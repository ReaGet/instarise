import type { Account } from '@/app/types'
import AccountInfoForm from '@/components/forms/account-info'
import { selectAccountById } from '@/app/features/account/accountSlice'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'

const InfoSidebar = () => {
  const { id } = useParams();
  const account = useAppSelector(selectAccountById(id!)) || {} as Account;

  console.log(account)

  return (
    <aside className='w-[220px] lg:w-[250px] h-full py-6 pl-6 border-l'>
      {/* TODO: Добавить скелетон */}
      { account && <AccountInfoForm data={account} /> }
    </aside>
  )
}

export default InfoSidebar