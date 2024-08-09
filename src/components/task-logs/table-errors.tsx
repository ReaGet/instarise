import { LogsErrorType } from '@/app/services/reportApi'

type Props = {
  data: LogsErrorType
}

const TableErrors = ({ data }: Props) => {
  console.log(data)
  // const { people, hashtags } = data

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-sm'>Ошибки</h2>
    </section>
  )
}

export default TableErrors