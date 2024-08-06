import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '@/app/services/userApi'
import { RootState } from '@/app/store'

interface InitialState {
  isAuthenticated: boolean;
  refresh_token?: string;
  access_token?: string;
  current?: UserType | null;
}

export type UserType = {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
}

const initialState: InitialState = {
  isAuthenticated: false,
  refresh_token: '',
  access_token: '',
  current: null,
}

type Tokens = {
  access_token: string;
  refresh_token: string;
}

const getTokens = (action: { payload: Tokens }): Tokens => {
  let { access_token } = action.payload
  const { refresh_token } = action.payload

  access_token = access_token.split(' ')[1]
  return { access_token, refresh_token }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        const { access_token, refresh_token } = getTokens(action)

        state.access_token = access_token
        state.refresh_token = refresh_token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        state.access_token = ''
        state.refresh_token = ''
        state.isAuthenticated = false;
      })
      .addMatcher(userApi.endpoints.me.matchFulfilled, (state, action) => {
        state.current = action.payload
        state.isAuthenticated = true
      })
  },
})

export default userSlice.reducer

export const selectAccessToken = (state: RootState) => state.userSlice.access_token
export const selectIsAuthenticated = (state: RootState) => state.userSlice.isAuthenticated
export const selectCurrentUser = (state: RootState) => state.userSlice.current