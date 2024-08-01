import AutoReplyForm from '@/components/forms/auto-reply'
import type { AutoReplyFormValues } from '@/components/forms/auto-reply/schema'
import { useGetAutoReplyConfigQuery, useUpdateAutoReplyConfigMutation } from '@/app/services/accountApi'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import AutoReplayAction from '@/components/auto-reply-action'

const AutoReplayPage = () => {
  const { id } = useParams()
  const { data = [] } = useGetAutoReplyConfigQuery(id!)
  const [updateConfig] = useUpdateAutoReplyConfigMutation()

  if (data.length === 0) return <Spinner />

  async function onSubmit(values: AutoReplyFormValues) {
    await updateConfig({
      accountId: id!,
      config: {
        ...values,
      }
    }).unwrap()
  }

  return (
    <>
      <div className='flex justify-between items-center w-full max-w-[500px]'>
        <h1 className='text-lg font-bold'>Автоответ</h1>
        <AutoReplayAction accountId={id!} />
      </div> 
      <AutoReplyForm onSubmit={onSubmit} data={data[0]} />
    </>
  )
}

export default AutoReplayPage