import ReportsTable from '@/components/reports-table';
import { useParams } from 'react-router-dom'
import { useGetReportQuery } from '@/app/services/reportApi';

const AccountPage = () => {
  const { id } = useParams();
  const { data = [] } = useGetReportQuery(id!);

  return (
    <>
      <h1 className='text-lg font-bold'>Отчет</h1>
      <ReportsTable reports={data || []} />
    </>
  )
}

export default AccountPage