import ReportsTable from '@/components/reports-table';
import { useParams } from 'react-router-dom'
import { useGetReportsQuery } from '@/app/services/reportApi';

const AccountPage = () => {
  const { id } = useParams();
  const { data = [] } = useGetReportsQuery(id!);

  return (
    <>
      <h1 className='text-lg font-bold'>Отчет</h1>
      <ReportsTable reports={data || []} />
    </>
  )
}

export default AccountPage