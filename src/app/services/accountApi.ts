import { Account, AccountConfig, AccountCredentials, AccountDetailsType, AccountInfoType, AutoReplyConfig } from '@/app/types';
import { api } from './api'

const ACCOUNT_URL = '/clients'
// const ACCOUNT_URL = ''

const accountTaskQuery = (url: string) => {
  return (ids: string[]) => ({
    url: `${ACCOUNT_URL}${url}`,
    method: 'POST',
    body: ids,
  })
}

// TODO: разделить апи на: Работа с конфигами, работа с аккантами, работа с автоответом, работа с тасками
export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginAccount: builder.mutation<string, AccountCredentials>({
      query: (credentials) => ({
        url: `${ACCOUNT_URL}/login`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Account'],
    }),
    getAllAccounts: builder.query<Account[] | null, void>({
      query: () => ({
        url: `${ACCOUNT_URL}/operations/`,
        method: 'GET',
      }),
      providesTags: ['Account'],
    }),
    checkProxy: builder.query<boolean, string>({
      query: (proxy: string) => ({
        url: `${ACCOUNT_URL}/proxy`,
        method: 'POST',
        body: proxy
      }),
    }),
    getAccountById: builder.query<Account, string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/operations/${accountId}`,
        method: 'GET',
      })
    }),
    updateAccount: builder.mutation<Account, Partial<Account>>({
      query: ({ id: accountId, config }) => ({
        url: `${ACCOUNT_URL}/config/client/${accountId}`,
        method: 'POST',
        body: config,
      }),
      invalidatesTags: ['Account']
    }),
    getAutoReplyConfig: builder.query<AutoReplyConfig, string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/config/auto-reply/${accountId}`,
        method: 'GET',
      }),
      providesTags: ['AutoReply'],
    }),
    updateAutoReplyConfig: builder.mutation<string, { accountId: string, config: AutoReplyConfig }>({
      query: ({ accountId, config }) => ({
        url: `${ACCOUNT_URL}/config/auto-reply/${accountId}`,
        method: 'POST',
        body: {
          ...config,
        },
      }),
      invalidatesTags: ['AutoReply'],
    }),
    getAutoReplyStatus: builder.query<boolean, string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/auto-reply/${accountId}`,
        method: 'GET',
      }),
      providesTags: ['AutoReply/Status'],
    }),
    startAutoReply: builder.mutation<string, string[]>({
      query: (accountIds) => ({
        url: `${ACCOUNT_URL}/auto-reply`,
        method: 'POST',
        body: accountIds
      }),
      invalidatesTags: ['AutoReply/Status'],
    }),
    stopAutoReply: builder.mutation<string, string[]>({
      query: (accountIds) => ({
        url: `${ACCOUNT_URL}/auto-reply`,
        method: 'DELETE',
        body: accountIds
      }),
      invalidatesTags: ['AutoReply/Status'],
    }),
    startAccountTask: builder.mutation<string[], string[]>({
      query: accountTaskQuery('/mixed/tasks/start'),
      invalidatesTags: ['Account']
    }),
    pauseAccountTask: builder.mutation<string[], string[]>({
      query: accountTaskQuery('/tasks/pause'),
      invalidatesTags: ['Account']
    }),
    stopAccountTask: builder.mutation<string[], string[]>({
      query: accountTaskQuery('/tasks/stop'),
      invalidatesTags: ['Account']
    }),
    removeAccount: builder.mutation<string, string[]>({
      query: (accountIds) => ({
        url: `${ACCOUNT_URL}/operations`,
        method: 'DELETE',
        body: accountIds
      }),
      invalidatesTags: ['Account']
    }),
    updateAccountConfig: builder.mutation<string, { accountId: string, config: AccountConfig }>({
      query: ({ accountId, config }) => ({
        url: `${ACCOUNT_URL}/config/client/${accountId}`,
        method: 'POST',
        body: config
      })
    }),
    getAccountDetails: builder.query<AccountInfoType, string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/account-info/${accountId}`,
        method: 'GET',
      })
    }),
    updateAccountInfo: builder.mutation<string, { accountId: string, details: AccountDetailsType }>({
      query: ({ accountId, details }) => ({
        url: `${ACCOUNT_URL}/operations/${accountId}`,
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: ['Account'],
    })
  }),
})

export const {
  useLoginAccountMutation,
  useGetAllAccountsQuery,
  useLazyGetAllAccountsQuery,
  useGetAccountByIdQuery,
  useRemoveAccountMutation,
  useUpdateAccountMutation,
  useGetAccountDetailsQuery,
  useLazyGetAccountDetailsQuery,
  useStartAccountTaskMutation,
  useStopAccountTaskMutation,
  usePauseAccountTaskMutation,
  useGetAutoReplyConfigQuery,
  useLazyGetAutoReplyConfigQuery,
  useUpdateAutoReplyConfigMutation,
  useGetAutoReplyStatusQuery,
  useStartAutoReplyMutation,
  useStopAutoReplyMutation,
  useLazyCheckProxyQuery,
  useUpdateAccountInfoMutation,
} = accountApi;