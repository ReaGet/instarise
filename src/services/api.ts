import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query'
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

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
})