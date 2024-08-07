import AutoReplyForm from '@/components/forms/auto-reply'
import type { AutoReplyFormValues } from '@/components/forms/auto-reply/schema'
import { useGetAutoReplyConfigQuery, useLazyGetAutoReplyConfigQuery, useUpdateAutoReplyConfigMutation } from '@/app/services/accountApi'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import AutoReplayAction from '@/components/auto-reply-action'
import { AutoReplyInitialConfig } from '@/consts'
import { useEffect, useState } from 'react'
import { AutoReplyConfig } from '@/app/types'

const AutoReplayPage = () => {
  const { id } = useParams()
  const [config, setConfig] = useState<AutoReplyConfig | null>(null)
  const [loadConfig] = useLazyGetAutoReplyConfigQuery()
  const [updateConfig, { isLoading }] = useUpdateAutoReplyConfigMutation()
  console.log(config)

  useEffect(() => {
    try {
      loadConfig(id!).unwrap().then((data) => {
        if (!data) setConfig(AutoReplyInitialConfig)
        else setConfig(data)
      })
    } catch(e) {
      console.log(`Error while fetching auto-reply config`, e)
    }
  }, [])

  if (!config) return <Spinner />

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
      <AutoReplyForm onSubmit={onSubmit} data={{ text: config.text, timeout: config.timeout?.hours || 1 }} isLoading={isLoading} />
    </>
  )
}

export default AutoReplayPage