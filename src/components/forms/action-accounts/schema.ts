import type { AccountConfig } from '@/app/types'
import { boolean, object, string, type InferOutput, number } from 'valibot'
import { mapConfigValues } from '../utils'
import { arrayToString, stringToArray } from '@/lib/utils'

export const ActionAccountsSchema = object({
  people: boolean(),
  users: string(),
  timeout_from: number(),
  timeout_to: number(),
  follow: boolean(),
  // Posts
  posts_like: boolean(),
  posts_timeout_from: number(),
  posts_timeout_to: number(),
  posts_amount: number(),
  // Stories
  stories_like: boolean(),
  stories_timeout_from: number(),
  stories_timeout_to: number(),
  stories_amount: number(),
  // Reels
  reels_like: boolean(),
  reels_timeout_from: number(),
  reels_timeout_to: number(),
  reels_amount: number(),
})

export type ActionAccountsFormValues = InferOutput<typeof ActionAccountsSchema>

export const AccountDtoToForm = (dto: AccountConfig): ActionAccountsFormValues => {
  return {
    ...mapConfigValues(dto.people_config),
    people: dto.people,
    users: arrayToString(dto.people_config.users),
  }
}

export const AccountsDto = ({ people, ...people_config }: ActionAccountsFormValues): Pick<AccountConfig, 'people' | 'people_config'> => {
  return {
    people,
    people_config: {
      ...people_config,
      users: stringToArray(people_config.users),
    }
  }
}
