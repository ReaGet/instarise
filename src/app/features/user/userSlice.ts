import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '@/app/services/userApi'
import { RootState } from '@/app/store'
import { setAuthCookie } from './utils'

interface InitialState {
  isAuthenticated: boolean;
  refresh_token?: string;
  access_token?: string;
}

const initialState: InitialState = {
  isAuthenticated: false,
  refresh_token: '',
  access_token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        let { access_token, refresh_token } = action.payload
        access_token = access_token.split(' ')[1]
        state.access_token = access_token
        state.refresh_token = refresh_token
        state.isAuthenticated = true
        setAuthCookie(access_token, 'access_token')
        // localStorage.setItem('access_token', access_token);
        // localStorage.setItem('refresh_token', refresh_token);
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        state.access_token = ''
        state.refresh_token = ''
        state.isAuthenticated = false;
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('refresh_token');
      })
  },
})

export default userSlice.reducer
export const { logout } = userSlice.actions

export const selectAccessToken = (state: RootState) => state.userSlice.access_token
export const selectIsAuthenticated = (state: RootState) => state.userSlice.isAuthenticated