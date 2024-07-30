import type { AccountConfig } from '@/app/services/accountApi';
import { pipe, object, number, string, type InferOutput, minLength, boolean } from 'valibot'
import { mapConfigValues } from '../utils';

export const ActionTagsSchema = object({
  tags: boolean(),
  hashtags: pipe(string(), minLength(1, 'Поле не может быть пустым')),
  amount: number(),
  timeout_from: number(),
  timeout_to: number(),
})

export type ActionTagsFormValues = InferOutput<typeof ActionTagsSchema>;

export const TagDtoToForm = (dto: AccountConfig): ActionTagsFormValues => {
  return {
    ...mapConfigValues(dto.hashtags_config),
    tags: dto.hashtags,
    hashtags: dto.hashtags_config.hashtags.join(', '),
  }
}

export const TagsDto = ({ tags, ...hashtag_config }: ActionTagsFormValues): Pick<AccountConfig, 'hashtags' | 'hashtags_config'> => {
  return {
    hashtags: tags,
    hashtags_config: {
      ...hashtag_config,
      hashtags: hashtag_config.hashtags.split(',').map((u: string) => u.trim()),
    }
  }
}
