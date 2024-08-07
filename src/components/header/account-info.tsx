import { useParams } from 'react-router-dom'
import { useGetAccountDetailsQuery } from '@/app/services/accountApi';
import { useNumberFormatter } from '@/hooks/useNumberFormatter';
import { AccountInfoType } from '@/app/types';

const AccountInfo = () => {
  const numberFormat = useNumberFormatter();
  const { id } = useParams();
  const { data = {} as AccountInfoType, isLoading } = useGetAccountDetailsQuery(id!);

  const followers = isLoading ? 0 : data?.followers || 0;
  const followings = isLoading ? 0 : data?.followings || 0;

  return (
    <div className='text-sm'>
      <div className='flex'>
        <div className='w-28'>Подписчиков:</div> { numberFormat(followers) }
      </div>
      <div className='flex'>
        <div className='w-28'>Подписок:</div> { numberFormat(followings) }
      </div>
    </div>
  )
}

export default AccountInfo