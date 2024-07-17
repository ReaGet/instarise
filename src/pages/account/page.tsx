import Statistics, { type InfoBlock } from '@/components/statistics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ACCOUNT } from '@/consts'
import { SquareArrowOutUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const byAccounts: InfoBlock[] = [
  { title: 'Подписок', value: 132 },
  { title: 'Пролайкано аккаунтов', value: 7 },
  { title: 'Просмотрено сторис', value: 214 },
]

const byTags: InfoBlock[] = [
  { title: 'Обработано тегов', value: 47 },
  { title: 'Подписок', value: 378 },
  { title: 'Пролайкано постов', value: 567 },
  { title: 'Оставлено комментариев', value: 214 },
]

const parsingByAccounts: InfoBlock[] = [
  { title: 'Обработано аккаунтов', value: 3 },
  { title: 'Собрано подписчиков', value: 97 },
  { title: 'Собрано подписок', value: 68 },
  { title: 'Собрано хештегов', value: 214 },
]

const parsingByTags: InfoBlock[] = [
  { title: 'Обработано тегов', value: 38 },
  { title: 'Собрано подписчиков', value: 97 },
  { title: 'Популярных тегов', value: 22 },
  { title: 'Собрано хештегов', value: 214 },
]

const AccountPage = () => {
  const { id } = useParams();

  return (
    <>
      <h1 className='text-lg font-bold'>Статистика</h1>

      <article>
        <h2 className='text-md font-bold'>Люди</h2>
        <Statistics className='mt-4' data={byAccounts} />
      </article>

      <article>
        <h2 className='text-md font-bold'>Хештеги</h2>
        <Statistics className='mt-4' data={byTags} />
      </article>

      <article>
        <h2 className='flex items-center text-md font-bold'>
          Сбор данных по аккаунтам
          <Link to={`${ACCOUNT}/${id}/parse/results`}>
            <SquareArrowOutUpRight className='w-3 h-3 ml-1 -mt-2' />
          </Link>
        </h2>
        <Statistics className='mt-4' data={parsingByAccounts} />
      </article>

      <article>
        <h2 className='flex items-center text-md font-bold'>
          Сбор данных по тегам
          <Link to={`${ACCOUNT}/${id}/parse/results`}>
            <SquareArrowOutUpRight className='w-3 h-3 ml-1 -mt-2' />
          </Link>
        </h2>
        <Statistics className='mt-4' data={parsingByTags} />
      </article>

      <div className='my-6 border-b'></div>

      <Card>
        <CardHeader>
          <CardTitle>Люди</CardTitle>
        </CardHeader>
        <CardContent>
          <Statistics className='mt-4' data={byAccounts} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Хештеги</CardTitle>
        </CardHeader>
        <CardContent>
          <Statistics className='mt-4' data={byTags} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Сбор данных по аккаунтам</CardTitle>
        </CardHeader>
        <CardContent>
          <Statistics className='mt-4' data={parsingByAccounts} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Сбор данных по тегам</CardTitle>
        </CardHeader>
        <CardContent>
          <Statistics className='mt-4' data={parsingByTags} />
        </CardContent>
      </Card>
    </>
  )
}

export default AccountPage