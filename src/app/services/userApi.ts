import { toFormData } from '@/lib/utils'
import { api } from './api'
import type { UserType } from '@/app/features/user/userSlice'

type LoginCredentials = {
  username: string;
  password: string;
}

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

const AUTH_URL = '/auth'

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (userData) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: toFormData(userData),
        formData: true,
      }),
      invalidatesTags: ['User/Info']
    }),
    logout: builder.query<string, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST'
      })
    }),
    signup: builder.mutation<object, LoginCredentials>({
      query: (userData) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: userData
      })
    }),
    refresh: builder.mutation<string, void>({
      query: () => ({
        url: `${AUTH_URL}/refresh`,
        method: 'POST'
      })
    }),
    me: builder.query<UserType, void>({
      query: () => ({
        url: `${AUTH_URL}/me`,
        method: 'GET',
      }),
      providesTags: ['User/Info'],
    })
  })
})

export const {
  useLoginMutation,
  useLogoutQuery,
  useLazyLogoutQuery,
  // useRefreshQuery,
  // // useLazyRefreshQuery,
  useRefreshMutation,
  useMeQuery,
  useSignupMutation,
} = userApi