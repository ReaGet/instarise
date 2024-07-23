import ReportsTable from '@/components/reports-table';
import type { ReportsTableItem } from '@/app/types'
import { useParams } from 'react-router-dom'

const reports: ReportsTableItem[] = [
  { id: '1123',  createdAt: new Date().toISOString(), progress: 'По тегам: 14/20', taskStatus: 'working', taskType: 'action' },
]

const AccountPage = () => {
  const { id } = useParams();

  return (
    <>
      <h1 className='text-lg font-bold'>Отчет</h1>

      <ReportsTable reports={reports} />
    </>
  )
}

export default AccountPage