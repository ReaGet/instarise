import { ParseSuccessType } from '@/app/services/reportApi'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { arrayToString } from '@/lib/utils'

type Props = {
  data: ParseSuccessType
}

const dataExists = (data: object = {}) => {
  return data && Object.keys(data).length > 0
}

const TableParse = ({ data }: Props) => {
  const { parsing } = data

  if (!parsing) return <div className='py-5 text-sm text-center'>Нет данных</div>
  let entries = Object.entries(parsing)
  entries = entries.filter(([, data]) => dataExists(data))
  
  if (entries.length === 0) return (
    <Card className='space-y-0 p-6'>
      <div className='py-8 text-center'>Нет данных</div>
    </Card>
  )

  return (
    <section className='flex flex-col gap-5'>
      <Card className='space-y-0'>
        { entries.map(([accountName, data]) => {
          return (
            <div key={accountName}>
              <CardHeader className='pb-3'>
                <CardTitle>{accountName}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col lg:flex-row gap-4'>
                { data.followers && (
                  <div className='flex-1'>
                    <Label htmlFor='followers'>Подписчики</Label>
                    <Textarea rows={6} id='followers' value={arrayToString(data.followers)} readOnly />
                  </div>
                )}
                { data.followings && (
                  <div className='flex-1'>
                    <Label htmlFor='followings'>Подписки</Label>
                    <Textarea rows={6} id='followings' value={arrayToString(data.followings)} readOnly />
                  </div>
                )}
              </CardContent>
            </div>
          )
        })}
      </Card>
    </section>
  )
}

export default TableParse