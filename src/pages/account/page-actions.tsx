import React from 'react'
import ActionsForm from '@/components/forms/actions-accounts'
import type { ActionsFormValues } from '@/components/forms/actions-accounts'

const ActionsPage = () => {
  function onSubmit(values: ActionsFormValues) {
    console.log(values);
  }

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-lg font-bold'>Действия</h1>
      <ActionsForm onSubmit={onSubmit} />
    </div>
  )
}

export default ActionsPage