import { api } from './api'

export const accountsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { login: string, password: string }
    >({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData
      })
    }),
  })
})