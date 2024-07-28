import { AccountStatus } from '../types';
import { api } from './api'

// const ACCOUNT_URL = '/clients'
const ACCOUNT_URL = ''

export type Account = {
  id: string;
  username: string;
  photo: string;
  description: string;
  settings: object;
  auto_reply_id: string;
  user_id: string;
  group_id: string;
  status: AccountStatus;
  proxy: string;
}

export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccounts: builder.query<Account[], void>({
      query: () => ({
        url: `${ACCOUNT_URL}/operations/`,
        method: 'GET',
      }),
      providesTags: ['Account'],
    }),
    getAccountById: builder.query<Account, string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/operations/${accountId}`,
        method: 'GET',
      })
    }),
    deleteAccount: builder.mutation<string, string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/operations/${accountId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Account']
    }),
    updateAccount: builder.mutation<Account, Partial<Account>>({
      query: ({ id: accountId, ...body }) => ({
        url: `${ACCOUNT_URL}/operations/${accountId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Account']
    })
  }),
})

export const {
  useGetAllAccountsQuery,
  useGetAccountByIdQuery,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} = accountApi;