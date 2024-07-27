import { createSlice } from "@reduxjs/toolkit"
import { accountApi, type Account } from "@/app/services/accountApi"
import { RootState } from "@/app/store";

interface InitialState {
  accounts: Account[];
}

const initialState: InitialState = {
  accounts: [],
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addMatcher(accountApi.endpoints.getAllAccounts.matchFulfilled, (state, action) => {
      state.accounts = action.payload;
    })
  }
})

export default accountSlice.reducer
export const selectAccounts = (state: RootState) => state.accountSlice.accounts;
export const selectAccountById = (accountId: string) => (state: RootState) => state.accountSlice.accounts.find((a) => a.id === accountId);