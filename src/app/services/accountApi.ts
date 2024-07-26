import { api } from './api'

const ACCOUNT_URL = '/clients'

export type Account = {
  id: string;
  username: string;
  photo: string;
  description: string;
  settings: object;
  auto_reply_id: string;
  user_id: string;
  group_id: string;
  status: string;
  proxy: string;
}

export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccounts: builder.query<Account[], void>({
      query: () => ({
        url: `${ACCOUNT_URL}/operations/`,
        method: 'GET',
      })
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
      })
    }),
    updateAccount: builder.mutation<Account, Partial<Account>>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/operations/${accountId}`,
        method: 'PUT',
      })
    })
  }),
})

export const {
  useGetAllAccountsQuery
} = accountApi;