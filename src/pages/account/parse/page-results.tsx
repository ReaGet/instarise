import { useGetReportsParseLogsQuery } from '@/app/services/reportApi'
import { Spinner } from '@/components/ui/spinner'
import { Link, useLocation, useParams } from 'react-router-dom'
import TableParse from '@/components/task-parse/table-success'
import TableParseErrors from '@/components/task-parse/table-errors'
import { Button } from '@/components/ui/button'
import { ACCOUNT } from '@/consts'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

const ParseResultsPage = () => {
  const { id, taskId } = useParams()
  const { data, isLoading } = useGetReportsParseLogsQuery(taskId!)
  let { hash } = useLocation()

  hash = hash === '#errors' ? 'errors' : 'success'

  if (isLoading) return <Spinner />
  if (!data) return <div className='py-8 text-center'>Нет данных</div>

  return (
    <div className='flex flex-col gap-9'>
      <Button variant='outline' size='sm' className='p-0 mr-auto'>
        <Link to={`${ACCOUNT}/${id}`} className='flex items-center h-8 px-3'>Назад</Link>
      </Button>
      <Tabs defaultValue={hash}>
        <TabsList className="grid grid-cols-2 w-[310px]">
          <TabsTrigger value="success">Собранные данные</TabsTrigger>
          <TabsTrigger value="errors">Ошибки</TabsTrigger>
        </TabsList>
        <TabsContent value="success">
          <TableParse data={data.logs} />
        </TabsContent>
        <TabsContent value="errors">
          <TableParseErrors data={data.errors} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ParseResultsPage