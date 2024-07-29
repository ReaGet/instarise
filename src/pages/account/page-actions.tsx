
import AccountsActionsForm from '@/components/forms/actions-accounts'
import type { AccountsActionsFormValues } from '@/components/forms/actions-accounts'
import TagsActionsForm from '@/components/forms/actions-tags'
import type { TagsActionsFormValues } from '@/components/forms/actions-tags'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useAppSelector } from '@/app/hooks'
import { selectAccountById } from '@/app/features/account/accountSlice'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import { useUpdateAccountMutation } from '@/app/services/accountApi'

const ActionsPage = () => {
  const [updateConfig] = useUpdateAccountMutation();
  const { id } = useParams()
  const currentAccount = useAppSelector(selectAccountById(id!))
  const config = currentAccount?.config
  // const [isTagsformEnabled, setIsTagsEnabled] = useState(false)
  console.log(111,currentAccount)

  if (!config) return <Spinner />

  async function onActionsSubmit({ people, ...people_config }: AccountsActionsFormValues) {
    await updateConfig({
      ...currentAccount,
      config: {
        ...config,
        people,
        people_config: {
          ...people_config,
          users: people_config.users.split(',').map(u => u.trim()),
        }
      }
    }).unwrap()
    // console.log(people, people_config)
  }

  function onTagsSubmit(values: TagsActionsFormValues) {
    console.log(values);
  }

  return (
    <>
      <h1 className='text-lg font-bold'>Действия</h1>
      <div className='flex flex-col gap-4'>
        <AccountsActionsForm onSubmit={onActionsSubmit} data={{ ...config.people_config, people: config.people, users: config.people_config.users?.join(', ') }} />
      </div>
      {/* <div className='flex flex-col gap-4 mt-6'>
        <div className="flex items-center gap-2">
          <Switch id='AccountsFormEnabled' checked={isTagsformEnabled} onCheckedChange={setIsTagsEnabled} />
          <Label htmlFor='AccountsFormEnabled'>Хештеги</Label>
        </div>
        <TagsActionsForm onSubmit={onTagsSubmit} enabled={isTagsformEnabled} />
      </div> */}
    </>
  )
}

export default ActionsPage