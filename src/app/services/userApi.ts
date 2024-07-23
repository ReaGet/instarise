import { api } from './api'

export const userApi = api.injectEndpoints({
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