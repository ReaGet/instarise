import { useParams } from 'react-router-dom'
import { useLazyGetAccountDetailsQuery } from '@/app/services/accountApi';
import { useNumberFormatter } from '@/hooks/useNumberFormatter';
import { AccountInfoType } from '@/app/types';
import { useEffect, useState } from 'react';

const initialData: AccountInfoType = {
  followers: 0,
  followings: 0,
}

const AccountInfo = () => {
  const numberFormat = useNumberFormatter()
  const { id } = useParams()
  const [details, setDetails] = useState(initialData)
  const [loadDetails] = useLazyGetAccountDetailsQuery({
    refetchOnFocus: false,
  })

  useEffect(() => {
    loadDetails(id!).unwrap().then((data) => {
      setDetails(data)
    })
  }, [])

  return (
    <div className='text-sm'>
      <div className='flex'>
        <div className='w-28'>Подписчиков:</div> { numberFormat(details.followers) }
      </div>
      <div className='flex'>
        <div className='w-28'>Подписок:</div> { numberFormat(details.followings) }
      </div>
    </div>
  )
}

export default AccountInfo