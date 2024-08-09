import { useGetReportsLogsQuery } from '@/app/services/reportApi'
import { Spinner } from '@/components/ui/spinner'
import { Link, useLocation, useParams } from 'react-router-dom'
import TableLogs from '@/components/task-logs/table-logs'
import TableErrors from '@/components/task-logs/table-errors'
import { Button } from '@/components/ui/button'
import { ACCOUNT } from '@/consts'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const LogsPage = () => {
  const { id, taskId } = useParams()
  const { data, isLoading } = useGetReportsLogsQuery(taskId!)
  let { hash } = useLocation()

  hash = hash === '#errors' ? 'errors' : 'success'

  if (isLoading) return <Spinner />
  if (!data) return <div className='py-8 text-center'>Нет данных</div>

  return (
    <div className='flex flex-col gap-9'>
      <Button variant='outline' size='sm' className='p-0 mr-auto'>
        <Link to={`${ACCOUNT}/${id}`} className='px-3'>Назад</Link>
      </Button>
      <Tabs defaultValue={hash}>
        <TabsList className="grid grid-cols-2 w-[290px]">
          <TabsTrigger value="success">Отчет по задаче</TabsTrigger>
          <TabsTrigger value="errors">Ошибки</TabsTrigger>
        </TabsList>
        <TabsContent value="success">
          <TableLogs data={data.logs}></TableLogs>
        </TabsContent>
        <TabsContent value="errors">
          <TableErrors data={data.errors}></TableErrors>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LogsPage