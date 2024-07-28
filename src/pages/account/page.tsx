import ReportsTable from '@/components/reports-table';
import type { ReportsTableItem } from '@/app/types'
import { useParams } from 'react-router-dom'
import { useGetReportQuery } from '@/app/services/reportApi';

const reports: ReportsTableItem[] = [
  { id: '1123',  createdAt: new Date().toISOString(), progress: 'По тегам: 14/20', taskStatus: 'working', taskType: 'action' },
]

const AccountPage = () => {
  const { id } = useParams();
  const { data = [] } = useGetReportQuery(id!);

  return (
    <>
      <h1 className='text-lg font-bold'>Отчет</h1>

      <ReportsTable reports={data} />
    </>
  )
}

export default AccountPage