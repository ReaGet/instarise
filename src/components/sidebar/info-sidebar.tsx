import { Account } from '@/app/services/accountApi';
import AccountInfoForm from '../forms/account-info';

interface SidebarProps {
  data: Account | undefined;
}

const InfoSidebar = ({ data }: SidebarProps) => {
  return (
    <aside className='w-[200px] lg:w-[250px] h-full py-6 pl-6 border-l'>
      {/* TODO: Добавить скелетон */}
      { data && <AccountInfoForm data={data} /> }
    </aside>
  )
}

export default InfoSidebar