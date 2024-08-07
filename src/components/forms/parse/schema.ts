import { boolean, object, string, type InferOutput, number } from 'valibot'
import { mapConfigValues } from '../utils';
import type { AccountConfig } from '@/app/types';

export const ParseSchema = object({
  parsing: boolean(),
  users: string(),
  followers: boolean(),
  followers_amount: number(),
  followings: boolean(),
  followings_amount: number(),
})

export type ParseFormValues = InferOutput<typeof ParseSchema>;

export const ParseDtoToForm = (dto: AccountConfig): ParseFormValues => {
  return {
    ...mapConfigValues(dto.parsing_config),
    parsing: dto.parsing,
    users: dto.parsing_config.users.join(', '),
  }
}

export const ParseDto = ({ parsing, ...parsing_config }: ParseFormValues): Pick<AccountConfig, 'parsing' | 'parsing_config'> => {
  return {
    parsing,
    parsing_config: {
      ...parsing_config,
      users: parsing_config.users.split(',').map((u: string) => u.trim()),
    }
  }
}
