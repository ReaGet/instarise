import AutoReplyForm from '@/components/forms/auto-reply'
import type { AutoReplyFormValues } from '@/components/forms/auto-reply/schema'
import { useGetAutoReplyConfigQuery, useUpdateAutoReplyConfigMutation } from '@/app/services/accountApi'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import AutoReplayAction from '@/components/auto-reply-action'
import { AutoReplyInitialConfig } from '@/consts'

const AutoReplayPage = () => {
  const { id } = useParams()
  let { data } = useGetAutoReplyConfigQuery(id!)
  const [updateConfig, { isLoading }] = useUpdateAutoReplyConfigMutation()
  data = data || AutoReplyInitialConfig
  console.log(data)

  if (!data) return <Spinner />

  async function onSubmit(values: AutoReplyFormValues) {
    await updateConfig({
      accountId: id!,
      config: {
        text: values.text,
        timeout: {
          hours: values.timeout,
        },
      }
    }).unwrap()
  }

  return (
    <>
      <div className='flex justify-between items-center w-full max-w-[500px]'>
        <h1 className='text-lg font-bold'>Автоответ</h1>
        <AutoReplayAction accountId={id!} />
      </div> 
      <AutoReplyForm onSubmit={onSubmit} data={{ text: data.text, timeout: data.timeout?.hours || 1 }} isLoading={isLoading} />
    </>
  )
}

export default AutoReplayPage