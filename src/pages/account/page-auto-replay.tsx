import AutoReplyForm from '@/components/forms/auto-reply'
import type { AutoReplyFormValues } from '@/components/forms/auto-reply' 


const AutoReplayPage = () => {
  function onSubmit(values: AutoReplyFormValues) {
    console.log(values)
  }

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-lg font-bold'>Автоответ</h1>
      <AutoReplyForm onSubmit={onSubmit} />
    </div>
  )
}

export default AutoReplayPage