
import AccountActionsForm from '@/components/forms/action-accounts'
import { type ActionAccountsFormValues, AccountDtoToForm, AccountsDto } from '@/components/forms/action-accounts/schema'
import TagsActionsForm from '@/components/forms/action-tags'
import { useAppSelector } from '@/app/hooks'
import { selectAccountById } from '@/app/features/account/accountSlice'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import { useUpdateAccountMutation } from '@/app/services/accountApi'
import type { AccountConfig } from '@/app/types'
import { ActionTagsFormValues, TagDtoToForm, TagsDto } from '@/components/forms/action-tags/schema'
import { ActionsInitialConfig } from '@/consts'

const ActionsPage = () => {
  const [updateAccount, { isLoading }] = useUpdateAccountMutation();
  const { id } = useParams()
  const currentAccount = useAppSelector(selectAccountById(id!))
  const config = currentAccount?.config || ActionsInitialConfig

  if (!config || !currentAccount) return <Spinner />

  async function onAccountSubmit(values: ActionAccountsFormValues) {
    await handleSubmit({
      ...(config! || {}),
      ...AccountsDto(values)
    })
  }

  async function onTagsSubmit(values: ActionTagsFormValues) {
    await handleSubmit({
      ...(config! || {}),
      ...TagsDto(values)
    })
  }

  async function handleSubmit(config: AccountConfig) {
    await updateAccount({
      ...currentAccount,
      config
    }).unwrap()
  }

  return (
    <>
      <h1 className='text-lg font-bold'>Действия</h1>
      <AccountActionsForm onSubmit={onAccountSubmit} data={AccountDtoToForm(config)} disabled={currentAccount.status === 'working'} isLoading={isLoading} />
      <TagsActionsForm onSubmit={onTagsSubmit} data={TagDtoToForm(config)} disabled={currentAccount.status === 'working'} isLoading={isLoading} />
    </>
  )
}

export default ActionsPage