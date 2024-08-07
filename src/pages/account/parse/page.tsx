import ParseForm from '@/components/forms/parse'
import { ParseDtoToForm, ParseDto, type ParseFormValues } from '@/components/forms/parse/schema'
import { useUpdateAccountMutation } from '@/app/services/accountApi'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { selectAccountById } from '@/app/features/account/accountSlice'
import { Spinner } from '@/components/ui/spinner'
import { ActionsInitialConfig } from '@/consts'

const ParsePage = () => {
  const [updateAccount, { isLoading }] = useUpdateAccountMutation();
  const { id } = useParams()
  const currentAccount = useAppSelector(selectAccountById(id!))
  const config = currentAccount?.config || ActionsInitialConfig

  if (!config || !currentAccount) return <Spinner />

  async function handleSubmit(values: ParseFormValues) {
    await updateAccount({
      ...currentAccount,
      config: {
        ...(config! || {}),
        ...ParseDto(values)
      }
    }).unwrap()
  }

  return (
    <>
      <h1 className='text-lg font-bold'>Сбор данных</h1>
      <ParseForm onSubmit={handleSubmit} data={ParseDtoToForm(config)} disabled={currentAccount.status === 'working'} isLoading={isLoading} />
    </>
  )
}

export default ParsePage