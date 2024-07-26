import { api } from './api'

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
        body: userData
      })
    }),
    logout: builder.query<string, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST'
      })
    }),
    refresh: builder.query<string, void>({
      query: () => ({
        url: `${AUTH_URL}/refresh`,
        method: 'POST'
      })
    }),
    me: builder.query<void, void>({
      query: () => ({
        url: `${AUTH_URL}/me`,
        method: 'GET',
      })
    })
  })
})

export const {
  useLoginMutation,
  useLogoutQuery,
  useLazyLogoutQuery,
  useRefreshQuery,
  useMeQuery,
} = userApi