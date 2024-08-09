import type { AccountConfig } from '@/app/types';
import { object, number, string, type InferOutput, boolean } from 'valibot'
import { mapConfigValues } from '../utils';

export const ActionTagsSchema = object({
  tags: boolean(),
  hashtags: string(),
  amount: number(),
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
