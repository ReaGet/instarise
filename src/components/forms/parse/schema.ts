import { pipe, boolean, object, string, type InferOutput, minLength, number } from 'valibot'
import { mapConfigValues } from '../utils';
import { AccountConfig } from '@/app/services/accountApi';

export const ParseSchema = object({
  parsing: boolean(),
  users: pipe(string(), minLength(1, 'Поле не может быть пустым')),
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
  console.log(parsing_config.users.split(',').map((u: string) => u.trim()))
  return {
    parsing,
    parsing_config: {
      ...parsing_config,
      users: parsing_config.users.split(',').map((u: string) => u.trim()),
    }
  }
}
