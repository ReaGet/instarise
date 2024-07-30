import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import ParseForm from '@/components/forms/parse'
import type { ParseFormValues } from '@/components/forms/parse/schema'

const ParsePage = () => {
  const [isParseEnabled, setIsParseEnabled] = useState(false);

  function onSubmit(values: ParseFormValues) {
    console.log(values);
  }

  return (
    <>
      <h1 className='text-lg font-bold'>Сбор данных</h1>
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-2">
          <Switch id='ParseFormEnabled' checked={isParseEnabled} onCheckedChange={setIsParseEnabled} />
          <Label htmlFor='ParseFormEnabled'>Люди</Label>
        </div>
        <ParseForm onSubmit={onSubmit} enabled={isParseEnabled} />
      </div>
    </>
  )
}

export default ParsePage