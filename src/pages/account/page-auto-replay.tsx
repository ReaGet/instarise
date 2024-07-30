import AutoReplyForm from '@/components/forms/auto-reply'
import type { AutoReplyFormValues } from '@/components/forms/auto-reply/schema'
import { useGetAutoReplyConfigQuery, useUpdateAutoReplyConfigMutation } from '@/app/services/accountApi'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'

const AutoReplayPage = () => {
  const { id } = useParams()
  const { data = [] } = useGetAutoReplyConfigQuery(id!)
  const [updateConfig] = useUpdateAutoReplyConfigMutation();

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
      <h1 className='text-lg font-bold'>Автоответ</h1>
      <AutoReplyForm onSubmit={onSubmit} data={data[0]} />
    </>
  )
}

export default AutoReplayPage