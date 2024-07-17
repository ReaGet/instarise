import { useState } from 'react'
import AutoReplyForm from '@/components/forms/auto-reply'
import type { AutoReplyFormValues } from '@/components/forms/auto-reply'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'


const AutoReplayPage = () => {
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  function onSubmit(values: AutoReplyFormValues) {
    console.log(values)
  }

  return (
    <>
      <h1 className='text-lg font-bold'>Автоответ</h1>
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-2">
          <Switch id='formEnabled' checked={isFormEnabled} onCheckedChange={setIsFormEnabled} />
          <Label htmlFor='formEnabled'>Сообщения</Label>
        </div>
        <AutoReplyForm onSubmit={onSubmit} enabled={isFormEnabled} />
      </div>
    </>
  )
}

export default AutoReplayPage