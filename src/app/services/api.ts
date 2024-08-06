import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '@/app/store'
import { API_URL } from '@/consts'
import { ActionLogout, ActionSetTokens } from './actions'

type RefreshResponse = {
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userSlice.access_token || localStorage.getItem("token")

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReauth = async (args: string | FetchArgs, baseApi: BaseQueryApi, extraOptions: object) => {
  let result = await baseQuery(args, baseApi, extraOptions)

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery({
      url: `${API_URL}auth/refresh`,
      method: 'POST',
      credentials: 'include',
    }, baseApi, extraOptions);

    if (refreshResult?.data) {
      result = await baseQuery(args, baseApi, extraOptions)
    } else {
      // TODO: logout if no tokens in response
      // baseApi.dispatch(ActionLogout())
    }
  }
  return result;
}

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReauth,
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Account'],
  endpoints: () => ({})
})