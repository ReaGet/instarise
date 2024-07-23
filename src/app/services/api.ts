import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query'
// import type { RootState } from '@reduxjs/toolkit/query'
import { BASE_URL } from '@/consts'

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}.api`,
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth.token || localStorage.getItem("token")

  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`)
  //   }

  //   return headers
  // },
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

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
})