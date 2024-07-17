import AccountsActionsForm from '@/components/forms/actions-accounts'
import type { AccountsActionsFormValues } from '@/components/forms/actions-accounts'
import TagsActionsForm from '@/components/forms/actions-tags'
import type { TagsActionsFormValues } from '@/components/forms/actions-tags'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const ParsePage = () => {
  const [isAccountsformEnabled, setIsAccountsFormEnabled] = useState(false);
  const [isTagsformEnabled, setIsTagsEnabled] = useState(false);

  function onActionsSubmit(values: AccountsActionsFormValues) {
    console.log(values);
  }

  function onTagsSubmit(values: TagsActionsFormValues) {
    console.log(values);
  }

  return (
    <>
      <h1 className='text-lg font-bold'>Сбор данных</h1>
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-2">
          <Switch id='AccountsFormEnabled' checked={isAccountsformEnabled} onCheckedChange={setIsAccountsFormEnabled} />
          <Label htmlFor='AccountsFormEnabled'>Люди</Label>
        </div>
        <AccountsActionsForm onSubmit={onActionsSubmit} enabled={isAccountsformEnabled} />
      </div>
      <div className='flex flex-col gap-4 mt-6'>
        <div className="flex items-center gap-2">
          <Switch id='AccountsFormEnabled' checked={isTagsformEnabled} onCheckedChange={setIsTagsEnabled} />
          <Label htmlFor='AccountsFormEnabled'>Хештеги</Label>
        </div>
        <TagsActionsForm onSubmit={onTagsSubmit} enabled={isTagsformEnabled} />
      </div>
    </>
  )
}

export default ParsePage