import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/app/services/userApi";
import { RootState } from "@/app/store";

interface InitialState {
  isAuthenticated: boolean;
  refresh_token?: string;
  token?: string;
}

const initialState: InitialState = {
  isAuthenticated: false,
  refresh_token: '',
  token: '',
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
        state.token = action.payload.access_token
        state.refresh_token = action.payload.refresh_token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        console.log(222)
        state.token = ''
        state.refresh_token = ''
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
      })
      // Это для теста, так как реальные запросы не проходят
      .addMatcher(userApi.endpoints.login.matchRejected, (state) => {
        state.token = "secret_token"
        state.refresh_token = "secret_refresh_token"
        state.isAuthenticated = true
        localStorage.setItem('token', state.token);
        localStorage.setItem('refresh_token', state.refresh_token);
      })
      .addMatcher(userApi.endpoints.me.matchRejected, (state) => {
        const token = localStorage.getItem("token")
        state.isAuthenticated = !!token
      })
      .addMatcher(userApi.endpoints.logout.matchRejected, (state) => {
        console.log(123123132)
        state.token = state.refresh_token = ''
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
      })
  },
})

export default userSlice.reducer
export const { logout } = userSlice.actions

export const selectIsAuthenticated = (state: RootState) => state.userSlice.isAuthenticated