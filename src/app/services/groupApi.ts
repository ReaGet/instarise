import { api } from './api'
import type { GroupType } from '@/app/types' 

const GROUP_URL = '/groups'

export const groupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<string, string>({
      query: (groupId: string) => ({
        url: `${GROUP_URL}`,
        method: 'POST',
        body: groupId,
      }),
      invalidatesTags: ['Group'],
    }),
    getAllGroups: builder.query<GroupType[], void>({
      query: () => ({
        url: `${GROUP_URL}`,
        method: 'GET'
      }),
      providesTags: ['Group']
    }),
    getGroupById: builder.query<GroupType, string>({
      query: (groupId) => ({
        url: `${GROUP_URL}/${groupId}`,
        method: 'GET'
      })
    })
  })
})

export const {
  useCreateGroupMutation,
  useGetAllGroupsQuery,
} = groupApi