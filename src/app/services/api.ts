import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '@/app/store'
import { API_URL } from '@/consts'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userSlice.access_token || localStorage.getItem("token")
    console.log(token)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Set-Cookie', `access_token=Bearer ${token}`)

    return headers
  },
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions)

  // if (result.error?.status === 401) {
  //   const refreshResult = await baseQuery(`/auth/refresh`, api, extraOptions)
  //   console.log(222, refreshResult)

  //   if (refreshResult?.data) {
  //     const user = api.getState()?.auth?.user

  //     api.dispatch(set)
  //   }
  // }
  return result;
}

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReauth,
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Account'],
  endpoints: () => ({})
})