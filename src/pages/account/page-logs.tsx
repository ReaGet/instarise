import { useGetReportsLogsQuery } from '@/app/services/reportApi';
import { Spinner } from '@/components/ui/spinner';
import { Link, useParams } from 'react-router-dom';
import TableLogs from '@/components/logs/table-logs';
import TableErrors from '@/components/logs/table-errors';
import { Button } from '@/components/ui/button';
import { ACCOUNT } from '@/consts';

const LogsPage = () => {
  const { id, taskId } = useParams()
  const { data, isLoading } = useGetReportsLogsQuery(taskId!)

  if (isLoading) return <Spinner />
  if (!data) return <div className='py-8 text-center'>Нет данных</div>

  return (
    <div className='flex flex-col gap-9'>
      <Button variant='outline' size='sm' className='mr-auto'>
        <Link to={`${ACCOUNT}/${id}`}>Назад</Link>
      </Button>
      <TableLogs data={data.logs}></TableLogs>
      <TableErrors data={data.errors}></TableErrors>
    </div>
  )
}

export default LogsPage