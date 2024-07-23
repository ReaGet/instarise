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

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData
      })
    }),
    logout: builder.query<string, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    }),
    refresh: builder.query<string, void>({
      query: () => ({
        url: '/auth/refres',
        method: 'POST'
      })
    })
  })
})

export const {
  useLoginMutation,
  useLogoutQuery,
  useRefreshQuery
} = userApi