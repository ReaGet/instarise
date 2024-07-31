import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '@/app/store'
import { API_URL } from '@/consts'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userSlice.token || localStorage.getItem("token")

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions)

  // if (result.error?.status === 403) {
  //   const refreshResult = await baseQuery(`/refresh`, api, extraOptions)

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