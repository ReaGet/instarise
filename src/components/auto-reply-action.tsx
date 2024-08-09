import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useGetAutoReplyStatusQuery, useStartAutoReplyMutation, useStopAutoReplyMutation } from '@/app/services/accountApi'
import { Spinner } from '@/components/ui/spinner'

const actionButtonVariants = {
  working: {
    className: 'text-green-600',
    hoverClassName: 'hover:text-foreign',
    text: 'Работает',
    hoverText: 'Выключить',
  },
  stop: {
    className: 'text-foreign',
    hoverClassName: 'hover:text-green-600',
    text: 'Выключено',
    hoverText: 'Включить',
  }
}

function getVariant(status: boolean) {
  return actionButtonVariants[
    status ? 'working' : 'stop'
  ]
}

const AutoReplayAction = ({ accountId }: { accountId: string }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const { data: status = false, isLoading: isStatusLoading } = useGetAutoReplyStatusQuery(accountId!)
  const [start, { isLoading: isStartLoading }] = useStartAutoReplyMutation()
  const [stop, { isLoading: isStopLoading }] = useStopAutoReplyMutation()

  const isWorking = status
  const buttonProps = getVariant(isWorking)

  const isLoading = isStatusLoading || isStartLoading || isStopLoading
  // TODO: Нужно, чтобы бэк возвращал сообщение, если конфиг пустой. И тут, и в задачах
  async function handleClick() {
    if (isWorking) await stop([accountId]).unwrap();
    else await start([accountId]).unwrap();
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      className={cn('w-28 border border-current/10', isButtonHovered ? buttonProps.hoverClassName : buttonProps.className)}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
      onClick={handleClick}
      disabled={isLoading}
    >
      { isLoading
        ? <Spinner className='w-4 h-4' />
        : isButtonHovered ? buttonProps.hoverText : buttonProps.text}
    </Button>
  )
}

export default AutoReplayAction