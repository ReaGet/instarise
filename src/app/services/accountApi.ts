import { Account, AccountConfig } from '@/app/types';
import { api } from './api'
import { AutoReplyFormValues } from '@/components/forms/auto-reply/schema';

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
      query: ({ id: accountId, ...body }) => ({
        url: `${ACCOUNT_URL}/operations/${accountId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Account']
    }),
    // updateConfig: builder.mutation<string, { accountId: string, body: AccountConfig }>({
    //   query: ({ accountId, body }) => ({
    //     url: `${ACCOUNT_URL}/operations/${accountId}`,
    //     method: 'PUT',
    //     body: body
    //   })
    // }),
    getAutoReplyConfig: builder.query<AutoReplyFormValues[], string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/autoReply/?client_id=${accountId}`,
        method: 'GET',
      })
    }),
    updateAutoReplyConfig: builder.mutation<string, { accountId: string, config: AutoReplyFormValues }>({
      query: ({ accountId, config }) => ({
        url: `${ACCOUNT_URL}/autoReply/${accountId}`,
        method: 'PUT',
        body: {
          ...config,
          client_id: accountId,
        },
      })
    }),
    getAutoReplyStatus: builder.query<{ status: boolean }[], string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/autoReplyStatus/?client_id=${accountId}`,
        method: 'GET',
      }),
    }),
    startAutoReply: builder.mutation<string, string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/autoReplyStatus/?client_id=${accountId}`,
        method: 'POST',
      }),
    }),
    stopAutoReply: builder.mutation<string, string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/autoReplyStatus/?client_id=${accountId}`,
        method: 'DELETE',
      }),
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
    getAccountDetails: builder.query<{
      followers: number;
      followings: number;
    }[], string>({
      query: (accountId) => ({
        url: `${ACCOUNT_URL}/info/?client_id=${accountId}`,
        method: 'GET',
      })
    })
  }),
})

export const {
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
  useUpdateAutoReplyConfigMutation,
  useGetAutoReplyStatusQuery,
  useStartAutoReplyMutation,
  useStopAutoReplyMutation,
  useLazyCheckProxyQuery,
} = accountApi;